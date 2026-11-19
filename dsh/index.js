import Schema from '@deepseek-ai/schemastery'
import { readFileSync, existsSync } from 'node:fs'
import { join, dirname, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Workbench, forbiddenRoot } from './workbench.js'

export const name = 'mpn-main'
export const inject = ['webServer', 'connection']
export const Config = Schema.object({
  root: Schema.string().description('资料目录；由 cordis.patch.yml 的 dshHomePath("mpn") 注入'),
})
const HERE = dirname(fileURLToPath(import.meta.url))
const manifest = JSON.parse(readFileSync(join(HERE, '..', 'package.json'), 'utf8'))
const PUBLIC = join(HERE, '..', 'public')
const UI_ENTRY = '/api/mpn/ui/'
const FILES = {
  'index.html': 'text/html; charset=utf-8', 'app.js': 'text/javascript; charset=utf-8',
  'style.css': 'text/css; charset=utf-8', 'demo-data.js': 'text/javascript; charset=utf-8',
  'primer-data.js': 'text/javascript; charset=utf-8', 'primer.js': 'text/javascript; charset=utf-8',
  'primer.css': 'text/css; charset=utf-8', 'trial-match.js': 'text/javascript; charset=utf-8',
}

function sendJson(res, status, body) {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' })
  res.end(JSON.stringify(body))
}
function sendText(res, status, body, type = 'text/plain; charset=utf-8') {
  res.writeHead(status, { 'content-type': type, 'cache-control': 'no-store' })
  res.end(body)
}
function readJson(req, limit = 64 * 1024) {
  return new Promise((resolveBody, reject) => {
    let size = 0; const chunks = []
    req.on('data', (chunk) => {
      size += chunk.length
      if (size > limit) { reject(Object.assign(new Error('请求体超过 64KB'), { status: 413 })); req.destroy(); return }
      chunks.push(chunk)
    })
    req.on('end', () => {
      if (!size) return resolveBody({})
      try { resolveBody(JSON.parse(Buffer.concat(chunks).toString('utf8'))) } catch { reject(Object.assign(new Error('JSON 解析失败，请检查请求体'), { status: 400 })) }
    })
    req.on('error', reject)
  })
}

export function apply(ctx, config = {}) {
  if (!ctx.webServer?.register) throw new Error('Desktop webServer.register is unavailable')
  const root = config?.root || ''
  const store = new Workbench({ root: root || undefined })
  ctx.effect(() => () => store.close())

  const auth = (req, res) => {
    if (typeof ctx.connection?.requestRejection !== 'function') { sendJson(res, 503, { error: 'connection authentication capability unavailable' }); return false }
    const rejection = ctx.connection.requestRejection(req)
    if (rejection !== undefined) { sendJson(res, rejection, { error: 'Authentication required' }); return false }
    return true
  }
  // 宿主 exact route 按"路径"去重，不区分 method：同路径多方法必须合并注册一次，
  // 各自注册会触发 webserver: duplicate exact route（2026-11-19 装机实测）
  const routes = new Map()
  const route = (path, method, handler) => {
    const byMethod = routes.get(path) || new Map()
    byMethod.set(method, handler)
    routes.set(path, byMethod)
  }

  route('/api/mpn/health', 'GET', (req, res) => sendJson(res, 200, {
    ok: true, version: manifest.version, apiVersion: 'v1',
    capabilities: ['health', 'bootstrap', 'write', 'trials', 'root', 'ui'],
    dataRoot: store.currentRootInfo().dir,
  }))
  route('/api/mpn/bootstrap', 'GET', (req, res) => sendJson(res, 200, store.bootstrap()))
  route('/api/mpn/root', 'GET', (req, res) => sendJson(res, 200, { ok: true, ...store.currentRootInfo() }))
  route('/api/mpn/root', 'POST', async (req, res) => {
    const body = await readJson(req)
    const reason = forbiddenRoot(body.dir)
    if (reason) return sendJson(res, 400, { ok: false, error: reason })
    const info = store.setRoot(body.dir)
    sendJson(res, 200, { ok: true, ...info })
  })
  route('/api/mpn/subjects', 'POST', async (req, res) => {
    const body = await readJson(req)
    const created = store.createProfile(body)
    sendJson(res, 200, { ...created, bootstrap: store.bootstrap() })
  })
  route('/api/mpn/entries', 'POST', async (req, res) => {
    const body = await readJson(req)
    const created = store.addEntry(body.profileKey, body.kind, body.data)
    sendJson(res, 200, { ...created, bootstrap: store.bootstrap() })
  })
  route('/api/mpn/privacy', 'POST', async (req, res) => {
    const body = await readJson(req)
    const result = store.setPrivacy(body.profileKey, body.kind, body.id, !!body.private)
    sendJson(res, 200, { ...result, bootstrap: store.bootstrap() })
  })
  route('/api/mpn/saved-trials', 'POST', async (req, res) => {
    const body = await readJson(req)
    const result = store.saveTrial(body.profileKey, body.trialKey, body.state)
    sendJson(res, 200, { ...result, bootstrap: store.bootstrap() })
  })
  route('/api/mpn/trials', 'GET', (req, res) => {
    const url = new URL(req.url, 'http://localhost')
    sendJson(res, 200, store.trialMatch(url.searchParams.get('keyword') || ''))
  })

  const serveIndex = (req, res) => {
    try {
      sendText(res, 200, readFileSync(join(PUBLIC, 'index.html'), 'utf8'), FILES['index.html'])
    } catch { sendText(res, 500, '界面文件缺失：public/index.html') }
  }
  route(UI_ENTRY, 'GET', serveIndex)
  route('/api/mpn/ui', 'GET', serveIndex)
  route('/api/mpn/ui/index.html', 'GET', serveIndex)
  for (const [name, type] of Object.entries(FILES)) {
    if (name === 'index.html') continue
    route(`/api/mpn/ui/${name}`, 'GET', (req, res) => {
      try { sendText(res, 200, readFileSync(join(PUBLIC, normalize(name))), type) }
      catch { sendText(res, 404, 'Not found') }
    })
  }

  for (const [path, byMethod] of routes) {
    ctx.effect(() => ctx.webServer.register({
      kind: 'exact', path,
      handler: async (req, res) => {
        if (!auth(req, res)) return
        const handler = byMethod.get(req.method)
        if (!handler) return sendJson(res, 405, { error: 'Method not allowed' })
        try { await handler(req, res) } catch (error) {
          sendJson(res, error.status || 500, { ok: false, error: error.message || String(error), detail: error.status && error.status < 500 ? error.message : '服务端处理失败，请重试；如仍失败请查看宿主日志' })
        }
      },
    }), `mpn ${path}`)
  }
}

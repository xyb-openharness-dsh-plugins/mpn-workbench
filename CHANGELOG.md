# 变更记录

只增不删；每条写清“改了什么 + 为什么 + 用户可见结果”。版本号与 VERSION、package.json、lib/version.js、页面徽标同源。

## 0.2.0 — 2026-11-15

- 从注册骨架升级为 MPN 业务工作台：两套合成档案（PV 刚确诊 / PMF 长期随访）、8 类记录、指标卡与一图秀、临床研究三子页、疾病概要四段。
- 接入本地 sqlite：`profiles / entries / metrics / saved_trial / app_setting`；新建档案 `is_demo=0`，8 类记录走 API，刷新仍在。
- 资料目录改为真入口：`uiWorkspace.pickDirectory()` → 四类拒绝 → POST → `config.root` 落点 → 回显；服务端二次校验。
- 临床试验快照：unified-trial-mcp 四在线通道，CTV 命中 3 条；ChiCTR/ICTRP 当轮 FAILED 原样记录。
- 原生 AI 面板：`newSession(workspaceId)`、`ownsSession/currentSession`、草稿只填不发；业务区改为 `/api/mpn/ui/` iframe。
- 五件门禁 + 面板契约 + 全量路由探针接入 `npm run check`。

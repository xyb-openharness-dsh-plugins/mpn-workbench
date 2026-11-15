# 变更记录

只增不删；每条写清“改了什么 + 为什么 + 用户可见结果”。版本号与 VERSION、package.json、lib/version.js、页面徽标同源。

## 0.2.0 — 2026-11-15

- 从注册骨架升级为 MPN 业务工作台：两套合成档案（PV 刚确诊 / PMF 长期随访）、8 类记录、指标卡与一图秀、临床研究三子页、疾病概要四段。
- 接入本地 sqlite：`profiles / entries / metrics / saved_trial / app_setting`；新建档案 `is_demo=0`，8 类记录走 API，刷新仍在。
- 资料目录改为真入口：`uiWorkspace.pickDirectory()` → 四类拒绝 → POST → `config.root` 落点 → 回显；服务端二次校验。
- 临床试验快照：unified-trial-mcp 四在线通道，CTV 命中 3 条；ChiCTR/ICTRP 当轮 FAILED 原样记录。
- 原生 AI 面板：`newSession(workspaceId)`、`ownsSession/currentSession`、草稿只填不发；业务区改为 `/api/mpn/ui/` iframe。
- 五件门禁 + 面板契约 + 全量路由探针接入 `npm run check`。

### 0.2.0 恢复轮补记（2026-11-15 中断恢复单）

- 设置页改为三 tab：工作区 / 文档解析（MinerU，未接入且勾选与保存不联网）/ 临床数据库；补 C1–C5 的可见口径。
- 指标改为按 `key::unit::method` 拆可比组：不同单位/方法不再共用 min/max，指标卡与一图秀同一分组。
- 记录表单改为三态：「取消 / 保存并继续录入 / 保存并关闭」；继续录入留在记录页，关闭回首页。
- 新增 `docs/INSPECTOR-REPORT.md`（D2 四态）、`docs/AUTOFIX-REPORT.md`（D3 修复与复跑）、`docs/release-draft/M9-starter-回流.md`。
- M6 静态装机：tgz 40 files / sha256 `20765b50…`；starter `check-profile` 原始 scope 白名单 0/0 假绿，已在回流草案给 patch。
- 五件门禁自检补齐：`check-trial-snapshot --self-test` 造合法快照（PASS）+ 改坏字段/哈希（FAIL）；`npm run check:selftest` 一次跑五件门禁 + 面板契约的反向对照。

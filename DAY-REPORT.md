# DAY-REPORT · 小髓宝 MPN 患者工作台 v0.2.0

日期：2026-11-15（Asia/Shanghai 白天单）
本单性质：19:08 TRANSPORT 中断后的**续跑恢复单**。上一轮已把 M1–M5 做到接近完成但未提交；本轮先按里程碑补 commit + push，再从 M6 继续。
仓：`xyb-openharness-dsh-plugins/mpn-workbench`（public）· 远程 `origin/main` · 认领 Issue #84 · BACKLOG W2 #26 T2。

## 1. 一句话结论

**M0–M9 全部走完**：源码/包/静态装机/草稿/回流均完成，`npm run release:check` exit 0；唯一未完成的是 **D4 装机实机环节（未验证 · 待 MacBook 装机环节）**，不是代码或数据缺口。

## 2. 三条不可让步各自结果

### ① 配置目录是真入口 —— 通过（源码 + 静态闸门）

- 命令与结果：`node scripts/check-data-dir.mjs .` → 4/4 OK：
  - ① 有真实选择动作 `pickDirectory`；
  - ② 拒绝清单完整（主目录本身 / 桌面 / 下载根 / tmp，客户端与服务端各一遍）；
  - ③ `cordis.patch.yml` 有 `config.root: !!js dshHomePath('mpn')`，`dsh/index.js` 真读 `config.root`；
  - ④ 未使用「本原型为示意，目录未真实挂载」作唯一实现。
- 实现：`lib/client.js` 调 `uiWorkspace.pickDirectory()`（异常/缺失才降级 `showDirectoryPicker`）→ `POST /api/mpn/root` → 服务端 `forbiddenRoot()` 二次判定 → 写 `app_setting`；设置页回显当前目录。
- `--self-test`：exit 0（造出的假入口被 4 条规则全部抓住）。
- **实机未验证**：真实 Desktop 选择器弹窗、退出重开回显。

### ② 临床试验入口功能完整 —— 通过（四段 + 真快照）

- 命令与结果：`check-trial-chain` → 四段齐（建档 / 检索 / 匹配 / 呈现收藏）；`check-trial-matching` → 10 个 JS 文件扫描 + 11 条规则自检；`test/trial-line.test.mjs` 3/3。
- 匹配口径：`pct = 符合 ÷ 已对照`；待确认按 0；四档分层；可对照 <2 不给百分数；药物靶点不进分母。
- 候选池卡头：已载 3 / 返回 N / 不是全库扫描 / 快照 2026-11-15；「相关 0 也不等于没有研究」在位。
- 快照对账：`check-trial-snapshot .` → manifest `recordCount=3` = jsonl 3 = sqlite 3；`sourceStatusRows=24`；15 个字段逐条一致；`--self-test` 造合法快照 PASS、改坏字段 FAIL、改坏哈希 FAIL。
- 通道终态：CTV `SUCCESS` 3 条；ChinaDrugTrials `NO_RESULTS` 0；ChiCTR / ICTRP `FAILED`（不算查过）；两个胰腺癌归档 `NEEDS_SETUP`（无 MPN 覆盖）。**FAILED ≠ 0 条**。

### ③ 新建患者并写进 sqlite —— 通过（测试实测）

- 命令与结果：`check-patient-create` 4/4；`test/write-api.test.mjs` 4/4：
  - 共存：两套 demo + 一个自建 = 3，自建 `is_demo=0`；
  - 8 类记录都能写库并同形回读；
  - 私密切换按 rowid 回写，reload 后仍在；
  - 错误路径可读：空名称 / 非法类型 / 不存在的记录。
- 入口：顶栏/档案管理「＋ 新建档案」→ `POST /api/mpn/subjects` → `INSERT INTO profiles(..., is_demo=0)` → 创建后立即切换；demo 不可删、不被覆盖。

## 3. 「?」实测

- 实际 URL：`http://127.0.0.1:4173/prototypes/v0.2/index.html`（指向**本仓原型**，不是 starter examples）。
- 命令：`CHROME_PATH=/usr/bin/chromium node scripts/probe-disease-primer.mjs --url http://127.0.0.1:4173/prototypes/v0.2/index.html`
- 结果：**P1–P9 + E0 共 10/10 通过**：
  - 顶栏「?」可点、aria-label 含四段；
  - 四段顺序 definition → evidence → landscape → trend；
  - 面板铺满视口（1249×829 / 1280×860）；
  - 打开压一条 history，`history.back()` 收起；
  - 「返回」与「关闭」两个独立入口；
  - Esc 只退一层；
  - 关闭后焦点回触发按钮、scrollY 260→260；
  - 每段有来源、趋势段无禁止词；
  - 1440/900/390 三档左基线对齐。
- `--self-test`：**exit 2（红）**，输出「未指定 --url：默认对象是 starter 参考页」——闸门有效。

## 4. 面板九条

- grep 数字（`lib/client.js`）：`newSession` **3** / `subscribe` **2** / `ensureSession(` **0** / `Boolean(conversation)` **0**。
- `node scripts/check-agent-pane-contract.mjs .` → **pass**：
  - 禁用 `Boolean(conversation)` ✓
  - 禁用 `ensureSession({})` ✓
  - `service.newSession(workspaceId)` ✓
  - 优先 `service.defaultWorkspace?.()?.workspaceId` ✓
  - 订阅会话变化并重渲染 ✓
  - `agent-draft` 草稿桥 ✓
  - 已有会话只开/收不重复创建 ✓
  - 取消提示 + 失败原因反馈 ✓
  - 创建成功后打开原生面板 ✓
  - 生成物无未替换占位符 ✓
- 订阅位置：在 Panel 组件体内、return 之前（静态检查通过）；按钮无会话时不 disabled。
- 安装/实机状态：**未验证 · 待 MacBook 装机环节**。本机无 DSH Desktop；只做了 tgz 解出副本静态扫描（1/1）。真实下拉、取消选目录、失败提示、重开复用均未观察。

## 5. 五件门禁结果

| 门禁 | 正测 | `--self-test` | 备注 |
| --- | --- | --- | --- |
| `check-data-dir.mjs .` | exit 0（4/4） | exit 0（假入口 4 条全红） | 真入口 + 四类拒绝 + 落点 |
| `check-trial-chain.mjs .` | exit 0（四段齐） | exit 0（裁剪文案反例被抓） | 35 号链路 |
| `check-patient-create.mjs .` | exit 0（4/4） | exit 0（只 demo 的反例被抓） | is_demo=0 落库 |
| `check-trial-snapshot.mjs .` | exit 0（3/3 + 24 状态行） | exit 0（字段/哈希两路反例均红） | 本轮补上 self-test；check 链**不带** `--if-present` |
| `check-trial-matching.mjs .` | exit 0（C1–C7） | exit 0（11/11 规则证明会红） | 匹配红线 |

另：`npm run check` exit 0（含上述五件 + schema + 词表 + parity + 13 单测）；`npm run check:selftest` exit 0（五件 + 面板契约一次跑完）；`npm run audit` 40/40 · 0 fail · 0 warn；`npm run release:check` exit 0。

## 6. D2 / D3 产出

- **D2 独立体检**（`docs/INSPECTOR-REPORT.md`）：四态 **通过 48 · 失败 7 · 跳过 1 · 待人工 1**；**P0 = 0**。
  - 失败项均为 P1/P2：A4 无深底原型声明条；D1/D2 一图秀无 rail 与 chips；D4 数据点未接原始报告弹层；F2/F5/F6 多医院/修订历史/联系方式未做。
  - 跳过：B1 本机无 breast-cancer 参考仓，未做逐屏家族对比。
  - 待人工：I5 Desktop 实机。
- **D3 验收自修**（`docs/AUTOFIX-REPORT.md`）：修复 **3 项**，轮次 1/2：
  1. 设置页补三 tab（工作区 / MinerU / 临床数据库）+ aria-selected；
  2. 指标按 `key::unit::method` 拆可比组（注入 g/dL 血气记录实测拆两条线）；
  3. 记录表单补「取消 / 保存并继续录入 / 保存并关闭」三态（浏览器实测 continue 留在 record、close 回 dash）。
- **修完全量复跑**：check 0 · test 13/13 · audit 40/40 · 路由探针 6/6 · primer 10/10 · self-test exit 2 · ui-parity 8 件同字节 · release:check 0。
- M6 静态装机：`npm pack` **40 files / 3.0 MB / sha256 `20765b506e68a7f76779d9bc51be000ac09e032577d465dbc50ae39d94307919`**；解出副本 `check-profile` 补 scope 后 **1/1**（newSession 1 / subscribe 3 / UI public/ / bundle ✓ / dep ✓）。

## 7. 未验证与异常（逐条）

1. **Desktop 实机安装、退出重开、三条点击（AI 对话 / 配置目录 / 新建我的档案）**：本机无 DSH Desktop → 一律「未验证 · 待 MacBook 装机环节」。未自行重启/关闭宿主。
2. **check-profile 原始脚本假绿**：starter 的 `check-profile.mjs` 只扫 `@xyb-community` / `@xyb-openharness-dsh-plugins`，本包 `@community/mpn-workbench` 被筛成 **0/0 且 exit 0**。已用仅补 `@community` scope 的副本复跑 1/1；修复 patch 与「0 项 = 硬失败」建议写进 `docs/release-draft/M9-starter-回流.md`。**不能把原始 0/0 写成通过。**
3. **ChiCTR 在线 / WHO ICTRP**：当轮 `FAILED`（UPSTREAM_MCP_FAILED / UNKNOWN_ERROR），原样记录；未查 ≠ 0 条。
4. **ChinaDrugTrials**：`NO_RESULTS`（0），只代表该组检索词/本地受控归档无返回，不代表官网无该试验。
5. **真实入排原文**：3 条快照保留 `eligibility_text`，但未逐条到登记页人工核对。
6. **中国指南原件 / NCCN 临床版全文**：未取得；只写「存在、大致讲什么」，不引条文。
7. **MinerU**：未接入；设置 tab 明确「勾选与保存都不联网」，不伪造解析结果。
8. **0 患者访谈 / 0 临床审核**：所有阈值、症状量表、提醒文案标「待临床核对」；不声明医学正确性。
9. **家族逐屏对比（B1）**：参考仓不在本机，跳过。
10. **多医院卡片、修订版本号/历史、联系方式**：未实现（D2 P2），本轮不硬塞 schema。
11. **M7/M8**：只备草稿（`docs/release-draft/M7-M8-草稿.md`），**未打 tag、未发 Release、未开 PR**。
12. **线上最新开发规范**：本轮未联网核对 `dshdesktop.com/workbench/docs/development.md`；按仓内 reference 与 starter 合同执行，不声明已核对最新。
13. **tgz 不进 git**：`*.tgz` 被 .gitignore；产物在 `/tmp/mpn-pack-final/`，hash 已记，需要时重打同 commit 可复现（npm pack 非 bit 级可复现，以文件 hash 为准）。

## 8. 需要我决定什么（最多 3 条）

1. **品牌名**：「小髓宝」为家族占位名，是否追认？若不追认，Release 标题与页面 META 需三处改。
2. **两处已记录的产品偏离**：A4 深底「交互原型 vX · 全部合成」声明条（与 customFrame 顶栏重复）与 D1/D2 一图秀 238px rail + 筛选 chips（当前单页 5 线总览）。是否要求在下一轮补？
3. **M7/M8 授权与装机**：是否授权打 `v0.2.0` tag + GitHub Release、开 BACKLOG #26 状态列 PR？以及 MacBook 上何时完成「安装 → 退出重开 → 三条点击」的 V2/V3。

---

### 附：本轮恢复动作

- 19:08 TRANSPORT 中断后，本地约 40 项改动按里程碑补 5 个检查点 commit 并 push：M1 `c712414` / M2 `fcf0702` / M3 `1104416` / M4 `6825299` / M5 `abb72c7`（消息均注明「中断恢复检查点」）。
- 之后完成 M6–M9、设置三 tab、指标拆组、记录三态、五件门禁 self-test、D2/D3 报告、PROGRESS/PARITY/TASKS/DEV-PLAN 回填。
- 起始 `2026-11-15 12:33 UTC`（当地 20:33），收尾约 `13:40 UTC`（当地 21:40），未触及 22:45 收尾线。

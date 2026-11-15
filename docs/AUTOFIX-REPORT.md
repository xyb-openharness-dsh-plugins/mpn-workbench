# 验收自修报告（D3）· 小髓宝 MPN

日期：2026-11-15
对象：`prototypes/v0.2` + `public/` + `dsh/`
方法：按 `prompts/USER-ACCEPTANCE-AUTOFIX.md` 的 DP / A–F 六类先检查、后修复；命中即修，修完全量复跑。修复轮次 **1/2**。

## DP 疾病概要

- 检查：顶栏 `[data-primer-open]` + 首页状态卡第二入口；`#disease-primer` 由 `primer.js` 运行时创建；四段顺序、来源行、返回/关闭双入口；Esc 一层。
- 结果：**通过**。`probe-disease-primer --url http://127.0.0.1:4173/prototypes/v0.2/index.html` → 10/10；`--self-test` → exit 2（红）。
- 修复：无。

## A 设置与弹层

- 检查：设置页原为 5 个并排 block，无三 tab；不满足 C1。
- 修复：改为 `role=tablist` 三 tab（工作区 / 文档解析（MinerU）/ 临床数据库），`aria-selected` 随点击切换；MinerU 明确「本台未接入」「勾选与保存都不联网」「Token 掩码」「pipeline 固定」「10MB/20 页」；临床 tab 保留逐通道终态。
- 回归：浏览器实测 3 个 tab 文案、切换后 `aria-selected` 正确；`probe-mpn-m2` settings 路由通过；`check-ui-parity` 8 件同字节。

## B 功能线完整性

- 检查：6 条一级路由非空；试验线四段齐。
- 结果：**通过**。无静默缺失。修复：无。

## C 试验匹配红线

- 检查：卡头候选池、分数+分母、三态证据链、靶点不进分母、<2 不给百分数。
- 结果：**通过**。`test/trial-line` 3/3；`check-trial-matching` 通过。修复：无。

## D 指标卡与指标体系

- 检查 1：卡片按 category 分组，组顺序 `血细胞 → 炎症与代谢 → 脾脏与体型 → 其他`；3 组 7 项。
- 检查 2：翻面双通道 `[aria-pressed=true]` + `preserve-3d`，固定 196px；截图 02/03。
- **命中问题**：同一指标不同单位/方法被合并进一组，共用 min/max，违反“单位/方法变化拆可比组”。
- 修复：`metricGroupId = key::unit::method`；指标卡与一图秀统一按组展示；`metricBase` 只用于取色。注入 `Hb 9.4 g/dL / 血气` 后实测：图例拆成「血红蛋白 · g/L / 静脉血」与「血红蛋白 · g/dL / 血气」两条，各自 min/max。
- 回归：`probe-mpn-m2` 6/6；指标页文本 >300；ui-parity 同字节。

## E 录入窗口

- 检查：8 类记录有统一入口；原表单只有一个「保存记录」按钮，缺三态。
- 修复：改为「取消 / 保存并继续录入 / 保存并关闭」；`submitter.data-mode` 决定保存后留在记录页或回首页；失败时按钮恢复对应文案。
- 回归：浏览器实测 continue 后 `state.page=record` 且表单仍在；close 后 `state.page=dash`；无 JS 错误。未做到“继续录入逐字保留已填内容”，如实记。
- 未修：F2/F5/F6（多医院卡片、修订版本号与历史、联系方式）——需要 schema 迁移与交互重做，本轮不硬塞。

## F 修复铁律

- 未改断言/哈希/迁移；未把未测写成通过。
- 改包后 `build:public` + ui-parity 双闸；`npm run check`、`npm test`、`npm run audit` 全量复跑。
- 版本仍 0.2.0（未发布，本轮为同一版内修复）；CHANGELOG 0.2.0 段已覆盖。

## 复跑数字

| 项 | 结果 |
| --- | --- |
| `npm run check` | exit 0（含五件门禁） |
| `npm test` | 13/13 |
| `npm run audit` | 40/40 · 0 fail · 0 warn |
| `npm run release:check` | exit 0 |
| `probe-mpn-m2` | PASS 6/6 routes · switch ✓ · 390 ✓ |
| `probe-disease-primer` | 10/10 |
| `probe-disease-primer --self-test` | exit 2（预期红） |
| `check-agent-pane-contract` | pass，newSession 3 / subscribe 2 / ensureSession 0 / Boolean(conversation) 0 |
| ui-parity | public 8 件与原型逐字节一致 |

## 未复现 / 未修

- 无头浏览器独立打开时 AI 面板不可用（需宿主）：不是缺陷，已提示“由 DSH 宿主提供”。
- Desktop 内嵌形态下的设置 tab、档案切换、目录选择：**未验证 · 待 MacBook 装机环节**。

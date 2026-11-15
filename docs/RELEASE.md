# 发布与回滚记录 · 小髓宝 MPN

版本 / tag / commit：`0.2.0`；**未打 tag**；M5 检查点 `abb72c7` + 本轮恢复提交（以 `git log` 为准）。
变更的功能 ID：P-DASH-01 / P-PROF-01 / P-REC-01 / P-MET-01 / P-CHART-01 / P-TRIAL-01..04 / P-SET-01..03 / P-PRIMER-01 / P-AI-01（见 `docs/PARITY.csv`）。
用户授权范围：MPN 病种、T2 方向由派单确认；M7/M8 对外动作**未授权**，仅草稿。

家族一致性：`npm run audit` → **40/40 通过 · 0 失败 · 0 待人工**；无 fail，warn 无。
源码检查：`npm run check` exit 0（五件门禁 + 面板契约 + schema + 13 单测）；`npm test` 13/13。
包检查 / 大小 / hash：`npm pack` 40 files，3.0 MB，sha256 `20765b506e68a7f76779d9bc51be000ac09e032577d465dbc50ae39d94307919`（2026-11-15）。
实机证据：**无**。本机无 DSH Desktop；仅对 pack 解出副本做 check-profile 静态扫描 1/1。**未验证 · 待 MacBook 装机环节**。

README / 许可证 / 素材来源 / 运行依赖 / 更新说明：README 已重写（疾病概要 / 关键功能 / 实渲截图 / 怎么用 / 数据与口径 / 开发）；许可证 `UNLICENSED`、private 待维护者确认；品牌「小髓宝」占位待追认；运行依赖 Node 22+。
演示数据清单已清理或明确示例环境：仓内只有两套合成示例（`is_demo=1`）与用户自建（运行期，不进仓）；无真实患者数据。
数据库迁移与旧包兼容：`schema/0001_initial.sql` 冻结；后续只新增 `000N_*.sql`；本轮无旧库升级需求。可用备份：用户数据目录由宿主 `config.root` 决定，卸载不删；升级前建议导出。
市场分发来源：**不投稿**（未授权，且 Desktop 实机未验证）。

| 动作 | 目标 | 真实结果 / URL / 证据 | 状态 |
| --- | --- | --- | --- |
| 本地安装 | Desktop profile | 本机无 Desktop；staging profile 静态扫描 1/1 | 未执行（实机） |
| Git push | `origin/main` | `8a0f6d6..abb72c7` 及后续恢复提交 | 已执行（源码） |
| Release / npm | tag `v0.2.0` / tgz | 仅草稿：`docs/release-draft/M7-M8-草稿.md` | 未执行 |
| 市场 PR | 官方目录仓库 | 未授权 | 未执行 |
| 上架 | 公开 catalog | — | 未执行 |

市场状态说明：GitHub Release 不会自动成为市场安装来源；本台未声明 tarball，也未投稿。代码 push ≠ 市场发布 ≠ Desktop 已装。

回滚步骤 / 数据兼容检查 / 已知限制：
- 回滚源码：`git revert` 本轮提交或回到 `8a0f6d6`；不要用清库恢复版本。
- 数据：sqlite 在用户资料目录；回滚包版本前先备份，迁移只增不删。
- 已知限制：MinerU 未接入；中国指南原件未取得；多医院/修订历史未实现；D2 报告 7 项 P1/P2；0 访谈 / 0 临床审核。

官方指南复核日期 / 来源：`https://dshdesktop.com/workbench/docs/development.md` 未在本轮联网核对（本机环境无外网保证）；包格式按仓内 `reference/official/development-2026-10-09.md` 与 starter 现有合同。**未声明已核对线上最新规范。**
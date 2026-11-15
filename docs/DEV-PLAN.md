# DEV-PLAN（M0–M9）

## 选择理由

MPN 是 T2 血液肿瘤，随访天然结构化（血常规、脾脏、症状、用药、血栓事件），与已有多数实体瘤仓差异明显；患者长期带病生活，复诊准备与指标趋势的价值高于“单次问答”。本仓按 `mpn-workbench` 新建，认领 issue `xyb-openharness-dsh-plugins/.github#84`，不再另开认领。

## 里程碑

| 阶段 | 交付 | 验收 | 状态 |
| --- | --- | --- | --- |
| M0 骨架 | 9 份文档 + 基线 check/test + 目录接线 | `npm run check` / `npm test` | **完成**（commit 8a0f6d6） |
| M1 调研 SPEC | SPEC / 研究 / 差异矩阵 / 流程 / 场景 / 交互 / HVT / 临床台账 | G1 自动签认 | **完成**（c712414；G1 待晨审追认） |
| M2 原型 | `prototypes/v0.2` 两套合成档案 + 四件套 + primer + 指标/一图秀/研究三子页 + 8 张实渲截图 | 路由走查 + primer probe 10/10 | **完成**（fcf0702；G2 自动签认） |
| M3 数据模型 | `schema/0001_initial.sql` 12 表 + freeze contract | check-schema 9/9 | **完成**（1104416） |
| M4 临床库 | 3 条 MPN 快照 + manifest/jsonl/sqlite + 通道终态 | check-trial-snapshot 对账 | **完成**（6825299） |
| M5 开发版 | public + dsh API + 8 类写入 + trialMatch + test | 五件门禁 + test 13/13 + audit 40/40 | **完成**（abb72c7） |
| M6 装机静态 | npm pack + 解出副本 check-profile 静态扫描 | tgz sha256 + 扫描 1/1 | **完成（仅静态）**；Desktop 实机未验证 |
| M7 发布 | **仅草稿** tag/release 文案到 docs/release-draft | 不真正发 | **完成草稿** |
| M8 回填 | **仅草稿** BACKLOG 状态行 PR 文案 | 不真正开 PR | **完成草稿** |
| M9 回流 | LESSONS + starter CHANGELOG/检查器草稿 + 至少 1 条可断言回流 | 本仓 check 全绿 + `check:selftest` | **完成**（check-profile scope/0 项失败草案；`check-trial-snapshot --self-test` 已落地） |

## M6 静态装机记录

- 产物：`community-mpn-workbench-0.2.0.tgz`，40 files，3.0 MB，sha256 `20765b506e68a7f76779d9bc51be000ac09e032577d465dbc50ae39d94307919`（2026-11-15 打包）。
- tgz 内四要素：`package/package.json` / `package/cordis.patch.yml` / `package/dsh/index.js` / `package/lib/client.js`；业务界面 `public/index.html` 在包内（scan 显示 `public/`）。
- 解出副本 staging profile（dependencies + dsh.profile.bundles 均登记）→ starter `check-profile.mjs` **原始版报 0/0**（脚本只扫 `@xyb-community` / `@xyb-openharness-dsh-plugins`，本包 scope 是 `@community`，等于静默空转）。
- 用同脚本仅补 `@community` scope 的副本复跑：**1/1 通过**（newSession 1 / subscribe 3 / ensureSession 0 / Boolean(conversation) 0 / 界面 public/ / bundle ✓ / dep ✓）。
- **未验证 · 待 MacBook 装机环节**：真实 profile 安装、退出重开、AI 对话 / 配置目录 / 新建我的档案三条实机点击、界面加载。静态扫描不能替代。

## 风险与处置

- 平台中断：每个里程碑 commit + push；本轮为 19:08 TRANSPORT 中断后的恢复单，M1–M5 本地进度已按里程碑补提交（提交信息注明检查点）。
- Desktop 不在本机：实机安装与三条点击一律“未验证 · 待 MacBook 装机环节”。
- 外部通道会抖：ChiCTR / ICTRP 当轮 FAILED 原样记录，不改写成 0。
- 无临床审核：不做个体判断；固定出口是“问医生”。
- 品牌名「小髓宝」为家族占位名，待用户追认。

## 下一步

1. MacBook 装机后跑四条实机验收；2. 补中国指南原件与 NCCN 临床版全文；3. 真实患者访谈 ≥3 位后重跑 HVT；4. M7/M8 经授权后再发。
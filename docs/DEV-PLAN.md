# DEV-PLAN（M0–M9）

## 选择理由

MPN 是 T2 血液肿瘤，随访天然结构化（血常规、脾脏、症状、用药），与已有多数实体瘤仓差异明显；患者长期带病生活，复诊准备与指标趋势的价值高于“单次问答”。本仓按 `mpn-workbench` 新建，认领 issue `xyb-openharness-dsh-plugins/.github#84`，不再另开认领。

## 里程碑

| 阶段 | 交付 | 验收 | 状态 |
| --- | --- | --- | --- |
| M0 骨架 | 9 份文档 + 基线 check/test + 目录接线 | `npm run check` / `npm test` | 进行中 |
| M1 调研 SPEC | SPEC / 研究 / 差异矩阵 / 流程 / 场景 / 交互 | G1 自动签认 | 待签 |
| M2 原型 | `prototypes/v0.2` 两套合成档案 + 四件套 + primer + 指标/一图秀/研究三子页 | 页面走查 + probe | 待做 |
| M3 数据模型 | `schema/0001_initial.sql` + freeze contract | check-schema | 待做 |
| M4 临床库 | 3 条 MPN 快照 + manifest/jsonl/sqlite + 通道终态 | check-trial-snapshot | 数据已采，待落盘 |
| M5 开发版 | public + dsh API + 8 类写入 + trialMatch + test | 五件门禁 + test | 待做 |
| M6 装机静态 | npm pack + check-profile 静态扫描 | tgz sha256 + 扫描报告 | 待做 |
| M7 发布 | **仅草稿** tag/release 文案到 docs/release-draft | 不真正发 | 待做 |
| M8 回填 | **仅草稿** BACKLOG 状态行 PR 文案 | 不真正开 PR | 待做 |
| M9 回流 | LESSONS + starter CHANGELOG 草稿 + 至少 1 条可断言回流 | starter check/test | 待做 |

## 风险

- 平台可能强停：每个里程碑即 commit + push。
- Desktop 不在本机：实机安装与三条点击一律“未验证 · 待 MacBook 装机环节”。
- 外部通道会抖：FAILED 原样记录，不改写成 0。
- 无临床审核：不做个体判断；固定出口是“问医生”。

## 下一步

1. 写生产前端与 API；2. 五件门禁逐件跑；3. 体检/验收；4. 打包静态扫描；5. 报告。

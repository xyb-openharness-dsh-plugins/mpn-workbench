# 临床数据台账（MPN · 2026-11-15）

## 一、快照

- 快照日期：**2026-11-15**（抓取时刻以 manifest 为准）。
- 采集入口：`unified-trial-mcp`（MCP stdio），脚本 `scripts/fetch-mpn-trials-2026.mjs`。
- 与 MPN 相关：**3 条**（PV/ET/PMF 登记研究；均为 CTV 本地索引命中）。总记录 3 条，无跨通道重复。
- 三份记录登记号：NCT07469891、NCT06661915、NCT05025488。
- 重要限制：这是 **本地索引 + 本轮在线通道终态**，不是全球全库扫描；3 条只说明“这些通道在这组检索词下返回了 3 条”，不说明“只有 3 条”。

逐通道终态（同一轮检索，原样记录）：

| 通道 | 终态 | 返回 | 口径 |
| --- | --- | --- | --- |
| ctv（ClinicalTrials.gov 本地索引） | SUCCESS | 3 | 本地 1,434 条索引；零命中只代表索引未命中 |
| chinadrugtrials（CDE 在线） | NO_RESULTS | 0 | 本地受控归档；不代表官网无该试验 |
| chictr_online | FAILED（UPSTREAM_MCP_FAILED） | — | **不算查过**，不计覆盖率 |
| ictrp（WHO） | FAILED（UPSTREAM_UNKNOWN_ERROR） | — | 上游已知静默缺口；**不算查过** |
| chictr_pancreatic_archive | NEEDS_SETUP | — | 仅胰腺癌离线语料，对 MPN 无覆盖 |
| xyb_chinadrugtrials_archive | NEEDS_SETUP | — | 仅胰腺癌离线语料，对 MPN 无覆盖 |

> FAILED ≠ 0 条；NEEDS_SETUP ≠ 没有研究。界面“临床数据库”tab 逐通道显示上表。

## 二、字段与判据

快照只保留登记事实：`recordId / sourceId / title / studyType / sponsor / registryNumbers / dates / sourceUrl / statusNote / snapshotDate`，另附 `rawFields` 摘要。**不落库** `eligible` / `suitability` / `risk_level` 等判读列。

匹配只用快照真实存在、且能从患者已确认字段对照的项：

1. 诊断/亚型（PV / ET / PMF / MPN-U，患者自报且标“已确认”）
2. 驱动突变（JAK2 / CALR / MPL，来自报告原文；未填=待确认）
3. 既往治疗（是否用过 JAK 抑制剂 / 羟基脲 / 干扰素）
4. 年龄（≥18 等公开条件）
5. 疾病阶段/范围（仅当患者档案有“加速期/急变期/纤维化”已确认字段）

药物靶点只作详情说明，**不进分母**。可对照项 <2 不给百分数。

## 三、数据来源与核验

- CTV 索引：`ctv_index` 语料 2026-10-05（sha256 与 manifest 核对通过），上游 `ctv-mcp-server@0.1.1`。
- ChinaDrugTrials：2026-11-15 公开入口页会话，查询词为 MPN 中英文组合。
- ChiCTR / ICTRP 上游：本轮连接失败，原因原样进 manifest，不手工改写为成功。
- 登记页地址：`https://clinicaltrials.gov/study/<NCT>`；界面只给普通链接，不内嵌抓取。

## 四、未取得 / 未验证

- 未取得三条研究的完整入排原文人工核对（快照保留 `eligibilityCriteria` 原文；仍需到登记页复核）。
- 未取得中国 NMPA 对每个 MPN 药物的适应证批件全文；治疗全景只写类别，不写“中国已批准用于 XX”。
- 未做临床医生审核（0 人）；所有症状量表与阈值标“待临床核对”。

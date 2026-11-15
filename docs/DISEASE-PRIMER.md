# 疾病概要 · 骨髓增殖性肿瘤（MPN）

- 项目 / 品牌：小髓宝（占位名，**待用户追认**）· MPN 患者工作台
- 病种：骨髓增殖性肿瘤（Myeloproliferative Neoplasms，PV / ET / PMF）
- 最后更新：2026-11-15
- 数据文件：`prototypes/v0.2/primer-data.js`（`window.DISEASE_PRIMER`），生产版同字节在 `public/primer-data.js`
- README 对应段：`## 疾病概要`
- 本页属解释层：不生成个体判断；固定出口是「选哪一个，这一句需要问你的医生」。

## 1 定义（`definition`）

骨髓增殖性肿瘤（MPN）是一组起源于造血干细胞的克隆性疾病，骨髓里某一系或多系细胞持续增多。经典三类：

- 真性红细胞增多症（PV）：红细胞总量增多，常伴 JAK2 V617F 或 JAK2 exon 12 突变；血栓是重要风险之一。
- 原发性血小板增多症（ET）：血小板持续增多、骨髓巨核细胞增多；JAK2、CALR、MPL 是常见驱动突变。
- 原发性骨髓纤维化（PMF）：骨髓纤维化与脾脏增大，可有贫血、疲劳、夜间盗汗、骨痛、早饱；诊断需要骨髓活检与分子检测。

另有慢性中性粒细胞白血病、慢性嗜酸性粒细胞白血病与不能分类的 MPN 等。驱动突变帮助分类，不是“严重程度分数”；同一张化验单在不同亚型里含义不同。本页只解释名词与已发表事实，不判断个人病情。

**来源**：WHO · *Classification of Haematolymphoid Tumours, 5th ed.: Myeloid and Histiocytic/Dendritic Neoplasms* · 2022 · 已取得 DOI 全文入口（`https://doi.org/10.1038/s41375-022-01613-1`）· 页码待核；NCCN · *NCCN Guidelines for Patients · Myeloproliferative Neoplasms* · 访问 2026-11-15 · 患者版 PDF 已取得 · 页码待核。

## 2 医学资料规范和指南情况（`evidence`）

| 机构 | 文件 | 版本 / 年份 | 原件 | 本台的用途 |
| --- | --- | --- | --- | --- |
| WHO | Classification of Haematolymphoid Tumours, 5th ed.（髓系与组织细胞/树突细胞） | 2022 | 已取得 DOI 全文入口 | MPN 亚型命名与诊断分类出处 |
| NCCN | NCCN Guidelines for Patients · Myeloproliferative Neoplasms | 版本以官网为准（访问 2026-11-15） | 已取得患者版 PDF | 患者可读的治疗全景与随访问题 |
| NCCN | NCCN Clinical Practice Guidelines · Myeloproliferative Neoplasms | 需登录查看 | **未取得全文**；仅官方入口页 | 只记录“存在这份文件”，不引用具体条文 |
| 中国指南 | 中华医学会血液学分会 MPN 相关诊疗指南 | 未取得原件 | **未取得原件，据二次来源** | 待补中国实践与药物可及性；不写成结论 |

- NCCN 患者版 PDF 与临床版不是同一份文件；临床版需自行注册/登录。
- 中国指南本轮未取得官方免费全文；中国药物适应证只以 NMPA 批件与医生解释为准。
- 本台 0 位临床医生审核；阈值、症状量表与提醒文案均标“待临床核对”。

**来源**：见上表逐行；NCCN 临床版入口 `https://www.nccn.org/guidelines/guidelines-detail?category=1&id=1477`（`entry`，官方入口页，需自行登录）。

## 3 目前治疗全景概要（`landscape`）

按受累器官与病情轻重分组，只列指南与文献出现过的**手段类别**，不排优劣、不写剂量、不写线序。

### 3.1 低危 / 以观察和风险控制为主

- PV / ET 低危：部分人以控制血细胞、降低血栓风险为目标；是否用药、用什么属于医生判断。
- PV 可能涉及放血；PV/ET 可能涉及低剂量阿司匹林等抗血小板策略，是否适用要看出血风险与医生评估。
- 观察不是“什么都不做”：血常规、脾脏、症状与血管事件仍按医生安排的节奏随访。

### 3.2 需要降细胞或靶向治疗时

- 降细胞治疗类别包括羟基脲、干扰素类等；亚型、年龄、生育计划与耐受性会影响选择。
- JAK 抑制剂（如芦可替尼等）用于部分 PV / ET / MF 患者，目标可能包括脾脏缩小与症状改善；适应证与剂量以批件和医生为准。
- 其他 JAK 抑制剂与不同机制药物在不同国家、年份获批的适应证不完全相同；不要用“别人在用”推断自己适用。

### 3.3 贫血、脾大与症状支持

- 贫血需查铁、叶酸、维生素 B12、溶血等原因；是否输血、用促红细胞生成素或其他药物需医生判断。
- 脾脏明显增大或有压迫症状时，可能讨论药物、局部治疗或手术；这些选择有明确风险与条件。
- 疲劳、瘙痒、骨痛、夜间盗汗、早饱等症状有非药物与药物两类处理思路；本台只帮记录，不给处理建议。

### 3.4 高危 / 进展与临床研究

- 部分高危或进展期 MF 会讨论异基因造血干细胞移植；是否适合、何时做需移植中心评估。
- 临床试验是正式选项之一，不是“最后手段”；登记信息不等于入组资格，也不等于有效或安全。
- 本台临床研究页只做字段对照与证据链展示，不判断是否符合入组。

> 以上是文献与指南里列出的手段，按受累器官与病情轻重排列，不代表任何一项适合你。选哪一个，这一句需要问你的医生。

**来源**：NCCN 患者版 PDF（治疗与随访章节，页码待核）；WHO 第 5 版（2022，页码待核）。

## 4 发展趋势（`trend`）

只写已发生事实：

1. **2022**：WHO 第 5 版《造血与淋巴组织肿瘤分类》髓系分册发表，MPN 亚型命名与诊断标准随之更新（Leukemia，2022）。
2. **2022**：国际共识分类（ICC）发表，与 WHO 第 5 版并行；两套分类在部分命名与阈值上并不完全相同（Blood，2022；DOI 待补）。
3. **2023-09**：美国 FDA 批准 momelotinib（OJJAARA）用于部分伴贫血的骨髓纤维化患者；批件与适应证以 FDA 原文为准。
4. **2026-10-05**：本台使用的 CTV（ClinicalTrials.gov 本地索引）语料截止该日，共 1,434 条记录；这是索引截止日，不是全球试验截止日。
5. **2026-11-15**：本台用 unified-trial-mcp 对 MPN 相关词做了一轮检索，CTV 返回 3 条登记记录；ChiCTR 在线与 WHO ICTRP 当轮 FAILED，不能据此说“没有研究”。

**来源**：WHO/Leukemia 2022（DOI 同 §1）；NCCN 患者版版本与更新页（页码待核）；FDA Drug Trials Snapshots: OJJAARA（官方入口页，批件原文需站内检索）；ClinicalTrials.gov `NCT07469891`（本台快照中的一条登记）。

## 5 落地清单

- [x] `prototypes/v0.2/primer.css`（按项目令牌微调，未改结构）
- [x] `prototypes/v0.2/primer.js`（模块运行时创建 `#disease-primer`）
- [x] `prototypes/v0.2/primer-data.js`（四段 id 固定 definition / evidence / landscape / trend）
- [x] `index.html` 三处引用（css / data / js，顺序正确）
- [x] 顶栏「?」+ 首页状态卡双入口
- [x] `node scripts/probe-disease-primer.mjs --url http://127.0.0.1:4173/prototypes/v0.2/index.html` → **10/10**
- [x] `--self-test` → exit 2（红，证明闸门有效）
- [ ] 中国指南原件、NCCN 临床版全文（未取得，待补）
- [ ] 临床审核（0 人，待人工）
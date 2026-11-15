# HTML 交互原型确认记录

状态：**已制作、已自动走查；用户未真实确认**（自动签认 G2，待晨审追认）。未取得用户明确确认前，本文件不把“自动测试绿”写成“用户已确认”。

- HTML 实际路径、版本与 SHA-256：
  - `prototypes/v0.2/index.html` — `5b80fda7066a09ed99ba6e8ceaa27707b87428de50ef9a63d9b938466078ad99`
  - `prototypes/v0.2/app.js` — `9d7bf128e8382111d6655a9232328dbee48db587a8b5c601ff8779857c52f4f7`
  - `prototypes/v0.2/demo-data.js` — `48a8d4e18c687ccc5076ee42ceee30e17b977686f7961ba5f80d39302cbc36fc`
  - 版本 `0.2.0`；SHA 以本文件所在 commit 为准（随后文档改动不改变原型三件套）。
- 当前 SPEC/场景/数据模型版本：`docs/SPEC.md`（v0.2 合同）、`docs/SCENARIOS.md`（10 场景）、`schema/0001_initial.sql`（冻结）。
- 预览环境/容器尺寸/日期：Chromium 154.0.8037.57 headless，2026-11-15；1440×1000 与 390×844；本地 dev server `http://127.0.0.1:4173/prototypes/v0.2/index.html`。无法预览项：真实 DSH Desktop customFrame 内嵌形态（本机无 Desktop）。
- 模拟数据/MockAdapter 与真实功能界限：演示档案为合成示例（`is_demo=1`）；开发版 API 已接 sqlite，自建档案 `is_demo=0`。临床试验为 3 条真实登记快照，但**不做入组判断**；MinerU 未接入；AI 对话需宿主。
- 核心任务、二级页、弹窗/状态、回顾/导出覆盖与未覆盖项：覆盖首页、记录、指标（卡/一图秀）、临床研究（匹配/检索/收藏）、资料与摘要、设置（工作区/MinerU/临床数据库）、疾病概要整页、档案管理。未覆盖：真实装机、真实患者数据导入、PDF 解析、多医院编辑历史版本。
- 版本号显示与一致性（P1）：页面顶栏徽标 `v0.2.0`、关于段 `v0.2.0`、`VERSION` / `package.json` / `lib/version.js` 同源；`check-version-literal` 通过。
- 一图秀核对：`docs/ONE-CHART-SPEC.md` C1–C12；有运行态证据 C1/C3/C5/C7/C11/C12，其余代码审查，未逐条自动断言。
- 用户反馈及修订：无真实用户反馈（0 访谈）。本轮自动走查修复：设置三 tab 补齐（C1）、指标单位/方法拆可比组（C12 关联）。

| 模块/功能ID | 对应 HTML/行为 | 实际走查证据 | 用户明确确认依据/人/日期 | 未确认项 | 允许实施的范围 |
| --- | --- | --- | --- | --- | --- |
| P-DASH-01 | 首页状态卡 / 两套档案切换 | probe 切档后 `周远` + Hb 94 | **无**（自动签认，待追认） | 真实 Desktop 内嵌 | 原型与生产 parity 已实施 |
| P-REC-01 | 8 类记录 → API | test/write-api 4/4 | **无** | 真实患者数据 | 已实施（合成数据） |
| P-MET-01 | 指标卡 3D 翻面 | 截图 02/03 + CSS 双通道 | **无** | 读屏 inert | 已实施 |
| P-CHART-01 | 一图秀 + 治疗/事件分层 | 截图 04；390 overflow=0 | **无** | >20 点压测 | 已实施 |
| P-TRIAL-01..04 | 匹配/检索/收藏/候选池口径 | test/trial-line 3/3；截图 05 | **无** | 入排原文人工核对 | 已实施（3 条快照） |
| P-SET-01..03 | 设置三 tab | 浏览器实测三 tab 可切、MinerU 未接入文案、FAILED 表 | **无** | 实机目录选择/重开回显 | 已实施 |
| P-PRIMER-01 | 疾病概要整页 | probe 10/10；self-test exit 2 | **无** | 中国指南原件 | 已实施 |
| P-AI-01 | 原生 AI 面板 | contract checker 全绿 | **无** | 实机创建/取消/重开 | 源码完成，实机未验证 |

只确认对应版本/模块，新增/重大交互变更重新展示；确认不代表服务接通、数据库冻结或业务验收通过。实际数据模型/API 复核后实现，参见 `docs/14-HTML-AND-DATA-CONTRACT.md`。
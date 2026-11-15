# 小髓宝 MPN · 一图秀开发规范（项目实例）

> 通用规范见 `docs/16-ONE-CHART-SPEC.md`；本文件只填本项目的具体口径。
> 状态：v0.2 已实现并在 1440/390 实渲；C1–C12 中自动可验项见下，未验证项如实列出。

日期：2026-11-15。实现入口：`prototypes/v0.2/app.js` 的 `oneChart(p)`，生产版 `public/app.js` 同字节；指标来源：`prototypes/v0.2/demo-data.js` + sqlite `metrics` 表。

## 1. 三个合同

| 合同 | 本项目口径 | 写在哪 |
| --- | --- | --- |
| 可比性 | Hb / PLT / WBC / LDH / 脾脏（cm）各自独立条带；不同指标不做同一纵轴、不算“病情总分”；单位或方法变化拆可比组，不跨组连线 | `docs/SPEC.md` §3、本文件 §3 |
| 归一化 | 每条线只用**该指标全期** min/max；零跨度时 span 兜底为 1；图例写明“自身 min–max”，图内固定标注“高低不可互比” | `oneChart` y() + 图例 |
| 事实源 | 前端读 `p.metrics`（生产版来自 `GET /api/mpn/bootstrap` → sqlite `metrics`）；治疗读 `p.treatments`；事件读 `p.entries`；页面不写死数字 | `dsh/workbench.js` bootstrap |

## 2. 布局

- 图容器 `.chart-wrap`：`overflow-x:auto; max-width:100%`；SVG `viewBox="0 0 900 360"`，`min-width:640px`。横向滚动只发生在图容器内。
- 图上方 5 条水平网格；下方日期刻度最多 4 个（首/尾锚定）。
- 治疗条独立 `<g data-layer="treatment">`，位于数据区下方；事件泳道在图后，**不改变曲线**。
- 右/左 rail 不在本台使用：MPN 单页先给“全期五条线”总览，指标筛选通过指标页完成；这是与 16 号通用 rail 形态的已记录偏离，理由是数据点少（每指标 1–5 个）且患者主任务是复诊总览。**待用户追认**。

## 3. 绘图纪律

| 编号 | 断言 | 本台实现 | 证据 |
| --- | --- | --- | --- |
| C1 | 每条线独立归一化 | `y(v, series)` 只用当前 series min/max | 代码 + 图内文案 |
| C2 | 不写“病情总分” | 无合成分数；caption 明确“合成一条线会骗人” | 运行态文案 |
| C3 | 单点不连线 | `pts.length > 1` 才输出 `<path>`，否则只画 circle | `oneChart` |
| C4 | 空窗口空态 | `chosen.length === 0` → `.empty` CTA | 代码 |
| C5 | 治疗条与数据分层 | `<g data-layer="treatment">`，`rect data-layer="treatment"` | 代码 |
| C6 | 移动端轨道 `minmax(0,1fr)` | 图容器 `max-width:100%`；无 grid 多列 | CSS + 390 probe overflow=0 |
| C7 | 横向滚动只在图容器 | `.chart-wrap{overflow-x:auto}`，body 不溢出 | probe 390 overflow=0 |
| C8 | 单点标签 | 每线末点数值进图例，不堆在点旁 | 图例 |
| C9 | 事件泳道不改曲线 | 事件只渲染在 `.event-lane`，不改 `p.metrics` | 代码 |
| C10 | 私密不进图 | `p.metrics` 已按 `is_private` 过滤（bootstrap 层） | `write-api` 测试 |
| C11 | 减少动效 | `@media (prefers-reduced-motion)` 关闭翻面动画，直接呈现背面 | CSS 344 行 |
| C12 | 单位/方法变化拆可比组 | `metricGroupId = key::unit::method`，指标卡与一图秀同一分组；不同组不连线、不共用 min/max | 运行态注入 g/dL 血气记录 → 图例拆成两条（实测） |

## 4. 未验证

- C1–C12 未逐条写成独立自动探针；C1/C3/C5/C7/C11/C12 有代码与运行态证据，其余为代码审查。G2 自动签认不替代用户确认。
- 真实数据量（>20 点/线）未压测；本机合成档案每线 1–5 点。
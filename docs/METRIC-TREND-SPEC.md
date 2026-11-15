# 小髓宝 MPN · 指标趋势 Tab 设计确认表

状态：v0.2 已实现（原型 + 生产同字节）。通用规范：[24-METRIC-TREND-TAB-DESIGN.md](24-METRIC-TREND-TAB-DESIGN.md)。实现成功不等于业务验收；Desktop 实机未验证。

| 事项 | 项目填写 |
| --- | --- |
| 用户/场景/一次任务 | MPN 患者复诊前看“最近一次血常规怎么样、和上次比变了多少、不同指标不能互相代替”；一次任务是找到异常/变化并带着问题去问医生 |
| 病情整理导航及旧入口映射 | 一级页「指标趋势」；首页状态卡「看趋势」进入同一页；记录页「＋ 记血常规」写完回到指标页 |
| 分类定义唯一文件、组顺序/项数口径 | `prototypes/v0.2/demo-data.js` 的 `groupOrder = ['血细胞','炎症与代谢','脾脏与体型','其他']`；`metricGroups()` 按 category 分组，组顺序同源；服务端种子读同一文件（装包回退 public 同字节） |
| 指标定义/别名/可接受单位来源 | 合成档案里 `key/label/category/unit/ref_low/ref_high/method/institution` 逐条给出；未来真实指标走定义目录 + 观察记录，不在页面写死 |
| SQLite表/字段与来源修订的映射 | `metrics(profile_key, metric_key, label, category, value_num, value_text, unit, ref_low, ref_high, method, institution, measured_on, source, is_private, in_use, created_at)`；`GET /api/mpn/bootstrap` 只返回 `in_use=1 AND is_private=0` |
| 单位/方法/机构可比组策略 | `metricGroupId = key::unit::method`；不同单位/方法各成一张卡、各成一条线，不共用 min/max；机构只展示，不拆组（同一方法不同机构仍可比，但卡片写机构供核对） |
| 未知日期/文本值/同日多次 | 日期缺失不进趋势（列表仍显示）；文本值（如“未测”）`value_num` 为 NULL，不参与统计；同日多次按 `measured_on, id` 稳定排序 |
| 最近报告ID/修订版聚合规则 | 卡片“最近值”取该可比组内按日期最后一条；不把不同报告合成一条；修订沿用 `in_use` 与来源，不覆盖历史 |
| 卡片高/字阶/2列→1列阈值/大字 | `.metric-card` 固定 196px；`.metric-grid` 两列，窄容器（≤900）单列；正文 12.5–15px，指标大数字 ≥30px |
| 3D翻面、来源点命中、键盘/读屏 | `perspective:900` + `preserve-3d` + `rotateY(180deg)`；双通道 `[aria-pressed=true]` 与 `.flipped` 同步（JS 只设 aria，CSS 双选择器）；按钮可键盘 Enter/Space；背面 `aria-hidden` 由 `inert` 语义待补（见未验证） |
| 0/1/多条及跨方法测试数据 | 合成档案 A 记录少、B 记录多；0 条走 `.empty` CTA；1 条不连线；跨方法已用注入 g/dL 血气记录实测拆组 |
| HTML版本/路径/hash/截图 | `prototypes/v0.2/index.html`，v0.2.0；截图 `docs/screenshots/02-metrics-cards.png`、`03-metric-flipped.png`、`04-one-chart.png`；hash 以 git commit 为准 |
| 开发者确认版本、日期、模块范围 | 自动签认 G2（2026-11-15，待晨审追认）；**用户未真实确认** |
| MT01–MT15结果/证据/偏差 | 未逐条写成独立断言。有证据：分组顺序（代码）、翻面 CSS（02/03 截图）、单点不连线（代码）、拆组（注入实测）、390 无溢出（probe）。其余为代码审查，按“待人工”计 |
| Desktop app/profile/RC与人工验收 | **未验证 · 待 MacBook 装机环节** |

接口/数据库变化需单列迁移与旧数据兼容，不因增加分类 Tab 而另存重复病历。

## 未验证

- 背面隐藏面 `inert` 未实现；读屏在翻面后仍可能读到两面内容（待补）。
- 真实指标量（>20 点/项）未压测；合成档案每项 1–5 点。
- MT01–MT15 未逐条形成自动证据，G2 自动签认不替代用户确认。
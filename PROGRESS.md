# PROGRESS

更新：2026-11-15（Asia/Shanghai 白天单；19:08 TRANSPORT 中断恢复）

## 当前里程碑

M0–M6 完成；M7/M8 草稿完成；M9 回流完成；Desktop 实机（V2/V3）未验证。

## 已完成

- M0：starter 初始化、9 件文档骨架、目录接线。
- M1：SPEC / USER-RESEARCH / DIFF-MATRIX / PATIENT-FLOW / SCENARIOS / INTERACTION-DESIGN / HVT / CLINICAL-DATA；G1 自动签认（待晨审追认）。
- M2：`prototypes/v0.2` 两套合成档案、八类记录、指标卡（3D 翻面）、一图秀、临床研究三子页、疾病概要整页、设置三 tab；8 张实渲截图；路由探针 6/6，primer 10/10。
- M3：`schema/0001_initial.sql` 12 表 + freeze contract；判读列 0；check-schema 9/9。
- M4：3 条 MPN 登记快照（manifest/jsonl/sqlite）+ 通道终态（ChiCTR/ICTRP FAILED 原样）；sourceStatuses 24 行。
- M5：public 生产版与 dsh API/sqlite、8 类写入、档案创建、隐私三出口、试验匹配；五件门禁全绿；test 13/13；audit 40/40；`npm run check` exit 0。
- M6：npm pack 40 files / 3.0 MB / sha256 已记；解出副本 check-profile 静态扫描 1/1（原始脚本 scope 缺口见 DEV-PLAN）。
- M7/M8：`docs/release-draft/M7-M8-草稿.md`，仅草稿，未发 tag/Release/PR。
- M9：项目 LESSONS、starter 回流草案（check-profile scope + 0 检查硬失败）。

## 下一步

1. MacBook 实机安装 → 退出重开 → AI 对话 / 配置目录 / 新建我的档案三条点击。
2. 补中国指南原件、NCCN 临床版全文；至少 3 位患者访谈后重跑 HVT。
3. 授权后再执行 M7 tag/Release 与 M8 回填 PR。

## 阻塞

- 本机无 DSH Desktop：V2/V3 只能写“未验证 · 待 MacBook 装机环节”。
- 0 患者访谈 / 0 临床审核：不阻断开发，阻断“医学正确性”声明。

## 各闸口结论

| 闸口 | 结论 | 证据 |
| --- | --- | --- |
| G1 | 自动签认通过（待晨审追认） | `docs/signoffs/G1-自动签认.md` |
| G2 | 自动签认通过（待晨审追认；用户未真实确认） | `docs/signoffs/G2-自动签认.md` |
| G3 | 通过（schema 冻结 + 判读列 0） | check-schema 9/9 |
| V1 | 通过（源码/包/tgz 静态） | check 0 / test 13/13 / audit 40/40 |
| V2 | 未验证 · 待 MacBook 装机环节 | 本机无 Desktop |
| V3 | 未验证 · 待 MacBook 装机环节 | 三条点击未执行 |
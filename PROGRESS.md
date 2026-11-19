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
## 2026-11-19 08:xx M6 装机记录（本地代跑，待晨审追认）

- 装机：`dsh plugin --profile web add`（DSH_HOME 指向 io.dsh.desktop harness）装入 profile web；dep + bundles + node_modules 三点核验 0.2.1。
- 实测 bug 与修复：宿主 exact route 按路径去重，`/api/mpn/root` GET+POST 各注册一次触发 `webserver: duplicate exact route`；改为每路径注册一次、handler 内按 method 分发（dsh/index.js），版本 0.2.0→0.2.1，check 44→13/13 全绿、ui-parity 两处版本字面量同步。
- 宿主证据：重启后 verify:desktop 全过（本次段 0 报错、mpn.sqlite 生成、清单含本包）；small-bowel 同段 0 报错。
- 未做：人眼真机走查（新会话点击路径）留待用户；push 未执行（github.com:443 间歇不通，本地已 commit）。

## 2026-11-19 10:xx 侧栏新建档案直达按钮（用户反馈）

- 用户要求与 small-bowel 同款：档案菜单同步加创建新档案入口。mpn 侧栏档案卡下方新增「＋ 新建档案」虚线按钮（data-action=profiles，复用档案管理弹窗，聚焦到名称输入框），原型 v0.2 app.js/style.css 同步改动保持 ui-parity。
- 升版 0.2.2；check/test 全绿；装机三点核验 0.2.2；重启后本次段报错 0 行。

## 2026-11-19 12:xx 官方登记页外链修复（0.2.3）

- 同 small-bowel 0.2.4：沙箱 iframe 补 allow-popups + 壳层 mpn:open-external 兜底 + 业务页 source-link 点击兜底；原型同步。check 13/13；装机核验 0.2.3。

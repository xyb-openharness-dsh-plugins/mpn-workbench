# DEV-REQUIREMENTS · 2026-11-15（MPN 白天单）

> 冲突顺序：FULL-CYCLE-KICKOFF > 本次派单说明 > 本文件 > 其他模板。
> 0 患者访谈、0 临床审核；下列默认值均为可回退占位，**待用户追认**。

## 一、范围与身份

- H1 病种：MPN（PV / ET / PMF 为主），不是“泛血液肿瘤”。所有页面用 MPN 语义，不套用实体瘤分期/治疗线序。
- H2 品牌：**小髓宝**（占位名，待用户追认）；slug `mpn`，包名 `@community/mpn-workbench`。
- H3 目标用户：患者本人优先，照护者次之；不把医生查房流程当默认首页。
- H4 服务主体：单机、本地优先；业务数据只在本机 sqlite，不上传；AI 对话由 DSH 宿主原生面板承载。

## 二、三条不可让步（缺一即返工）

- H5 配置目录：顶栏/设置都必须是真入口；先调 `bridge.uiWorkspace.pickDirectory()`，拿不到才降级 `showDirectoryPicker`；客户端与服务端各拒一次“主目录本身/桌面/下载根/tmp”；落点 `config.root: !!js dshHomePath('mpn')`，`dsh/index.js` 真读 `config.root`；选择回显，重开仍在（`app_setting`）。
- H6 临床试验：四段链路完整；候选池卡头固定“已载 N / 返回 M / 不是全库扫描 + 快照日期”；匹配 pct 只在展示层，分母必显，<2 可对照项不给百分数；收藏零副作用。
- H7 新建患者：档案级入口 → `POST /api/mpn/subjects` → `INSERT INTO subjects(..., is_demo=0)`；创建后自动切换、整页联动；demo 有 `is_demo`、不可删、不被覆盖；8 类记录全部 API 落库，reload 仍在。

## 三、UI 与交互

- H8 两套合成档案：A 刚确诊记录少、B 长期随访记录多；唯一数据源 `demo-data.js` / 服务端 seed；切换整页联动。
- H9 首页双入口疾病概要；`primer-data.js` 四段 id 固定；面板由 `primer.js` 运行时创建 `#disease-primer`，整页不是弹窗。
- H10 指标卡按类别分组、固定高度 3D 翻面；单指标全期 min/max；单点不连线；治疗与数据分层。
- H11 AI 入口：顶栏原生面板五态按钮；无会话不 disabled；`newSession(workspaceId)`；草稿只填不发。
- H12 窄宽：390px 无横向溢出（图表容器内滚动除外）；触控目标 ≥44px。

## 四、数据与隐私

- H13 schema 冻结后只增迁移；`subjects.is_demo` 必存；判读列（diagnosis/risk_level/eligible/suitability）禁止。
- H14 私密三出口：列表、详情、导出均过滤；切换乐观更新，失败回滚。
- H15 演示与真实数据分离；真实患者数据不进仓、不进报告；只用合成/脱敏数据。
- H16 外部事实带来源、日期、核实状态；指南没拿到原件写“未取得原件，据二次来源”。

## 五、可回退默认值（待追认）

| # | 决策 | 采用值 | 回退方式 |
| --- | --- | --- | --- |
| D1 | 品牌 | 小髓宝 | 改 META/title/README 三处 |
| D2 | 默认页 | 概览 | 改 `state.page` 初值 |
| D3 | 指标 | WBC/Hb/PLT/LDH/脾脏长径/体重 | 定义目录加项 |
| D4 | 症状量表 | 0–10 自评 + MPN-SAF 十项简化版（非诊断） | 换量表需临床确认 |
| D5 | 复诊摘要 | 本地打印/导出 HTML | 不做云分享 |
| D6 | 目录默认 | `dshHomePath('mpn')` | 用户在设置里改 |
| D7 | 临床研究范围 | 仅血液 MPN 相关登记；候选池标“本地快照 + 在线通道终态” | 关闭线则写实测裁剪证据 |

## 六、硬约束的可执行验收

```bash
node scripts/check-data-dir.mjs .
node scripts/check-trial-chain.mjs .
node scripts/check-patient-create.mjs .
node scripts/check-trial-snapshot.mjs .
node scripts/check-trial-matching.mjs .
node scripts/check-agent-pane-contract.mjs .
npm run check
npm test
npm run audit
```

五件门禁 + 面板契约都必须 exit 0；每件的 `--self-test` 必须能红。装机静态扫描见 `scripts/check-profile.mjs`，Desktop 实机项标“未验证”。

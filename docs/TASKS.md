# 实施任务与当前交接

规格版本：`docs/SPEC.md`（v0.2 原型合同）；原型：`prototypes/v0.2`；分支 `main` / 包版本 `0.2.0`。

| ID | 业务单元 | 前置依赖 | 拥有文件/模块 | 实现/检查要求 | 证据 | 状态 |
| --- | --- | --- | --- | --- | --- | --- |
| T01 | 接入基线 | BRIEF/SPEC | package/patch/entry | 实际包可被目标宿主加载 | tgz 40 files；check-profile 1/1 | 静态通过；实机未验证 |
| T02 | 数据/API | T01 + 合同 | `dsh/workbench.js` / `schema` | 旧库兼容与读写闭环 | test/write-api 4/4；check-schema 9/9 | 完成 |
| T03 | 共享 UI | 原型冻结/API 合同 | `public/app.js` + `style.css` | 翻面/图表/弹层/状态 | probe 6/6；probe-primer 10/10 | 完成（原型 + 生产 parity） |
| T04 | 完整 Tab | T02/T03 | 6 个一级页 + 3 个子页 | 输入→操作→结果→回顾 | 路由探针 + 截图 8 张 | 完成 |
| T05 | 跨页/安装验收 | T04 | 集成/发布记录 | 官方自测、实际包/版本 | M6 静态；Desktop 实机未执行 | 部分完成 |
| T06 | 发布与市场（按授权） | T05 | `docs/RELEASE.md`、发行仓库、市场 PR | 记录授权、tag/包/hash、Profile、PR | 仅草稿 | 不适用（未授权） |
| T07 | 原生 Agent 面板 | T01 + 目标 Desktop 合同 | `lib/client.js` + `lib/layout.js` | 拉起、隐藏/重开、调宽、会话复用 | contract checker 全绿；实机未验证 | 源码完成；V3 未验证 |

当前失败/复现：无已知检查失败；Desktop 实机加载与点击未执行（本机无 Desktop）。

未验证项：真实 profile 安装、退出重开、AI 对话 / 配置目录 / 新建我的档案三条实机点击、界面加载、真实患者数据路径。

下一步具体动作/命令：

```bash
npm run release:check
npm pack --pack-destination release
# MacBook：装 profile → 退出重开 Desktop → 三条点击 → verify-desktop-load.mjs
```

用户已确认的偏好与授权：MPN 病种与 T2 方向由派单确认；「小髓宝」品牌名为占位、待追认；M7 tag/Release、M8 回填 PR 未授权，仅草稿。
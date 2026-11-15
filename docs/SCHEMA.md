# 数据主体—关系—表 · 小髓宝 MPN

冻结文件：`schema/0001_initial.sql`（12 表）；`schema/freeze-contract.md` 记录 sha256。结构变更只能新增 `000N_*.sql`，不改冻结文件。

| 实体 | 稳定 ID | 主体/外键 | 核心字段/类型 | 约束/索引 | 来源/确认 | 生命周期 |
| --- | --- | --- | --- | --- | --- | --- |
| profiles | `profile_key` TEXT | 自身 | name/tag/subtype/diagnosed_on/summary/is_demo | PK；`is_demo` 0/1 | 演示种子 / 用户新建 / API | 不可删 demo；用户档案可长期保留 |
| profile_facts | rowid | `profile_key` → profiles | field/label/value/source/confirmed | FK；confirmed 0/1 | 用户自填 / 报告确认 | 未确认字段不参与匹配 |
| entries | rowid | `profile_key` | kind/title/body/data_json/event_date/source/is_private | `in_use`、`is_private` | 患者自记 / 门诊原文 | 8 类记录；软失效 `in_use=0` |
| metrics | rowid | `profile_key` | metric_key/label/category/value_num/value_text/unit/ref_low/ref_high/method/institution/measured_on/is_private | `in_use`、`is_private` | 化验/自记 | 读时派生分级；不回写判读列 |
| treatments | rowid | `profile_key` | name/status/started_on/ended_on/note/source | `in_use`、`is_private` | 患者自记 / 医生原话 | 一图秀治疗泳道 |
| saved_trial | rowid | `profile_key` | trial_key/state/saved_on/is_private | UNIQUE(profile_key,trial_key) | 用户收藏 | 拒收只删除本机收藏，零副作用 |
| trials | rowid | 快照 | record_id/source_id/title/study_type/sponsors/registry_numbers/dates/source_url/status_note/snapshot_date/conditions_json/phase_json/countries_json/eligibility_text/raw_json/relevant | UNIQUE(record_id) | `research/mpn-2026` | 只读快照；不含判读列 |
| source_statuses | rowid | 快照 | query/source_id/state | 唯一 query×source | fetch 同轮写入 | FAILED 原样，不改成 0 |
| app_setting | `key` TEXT | 自身 | key/value/updated_at | PK | 宿主/用户 | 目录、偏好 |
| import_batches / import_items / import_conflicts | rowid | batch → item | 文件/解析候选/冲突 | FK | 未来 MinerU | 未接入，表先冻结 |

实体图：`profiles 1—N entries/metrics/treatments/profile_facts/saved_trial`；`trials 1—N source_statuses`（按 query）；`import_batches 1—N import_items 1—N import_conflicts`。

扩展策略：新增普通指标走 `metrics` 行 + 指标定义目录（当前 demo 元数据），不改表；新增记录类型走 `entries.kind` 与 `data_json`（有类型/上限，不塞核心关系）；只有稳定语义/约束变化才新增迁移。核心关系保留外键与约束，不用无限 JSON 代替。

迁移 ledger / 旧库 / 备份 / 事务：`PRAGMA user_version=1`；迁移只在启动时按序号执行；单个写入用事务；备份由用户资料目录导出负责（卸载不删）。

数据根选择 / 路径校验 / 公私分离：`config.root` 由 `dshHomePath('mpn')` 注入；服务端 `forbiddenRoot()` 二次拒绝主目录/桌面/下载根/tmp；`is_private` 三出口过滤（列表 / 导出 / AI 上下文）。

统一读模型与跨页一致性：`bootstrap()` 一次返回 profiles + metrics + entries + treatments + saved_trials + trialSnapshot；六页共用；写后返回新 bootstrap，前端不各自拼数据。

## 持久化与记忆选型

等级 B（本机单用户 SQLite）：数据量小（每档案数十至数百条）、离线优先、需跨页一致、无需并发多写。备用为 JSON 导出/导入；不使用外部记忆服务。

| 数据类别 | 权威位置/格式 | 读写责任 | 来源/revision | 索引/失效/保留规则 |
| --- | --- | --- | --- | --- |
| 已确认业务事实 | sqlite `entries/metrics/profile_facts` | `Workbench` 写、`bootstrap` 读 | source 字段 + `created_at` | `in_use` 软失效；不覆盖 demo |
| 文件与产物 | 用户资料目录（未接入上传） | 用户/未来 MinerU | 相对路径 + hash（预留） | 卸载不删 |
| 偏好/摘要/记忆 | `app_setting` | 宿主/用户 | updated_at | 目录/偏好；不存真实病历 |
| 可重建缓存/派生 | 前端内存 + 读时分级 | 前端 | 不落库 | 刷新重建；判读列 0 |

同步 / 检索 / 纠正：单机单写，事务提交后读；检索按 profile_key 过滤；纠正是新增记录或 `in_use=0`（未做版本历史，D2 P2）。外部记忆不适用。

## 前端与流程变化矩阵

| 变化情境 | 不变的事实/关系 | 配置/投影/API 变化 | 迁移/旧记录读取 | 验收证据 |
| --- | --- | --- | --- | --- |
| 改导航/布局/同一事实多视图 | profiles/entries/metrics | 只改读模型 | 无 | ui-parity + 路由探针 |
| 新字段/指标/可选记录类型 | 8 类 kind 与 metrics 行 | `data_json` 扩展或指标目录 | 无（旧行缺字段显式 null） | check-schema |
| 步骤插入/跳过/重开 | 事实不变 | 前端流程状态 | 无 | 无（本轮无多步流程） |
| 来源更正/删除/摘要失效 | 事实 + source | `in_use`/私密切换 | 软失效 | write-api 测试 |
| 旧数据库/旧 API 客户端 | user_version | 新增迁移 | 顺序迁移 | check-schema C1–C3 |

## UI/流程变化承受能力

页面拆合、流程先后、新增普通指标、来源更正、候选→接受、未知字段、隐私派生与快照失效，均只改读模型/命令用例；只有稳定语义变化才迁移。未做：多医院卡片、修订版本号、真实解析导入（D2 P2）。未执行项标未验证，不把设计能力写成已验收。
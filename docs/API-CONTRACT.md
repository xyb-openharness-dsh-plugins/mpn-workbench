# API 合同 · 小髓宝 MPN

API 前缀：`/api/mpn`；鉴权由宿主 `connection.requestRejection(req)` 处理，loopback 不跳过。所有 JSON 响应 `cache-control: no-store`；写命令失败返回 `{ ok:false, error, detail }`，不裸 throw。请求体上限 64KB。

| 方法/路径 | 意图 | 输入字段/类型/约束 | 成功响应 | 错误码 | 读写实体 | 幂等/事务 |
| --- | --- | --- | --- | --- | --- | --- |
| GET `/api/mpn/health` | 版本与能力 | 无 | `{ok,version,apiVersion:'v1',capabilities,dataRoot}` | 503（connection 不可用） | 无 | 只读 |
| GET `/api/mpn/bootstrap` | 统一读模型 | 无 | `{profiles,metrics,entries,treatments,saved_trials,trials,trialSnapshot,dataRoot,meta,groupOrder,recordKinds,brand,TODAY}`，私密不进 metrics/entries | 500 + detail | profiles/entries/metrics/treatments/trials | 只读 |
| GET `/api/mpn/root` | 当前资料目录 | 无 | `{ok,dir,source}` | 500 | app_setting | 只读 |
| POST `/api/mpn/root` | 切换资料目录 | `{dir:string}`；拒绝主目录/桌面/下载根/tmp；服务端 `forbiddenRoot()` 二次判定 | `{ok,dir,source}` | 400（forbidden）、500 | app_setting | 幂等（同 dir 无副作用） |
| POST `/api/mpn/subjects` | 新建我的档案 | `{name (必填,≤80),subtype?,diagnosed_on?,tag?}` | `{profileKey, bootstrap}`；`is_demo=0` | 400（空名称）、500 | profiles/profile_facts | 事务；每次新 key |
| POST `/api/mpn/entries` | 写 8 类记录 | `{profileKey, kind: symptom|lab|treatment|question|hospital|report|doc|mind, data:{date,title,body,source,private,...}}` | `{id, ok, bootstrap}` | 400（非法 kind/空内容）、404（档案不存在）、500 | entries（lab 另写 metrics） | 事务；同请求不重复插入 |
| POST `/api/mpn/privacy` | 设/取消私密 | `{profileKey, kind: entry|metric|lab|saved_trial, id, private:boolean}` | `{ok,id,is_private, bootstrap}` | 400/404 | entries/metrics/saved_trial | 按 rowid 更新；幂等 |
| POST `/api/mpn/saved-trials` | 收藏试验 | `{profileKey, trialKey, state: 在跟|准备问|已归档}` | `{ok, bootstrap}` | 400/404 | saved_trial | UNIQUE(profile_key,trial_key) upsert |
| GET `/api/mpn/trials?keyword=` | 试验快照/匹配读 | `keyword` 可选（≤120 字） | `{ok,total,returned,honestyNote,records}` | 500 | trials | 只读 |
| GET `/api/mpn/ui/` `/api/mpn/ui/index.html` | 业务界面 | 无 | `text/html`（public/index.html） | 500（缺文件） | public/ | 只读 |
| GET `/api/mpn/ui/<name>` | 静态资源 | 白名单 8 件：app.js/style.css/demo-data.js/primer-data.js/primer.js/primer.css/trial-match.js | 正确 content-type | 404 | public/ | 只读 |

通用字段：`profileKey`（稳定档案 ID）、`date`（`YYYY-MM-DD`，本地日）、`unit`（原始单位）、`source`（自记/门诊/报告原文）、`is_private`（0/1）、`in_use`（软失效）、`created_at`。时区按宿主本地日；不做 UTC 换算。

空记录 / 非法输入 / 主体不存在 / 取消 / 并发覆盖 / 服务不可用的实际响应：

- 空档案：`bootstrap` 返回空数组 + 前端空态 CTA，不借用 demo 数据。
- 空名称：400 `档案名称必填`；非法 kind：400 `未知记录类型`；不存在记录：404 `记录不存在`。
- 取消目录选择：宿主侧不发 POST，不产生 app_setting；面板提示可重试。
- 并发覆盖：单机单写；同 rowid 后写覆盖 `is_private`，不覆盖历史正文（无版本历史，已知限制）。
- 服务不可用：`connection` 能力缺失 → 503；读写异常 → 500 + 可读 detail，不白屏。

读模型样例：

```json
{ "profiles": [{ "id": "demo-a", "name": "林岚 · 合成示例", "is_demo": 1, "metrics": [], "entries": [] }],
  "trialSnapshot": { "recordCount": 3, "relevant": 3, "snapshotDate": "2026-11-15", "channels": [] },
  "dataRoot": { "dir": "/…/mpn" } }
```

写命令样例：

```json
POST /api/mpn/entries
{ "profileKey": "demo-a", "kind": "lab",
  "data": { "date": "2026-11-15", "title": "血红蛋白 149", "source": "患者自记",
            "metric": { "key": "Hb", "label": "血红蛋白", "category": "血细胞", "value": 149,
                       "unit": "g/L", "ref_low": 120, "ref_high": 160, "method": "静脉血",
                       "institution": "市一医院检验科" } } }
```

前端未知字段兼容：读模型多字段忽略、不渲染；写命令只取白名单字段。快照失效：`trialSnapshot.snapshotDate` 过期时前端提示“快照会过期”，设置 tab 同源显示。本地/外部错误区分：本地 sqlite 错误 → 500 detail；外部通道在快照阶段记录 `FAILED/NEEDS_SETUP`，不在运行时请求外部服务。
# M9 经验回流 · starter 草稿（未推送）

日期：2026-11-15
来源仓：`mpn-workbench` v0.2.0（MPN · T2）
状态：**仅草稿**。未改 `xyb-workbench-starter` 远端、未开 PR；由有权限的维护者在下一轮合并。

## 1. 可断言回流（本轮唯一硬缺口）

### 1.1 `scripts/check-profile.mjs`：scope 白名单导致「0 项通过」

- 现象：staging profile 的 `dependencies` 与 `dsh.profile.bundles` 都登记了 `@community/mpn-workbench`，但脚本 `SCOPES` 只有 `@xyb-community` / `@xyb-openharness-dsh-plugins`，输出「通过 0/0」并 exit 0。
- 影响：装机层闸门对不匹配 scope 的包静默空转；报告若照抄“check-profile 通过”，等于把未检查写成通过。
- 本轮证据：原始脚本 0/0；仅补 `@community` scope 的副本 1/1（newSession 1 / subscribe 3 / ensureSession 0 / Boolean(conversation) 0 / 界面 public/ / bundle ✓ / dep ✓）。

**建议 patch（`scripts/check-profile.mjs`）**

```diff
-const SCOPES = ['@xyb-community', '@xyb-openharness-dsh-plugins']
+/* 不硬编码家族 scope：从 profile 依赖推导 + 保留已知家族 scope 兜底。
+   新增病种/组织改名时，0 项检查必须失败，不能静默通过。 */
+const SCOPES = [...new Set([
+  ...Object.keys(deps).map((name) => name.startsWith('@') ? name.split('/')[0] : null).filter(Boolean),
+  '@xyb-community',
+  '@xyb-openharness-dsh-plugins',
+  '@community'
+])]
```

```diff
 for (const scope of SCOPES) {
   ...
 }
 
+if (rows.length === 0) {
+  console.error('✗ 没有匹配到任何工作台包：检查 0 项 ≠ 通过。核对 profile 的 dependencies / bundles 与 SCOPES。')
+  process.exit(1)
+}
+
 if (JSON_OUT) {
```

**回归断言**：造一个只含 `@community/x` 的 staging profile，旧脚本 exit 0 / 0 项；新脚本 exit 1 + 明确提示；把 scope 补进 SCOPES 后 1/1。

### 1.2 建议进 starter 的自检

- `check-profile.mjs --self-test`：临时目录造 3 个 profile（正确登记 / 未登记 bundles / 不匹配 scope），分别断言 exit 0 / 1 / 1。
- `npm run check` 里对 starter 自身跑一次 `node scripts/check-profile.mjs --help`，确保脚本至少能启动（本轮原始脚本能启动，但筛出 0 项）。

## 2. 文档回流（建议并入 docs/LESSONS.md L119–L121）

- L119：白名单筛选型闸门必须有「筛出 0 项 = 失败」兜底。
- L120：归一化前先按 `key::unit::method` 拆可比组；指标卡与图表共用分组函数。
- L121：中断恢复单先按里程碑补 commit + push，再继续开发。

## 2.1 本仓已落地的可断言回流

- `scripts/check-trial-snapshot.mjs` 新增 `--self-test`：临时造合法快照（PASS）→ 改坏字段（FAIL）→ 改坏哈希（FAIL），证明对账闸门不是只会在空目录报错。
- `package.json` 新增 `check:selftest`：五件门禁 + 面板契约一次跑完全部反向对照，exit 0。
- 该模式建议 starter 直接吸收为 `check-snapshot --self-test` 模板。

## 3. starter CHANGELOG 草稿

```markdown
## 1.3.3 — 2026-11-15（待发布）

- 从 mpn-workbench v0.2.0 回收：`check-profile.mjs` 不再硬编码家族 scope（从 profile dependencies 推导），并新增「检查 0 项 = 硬失败」；修复 `@community/*` 包被静默 0/0 通过的问题。
- 从 mpn-workbench 回收 L119–L121：白名单闸门 0 项兜底、指标可比组拆分、中断恢复 commit 顺序。
- 模板新增：设置三 tab（工作区 / MinerU / 临床数据库）与「未接入 MinerU 也必须写勾选不联网」文案。
```

## 4. 下一轮直接受益项

1. 任何新病种用 `@community/<slug>` 命名时，M6 的 check-profile 不再假绿（1.1 patch）。
2. 指标卡/一图秀模板默认带 `metricGroupId`，新仓不必再踩“单位混画”的坑（L120）。
3. 设置三 tab 的 MinerU 未接入文案可直接复用，减少 C3 返工。

## 5. 未做

- 未向 starter 推送、未开 starter PR（无授权）。
- 未改 starter 的 `check-profile` 本体；patch 只在本文档，待维护者审。
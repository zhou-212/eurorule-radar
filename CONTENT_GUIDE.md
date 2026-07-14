# CONTENT_GUIDE.md — 内容编辑指南

本指南说明如何在欧规雷达中**新增规则卡片、行动清单、日历事件**,以及**如何核对来源**。

---

## 0. 核心原则

> **每条规则附原始来源 + 核对日期;不杜撰法规结论、链接、日期或处罚后果;不依赖 AI 自行推断生效时间。**

写任何内容前,先回答三个问题:

1. 这条规则的**原始来源**是什么?有 URL 吗?URL 是官方的吗?
2. 我能**核实**关键时间(发布、开始执行、截止)吗?还是只是"印象"?
3. 这条内容**影响谁**?(国家 / 卖家类型 / 类目)—— 影响范围是宽是窄?

任何一个问题答不上来,先不发布,标 `draft: true` 或 `contentKind: 待核实`。

---

## 1. 内容状态(contentKind)—— 必读

每条规则卡 / 日历事件 / 清单必须明确 `contentKind`,**视觉上区分**,**不混淆**。

### 1.1 四种状态

| contentKind | 含义 | 视觉 | 何时用 |
|---|---|---|---|
| `基础规则` | 长期有效的常驻要求(GPSR / LUCID / EPR / EPREL 等) | 灰色徽标 | 法规已生效,持续存在,没有"截至日期" |
| `近期更新` | 90 天内有具体更新 / 修订 / 新规,**必须有官方原始来源 + 核对日期** | 绿色徽标 | 找到官方公告、EUR-Lex 法规修订、平台新公告 |
| `示例` | 编辑模板 / 演示用,**不代表任何真实事件** | 黄色"示例"徽标 | 写新类型内容时,先用示例占位,绝不发布到生产 |
| `待核实` | 尚未找到可靠原始来源,**不发布** | 紫色徽标 | 听过 / 印象中,等找到原文再升级 |

### 1.2 严格禁止

- ❌ **不允许**把未核实的"印象"或社群消息标为 `近期更新` 发布。
- ❌ **不允许**把 `基础规则` 的 `verifiedDate` 改到最近,包装成"刚刚更新"。
- ❌ **不允许**为了首页"近期更新"看起来丰富,塞示例内容或凑数。
- ❌ **不允许**把日历示例事件(`isExample: true`)作为真实截止日发布。
- ❌ **不允许**只引用 EUR-Lex 首页 / 欧盟委员会首页来支撑"具体日期";必须链接到具体条款 / 公告页面。

### 1.3 默认行为

- 首页"近期更新"区域**默认可能为空**;为空时,显示:
  > 暂未发布已核对的近期更新(2026 年新公告 / 修订 / 执法动态)。...
- 日历默认**只展示有官方原始来源的真实节点**;为空时,显示"暂未发布已核实的近期截止日"。
- "已核对的基础规则"区域列出 evergreen 卡片,带"基础规则"灰色徽标,明确告诉用户"这是常驻要求,不是新近变化"。

---

## 2. 新增规则详情(规则卡)

### 2.1 文件位置

`src/content/radar/<slug>.md`(或 `.mdx`)

`slug` 用英文/拼音,简短,描述性,例:`eu-gpsr-responsible-person.md`、`france-epr-triman.md`。

### 2.2 模板

```markdown
---
title: "标题(中文,简洁)"
summary: "一句话摘要,200 字以内"
publishedDate: 2026-01-15   # 首次发布日期
verifiedDate: 2026-01-15    # 最近核对日期(每次更新都要改)
effectiveDate: 2026-01-01   # (可选)开始执行日期
deadlineDate: 2026-06-30    # (可选)截止日期
countries: ["德国", "法国"]  # 适用国家,数组
platform: "Amazon DE/FR"    # 平台说明
sellerTypes: ["品牌卖家", "贸易商"]  # 卖家类型
categories: ["产品安全", "包装责任"]  # 主题
riskLevel: "高"             # 高 / 中 / 低
status: "生效中"            # 生效中 / 即将生效 / 持续关注 / 待核实
contentKind: "基础规则"     # 必填 — 见 §1
sourceName: "Amazon Seller Central"
sourceUrl: "https://sellercentral.amazon.eu/..."   # 必须是 https,必须是具体页面,不能是首页
sourceType: "官方公告"      # 官方公告 / 法规原文 / 权威媒体 / 社区 / 其他
disclaimerLevel: "high"     # standard / high / critical
featured: false             # 是否首页推荐
draft: false                # 是否草稿(true 时不构建)
example: false              # 是否示例内容(影响视觉标记)
---

## 一句话结论

<50-100 字,把"是否影响你 / 何时 / 做什么"说清。

## 适用范围

- **站点**:xxx
- **卖家类型**:xxx
- **商品/类目**:xxx
- **不适用**:xxx

## 关键时间线

- **YYYY-MM-DD**:事件 1
- **YYYY-MM-DD**:事件 2

## 你现在要做什么

1. 步骤 1(可执行,具体)
2. 步骤 2
3. 步骤 3
4. 步骤 4
5. 步骤 5
6. 步骤 6(最多 6 项,多了用户会跳过)

## 不处理的潜在影响

- **可能**:影响 1
- **可能**:影响 2
- **明确:本卡片不构成法律意见**

## 常见问题

**Q1:xxx?**
A:xxx。

(3-5 个 FAQ,选用户最常问的)

## 官方 / 原始来源

- 链接 1
- 链接 2

## 核对日期

本卡片由编辑团队于 **YYYY-MM-DD** 核对主要事实与链接。

## 风险提示与免责声明

本站是**信息整理和辅助判断工具**,不构成法律、税务、认证或专业合规意见。

## 相关规则

- [规则名 1](/radar/slug-1)
- [规则名 2](/radar/slug-2)

## 相关清单

- [清单名 1](/checklists/slug-1)
```

### 2.3 字段含义

| 字段 | 必填 | 说明 |
|---|---|---|
| `title` | ✅ | 卡片标题(中) |
| `summary` | ✅ | 列表 / 首页显示的摘要(200 字内) |
| `publishedDate` | ✅ | 首次发布到本站的日期 |
| `verifiedDate` | ✅ | 最近一次核对的日期;**每次更新必须改** |
| `effectiveDate` | ❌ | 法规 / 规则开始执行日期 |
| `deadlineDate` | ❌ | 截止日期 |
| `countries` | ✅ | 数组;例 `["德国", "法国"]` |
| `platform` | ✅ | 例 `Amazon EU` / `Amazon DE` |
| `sellerTypes` | ❌ | 数组;如 `["品牌卖家", "贸易商"]` |
| `categories` | ✅ | 数组;决定筛选分组,见下表 |
| `riskLevel` | ✅ | `高` / `中` / `低` |
| `status` | ✅ | `生效中` / `即将生效` / `持续关注` / `待核实` |
| `contentKind` | ✅ | `基础规则` / `近期更新` / `示例` / `待核实` —— 见 §1 |
| `sourceName` | ✅ | 简短来源名(可读) |
| `sourceUrl` | ✅ | 完整 URL,**必须是 https**,**必须是具体页面**(不能是首页) |
| `sourceType` | ✅ | `官方公告` / `法规原文` / `权威媒体` / `社区` / `其他` |
| `disclaimerLevel` | ✅ | `standard` / `high` / `critical` |
| `featured` | ❌ | `true` 时进入首页"基础规则"展示 |
| `draft` | ❌ | `true` 时不构建 |
| `example` | ❌ | `true` 时显示"示例内容"徽标 |

### 2.4 categories 取值约定

新增规则时,尽量复用以下 categories,避免分类碎片化:

- `产品安全`
- `包装责任`
- `能效与环保`
- `税务`
- `儿童与玩具`
- `标签与说明书`
- `平台合规`
- `跨境物流`
- `知识产权`(预留)

如果出现新主题,先在 `about.astro` 或 PR 描述里说明,然后再写卡片。

---

## 3. 新增行动清单

### 3.1 文件位置

`src/content/checklists/<slug>.md`

### 3.2 模板

```markdown
---
title: "清单标题(中文,描述动作)"
summary: "一句话说明这个清单的用途"
audience: ["新卖家", "运营", "合规"]  # 适用对象数组
verifiedDate: 2026-01-15
tags: ["VAT", "EPR", "CE", "GPSR"]
sourceUrls:
  - name: "Amazon Seller Central"
    url: "https://sellercentral.amazon.eu"
  - name: "EU 法规原文"
    url: "https://eur-lex.europa.eu/..."
printReady: true
example: false
---

## 适用范围

<说明这个清单适用谁 / 不适用谁>

## 最后核对日期

**YYYY-MM-DD**

## 来源提示与免责声明

本清单来自 xxx;**不构成法律或合规意见**。

---

## 1. 板块一(简短)

- [ ] 子项 1
- [ ] 子项 2

## 2. 板块二

- [ ] 子项 1
- [ ] 子项 2

## 完成后确认

- [ ] 验证 1
- [ ] 验证 2

## 来源

- [来源名 1](url)
- [来源名 2](url)

## 免责声明

本清单是辅助准备工具,**不构成法律、税务、认证或专业合规意见**。
```

### 3.3 复选框 + 打印

清单详情页 (`src/pages/checklists/[slug].astro`) 已自动:

- 把 `<li>` 渲染为可勾选(浏览器本地 localStorage 记忆)
- 提供"打印 / 导出 PDF"按钮
- 提供"重置勾选"按钮
- 提供"进度条"

清单 body 中写 `markdown` 列表 `- [ ] xxx` 即可,**不要**自己写 HTML。

---

## 4. 新增日历事件

### 4.1 文件位置

`src/content/calendar/events.json`(JSON 数组)

### 4.2 模板

```json
{
  "title": "事件标题(中文)",
  "date": "2026-06-30",
  "category": "包装与回收",
  "countries": ["法国"],
  "summary": "一句话说明这个事件,以及对卖家的影响。",
  "linkedRadarSlug": "france-epr-triman",
  "sourceUrl": "https://www.citeo.com",
  "verifiedDate": "2026-01-15",
  "isExample": false
}
```

字段说明:

| 字段 | 必填 | 说明 |
|---|---|---|
| `title` | ✅ | 事件标题 |
| `date` | ✅ | `YYYY-MM-DD` 格式 |
| `category` | ✅ | 主题(自由,但保持简短) |
| `countries` | ✅ | 数组,国家名 |
| `summary` | ✅ | 事件影响说明 |
| `linkedRadarSlug` | ❌ | 对应规则卡的 slug;无则填 `null` |
| `sourceUrl` | ✅ | 事件来源,**必须指向具体公告 / 截止日页面** |
| `verifiedDate` | ✅ | 核对日期 |
| `isExample` | ❌ | 是否示例事件(影响视觉标记) |

### 4.3 严格禁止

> ⚠️ **严禁**把未核实的日期伪造为"官方截止日"。如果只是"运营内部提醒",
> 把 `isExample` 设为 `true` 并在 `summary` 中说明。
>
> ⚠️ **严禁**链接到官网首页(如 https://ec.europa.eu/)来支撑"具体日期";
> 必须链接到具体公告 / 法规 / 截止日页面。
>
> ⚠️ **严禁**把已过去的日期混入"未来 90 天"分组 —— 会被自动归到"已过期"分组,看起来不专业。

### 4.4 自动分组

`src/pages/calendar.astro` 按"距今天数"自动分组:

- `urgent`:14 天内
- `this-month`:本月内(15-30 天)
- `later`:31-90 天
- `past`:已过期

### 4.5 默认行为

默认 `src/content/calendar/events.json` **只保留 1 条明确的示例事件**(用于视觉演示)。
**禁止**把示例事件当真实截止日发布;发布真实节点时,运营需把示例事件删除或保留在数组最末,
并补充已核实的真实节点。

---

## 5. 核对来源 SOP

### 5.1 来源白名单(必须)

| 类型 | 例子 | 信任度 |
|---|---|---|
| 法规原文 | EUR-Lex 具体条款页(不是首页)、Federal Law Gazette | ⭐⭐⭐⭐⭐ |
| 平台官方 | Amazon Seller Central 具体公告页(不是首页) | ⭐⭐⭐⭐⭐ |
| 主管机构 | 德国 LUCID、法国 Citeo、ADEME 具体页面 | ⭐⭐⭐⭐⭐ |
| 实验室 / 认证 | TÜV、SGS、Intertek 官方说明 | ⭐⭐⭐⭐ |
| 权威媒体 | Reuters、Bloomberg、路透社 | ⭐⭐⭐ |
| 行业协会 | amfori、Foreign Trade Association | ⭐⭐⭐ |
| 第三方博客 | 个人博客、自媒体 | ⭐ |
| 论坛 / 微信群 | 卖家群、Reddit | ⚠️ 不直接引用 |

### 5.2 必做

- [ ] 在浏览器实际打开 `sourceUrl`,确认页面真实存在
- [ ] 核对日期:从原始页面找发布 / 生效 / 截止日期
- [ ] 复制原文关键句(避免 AI 改写后走样)
- [ ] **链接必须指向具体页面**,不能是首页
- [ ] 截图原始页面(用 Wayback Machine / archive.org 保存快照)

### 5.3 不做

- ❌ 不引用未公开 / 截图的社群消息
- ❌ 不引用过期法规(除非明确写"旧版")
- ❌ 不引用 LLM 知识库作为唯一来源(LLM 可能幻觉)
- ❌ 不在没有原文的情况下推断"罚款金额" / "处罚结果"
- ❌ 不把 EUR-Lex 首页或欧盟委员会首页当作具体日期的依据

### 5.4 链接存档

对重要规则(高风险 / 大影响),在 PR 描述中附 `archive.org` 快照链接:

```
https://web.archive.org/web/<日期>/<原始 URL>
```

---

## 6. 写作风格

### 6.1 通用

- **第二人称**(你)而不是"(用户)"
- **短句优先**;长句拆成 2 句
- **动词优先**;少用名词化("进行操作" → "操作")
- **数字具体化**;"几千欧元罚款" → "最高 20 万欧元罚款"
- **避免堆术语**;首次出现给英文 / 缩写
- **中英混合不混乱**;专有名词用英文,描述用中文

### 6.2 标题

- "欧盟 GPSR 通用产品安全法规 已生效:亚马逊欧洲站卖家必须完成的责任人信息"
- "德国包装法 LUCID 与 EPR 注册:亚马逊德国站卖家必填"

### 6.3 FAQ 选什么

最常见的 3-5 个:

1. 我用 FBA,是不是亚马逊自动管?
2. 跨境直邮需要吗?
3. 小批量试卖需要做吗?
4. 我已经有 CE 标志 / 欧代,够了吗?
5. 截止日期前没做完会怎样?

### 6.4 不写

- 不写营销语("快来了解!"、"限时免费")
- 不写过度承诺("100% 避免下架"、"零风险")
- 不写主观评价("我个人认为")
- 不写没有来源的数据

---

## 7. 发布流程

```bash
# 1. 新建 / 修改内容
$EDITOR src/content/radar/eu-foo.md

# 2. 本地预览
npm.cmd run dev
# 访问 http://localhost:4321/radar/eu-foo

# 3. 检查
# - 字段完整
# - 链接 200
# - 字体 / 移动端正常
# - 标签 / 分类不出现新奇怪值

# 4. 构建(快速,跳过类型检查)
npm.cmd run build:fast

# 5. 完整构建(类型检查 + 静态生成,部署前必跑)
npm.cmd run build

# 6. 提交 + 推送
git add .
git commit -m "radar: 新增 EU XXX 规则"
git push origin main

# 7. 等待 GitHub Actions
# Settings → Actions → 看到绿色 ✓

# 8. 验证
# 访问 https://eurorule.example.com/radar/eu-foo
# 在 GSC 提交 URL 编入索引
```

---

## 8. 每周运营 SOP

| 步骤 | 动作 | 工具 |
|---|---|---|
| 1 | 扫描 Amazon Seller Central + EUR-Lex + 成员国主管机构公告 | 浏览器 / RSS |
| 2 | 找到 1-3 条**有原始来源 + 明确日期**的更新 | 收藏夹 / Notion |
| 3 | 写规则卡(基础规则 / 近期更新)或清单 | `src/content/radar/*.md` |
| 4 | `npm.cmd run dev` 本地预览,确认 375px 移动端可读 | Chrome DevTools |
| 5 | `npm.cmd run build:fast` 通过 | Terminal |
| 6 | `git commit` + `git push` | git |
| 7 | 等 GitHub Action 绿色 ✓,访问生产 URL 二次确认 | Browser |
| 8 | 每周汇总邮件(接 Tally / Brevo 后) | 邮件服务后台 |

---

## 9. 复盘与维护

### 9.1 定期复核

- **每周**:扫描官方公告 + 媒体
- **每月**:复核所有 `verifiedDate` 超过 90 天的卡片
- **每季度**:复核 categories / tags / contentKind 是否合理;合并碎片化分类

### 9.2 状态变更

| 触发 | 状态变更 |
|---|---|
| 法规正式生效 | `contentKind` 保持 `基础规则`,更新 `verifiedDate` |
| 法规被废除 / 撤销 | 撤下文章(或标注"已废止") |
| 新版本发布 | 更新文章,`verifiedDate` 更新,`contentKind` 改为 `近期更新` |
| 平台限流已执行 | 添加"案例"段落,描述影响 |

### 9.3 数据统计

每月统计:

- 新增 / 更新规则数(按 contentKind 分类)
- 列表页搜索关键词(自部署 Plausible / Cloudflare Analytics 后)
- 邮件订阅数(从邮件服务后台)
- 清单完成率(可考虑后续接统计)
- 自测提交数(后续接统计)

---

**最后更新**:2026-07-13

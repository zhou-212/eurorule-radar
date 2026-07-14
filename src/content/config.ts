// ============================================================
// Legacy Content Collections Config
// ------------------------------------------------------------
// Astro 5 在 legacy: { collections: true } 模式下,只搜索
// src/content/config.{js,mjs,ts,mts} 这个位置(不在 src/ 根)。
// 因此配置放在这里。
//
// 用 type: 'content' 而不是 type: 'data' / loader 模式,
// 这样 markdown 文件会被 Astro 当作 legacy 集合处理,允许
// 我们用 markdown.rehypePlugins 拦截并改写内部链接。
// (注:实际我们改用 src/lib/integration-rewrite-html.mjs 在
//  HTML 阶段改写,rehype 插件在 Astro 5 legacy 模式下 tree=undefined)
// ============================================================
import { defineCollection, z } from 'astro:content';

const radar = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    publishedDate: z.coerce.date(),
    verifiedDate: z.coerce.date(),
    effectiveDate: z.coerce.date().optional(),
    deadlineDate: z.coerce.date().optional(),
    countries: z.array(z.string()).min(1),
    platform: z.string().default('Amazon EU'),
    sellerTypes: z.array(z.string()).default([]),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    riskLevel: z.enum(['高', '中', '低']).default('中'),
    status: z.enum(['生效中', '即将生效', '过渡期', '持续关注', '待核实']).default('持续关注'),
    // 内容状态(用于首页 / 卡片视觉区分):
    //   基础规则  — 长期有效的常驻要求(GPSR / LUCID / EPR / EPREL 等)
    //   近期更新  — 90 天内有具体更新 / 修订 / 新规
    //   示例      — 编辑模板 / 演示用,不代表真实事件
    //   新手入门  — 给"刚注册欧洲站"小白的起步课(路线图 / 名词解释 / 邮件回复模板等)
    //   待核实    — 尚未找到可靠原始来源,仅作占位
    contentKind: z
      .enum(['基础规则', '近期更新', '示例', '新手入门', '待核实'])
      .default('基础规则'),
    sourceName: z.string(),
    sourceUrl: z.string().url(),
    sourceType: z.enum(['官方公告', '法规原文', '权威媒体', '社区', '其他']).default('官方公告'),
    disclaimerLevel: z.enum(['standard', 'high', 'critical']).default('standard'),
    // 新手版提示: 给完全不懂法规的卖家看的大白话, 详情页新手模式下突出显示
    beginnerHint: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    example: z.boolean().default(false),
  }),
});

const checklists = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    audience: z.array(z.string()).default([]),
    verifiedDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    sourceUrls: z.array(
      z.object({
        name: z.string(),
        url: z.string().url(),
      }),
    ),
    printReady: z.boolean().default(true),
    example: z.boolean().default(false),
  }),
});

export const collections = { radar, checklists };

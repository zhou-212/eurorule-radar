import { getCollection } from 'astro:content';
import { siteAsDir } from '../lib/url';
import type { APIContext } from 'astro';

/**
 * 规则雷达 客户端搜索索引
 * --------------------------------------------------------------
 * 用途:全站 client-side 搜索的轻量数据源 —— 给前端 <input> 在用户
 *       输入时遍历匹配 title / summary / tags。
 *
 * 行为:
 *   1) 顶层是 JSON 数组(不是 wrapped object),方便 client 直接 forEach
 *   2) 与 RSS / JSON Feed 行为一致:过滤掉 contentKind === '示例' 的卡片
 *   3) url 字段是绝对 URL(context.site 拼);占位 SITE 时 url 仍以占位 host
 *      开头,Search 端点不会对外公开,占位时主要用于本地开发调试。
 *   4) tags 字段统一使用 categories(与 JSON Feed 的 "tags" 含义一致),
 *      没填的卡片返回空数组(never undefined)。
 *   5) Cache-Control = public, max-age=3600(轻量、静态生成、可放胆)
 *   6) 不引新依赖;不自实现 markdown 渲染 —— 客户端只需要 title / summary
 *      / tags 三个搜索字段,body 在卡片详情页才有意义。
 * --------------------------------------------------------------
 */

export async function GET(context: APIContext) {
  const all = await getCollection('radar', ({ data }) => !data.draft);
  // 与 RSS / JSON Feed 一致:示例不进入任何生产数据源
  const radars = all.filter((r) => r.data.contentKind !== '示例');

  const site = context.site ?? new URL('https://YOUR_DOMAIN.com/');
  const home = siteAsDir(site);

  const items = radars.map((r) => {
    const slug = r.id.replace(/\.(md|mdx)$/, '');
    const url = home ? new URL(`radar/${slug}/`, home).toString() : `radar/${slug}/`;
    return {
      slug,
      title: r.data.title,
      summary: r.data.summary,
      contentKind: r.data.contentKind,
      status: r.data.status,
      riskLevel: r.data.riskLevel,
      tags: r.data.categories ?? [],
      url,
    };
  });

  return new Response(JSON.stringify(items, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

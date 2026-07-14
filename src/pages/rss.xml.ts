import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_DEFAULTS } from '../lib/radar';
import { isPlaceholderSite, siteAsDir } from '../lib/url';
import type { APIContext } from 'astro';

/**
 * 规则雷达 RSS Feed
 * --------------------------------------------------------------
 * 行为:
 *   1) 不包含 contentKind === '示例' 的卡片(示例不进入任何生产 feed)
 *   2) link 字段是绝对 URL(用 context.site 拼),RSS 规范要求。
 *   3) SITE 是占位值 (https://YOUR_DOMAIN.com 等) 时,生成的 link 仍是
 *      占位 host——所以占位时建议同时设 SITE。
 * --------------------------------------------------------------
 */
export async function GET(context: APIContext) {
  const all = await getCollection('radar', ({ data }) => !data.draft);
  // 不在 RSS 出现示例 / 演示内容
  const radars = all
    .filter((r) => r.data.contentKind !== '示例')
    .sort((a, b) => +b.data.verifiedDate - +a.data.verifiedDate)
    .slice(0, 30);

  // context.site 由 astro.config.mjs 的 site 注入;占位时可能仍然有值但 host 是占位域名
  const site = context.site ?? new URL('https://YOUR_DOMAIN.com/');
  const placeholder = isPlaceholderSite(site);

  return rss({
    title: '欧规雷达 · 规则雷达更新',
    description:
      '亚马逊欧洲站规则变化追踪 — 面向中国中小卖家的中文规则卡片。',
    site: site,
    items: radars.map((r) => {
      const slug = r.id.replace(/\.(md|mdx)$/, '');
      // link 必须是绝对 URL。
      // 用 siteAsDir 把 site 规整成以 / 结尾的目录形式,再 new URL 拼相对路径。
      // siteAsDir 在 BASE=/eurorule-radar/ 下输出 'https://owner.github.io/eurorule-radar/',
      // new URL('radar/foo/', ...) 解析为 'https://owner.github.io/eurorule-radar/radar/foo/' ✓
      const link = new URL(`radar/${slug}/`, siteAsDir(site)).toString();
      return {
        title: r.data.title,
        pubDate: r.data.verifiedDate,
        description: r.data.summary,
        link,
        categories: r.data.categories,
      };
    }),
    customData: [
      '<language>zh-CN</language>',
      '<generator>Astro</generator>',
      `<managingEditor>${SITE_DEFAULTS.contactEmail}</managingEditor>`,
      // 占位提示:如果 SITE 是占位,这个 feed 不会对真实用户公开
      placeholder ? '<!-- RSS generated with placeholder SITE; configure SITE for production feed -->' : '',
    ].filter(Boolean).join(''),
  });
}

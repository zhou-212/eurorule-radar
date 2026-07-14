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
 *   4) 每条 item 带 content:encoded 全文 HTML(订阅者直接看,不用点开网页)
 *      - 用自带的极简 markdown→HTML helper 渲染(支持 h2/h3/p/ul/ol/li/a/code/strong/em)
 *      - 避免引入 marked/markdown-it 等额外依赖
 *      - 故意不实现全 markdown 规范:扩展语法(GFM table / 任务列表 / footnote)会原样保留
 * --------------------------------------------------------------
 */

/**
 * 极简 markdown → HTML 转换(只支持标题、段落、列表、链接、行内 code/strong/em)
 * 不支持 GFM 扩展(table / task list / 删除线 / footnote 等),遇到就保留原文
 * - 输入:raw markdown 字符串
 * - 输出:HTML 字符串(已 escape,安全)
 */
function mdToHtml(md: string): string {
  const lines = md.split(/\r?\n/);
  const out: string[] = [];
  let inList: 'ul' | 'ol' | null = null;
  let inPara = false;

  const closePara = () => {
    if (inPara) {
      out.push('</p>');
      inPara = false;
    }
  };
  const closeList = () => {
    if (inList) {
      out.push(`</${inList}>`);
      inList = null;
    }
  };
  const escape = (s: string) =>
    s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

  // 行内转换:code / strong / em / link
  const inline = (s: string): string => {
    // 1. 先抽出 inline code(避免 code 里的 * _ [ 被转义)
    const codeSlots: string[] = [];
    let t = s.replace(/`([^`]+)`/g, (_m, c) => {
      codeSlots.push(c);
      return `\u0000CODE${codeSlots.length - 1}\u0000`;
    });
    t = escape(t);
    // 2. link [text](url)
    t = t.replace(
      /\[([^\]]+)\]\(([^)\s]+)\)/g,
      (_m, txt, url) =>
        `<a href="${url}">${txt}</a>`
    );
    // 3. strong **text** 或 __text__
    t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    t = t.replace(/__([^_]+)__/g, '<strong>$1</strong>');
    // 4. em *text* 或 _text_
    t = t.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    t = t.replace(/_([^_]+)_/g, '<em>$1</em>');
    // 5. 把 code slot 还原
    t = t.replace(
      /\u0000CODE(\d+)\u0000/g,
      (_m, i) => `<code>${escape(codeSlots[+i])}</code>`
    );
    return t;
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) {
      closePara();
      closeList();
      continue;
    }
    // 标题
    const h3 = line.match(/^###\s+(.+)$/);
    const h2 = line.match(/^##\s+(.+)$/);
    const h1 = line.match(/^#\s+(.+)$/);
    if (h3) {
      closePara();
      closeList();
      out.push(`<h3>${inline(h3[1])}</h3>`);
      continue;
    }
    if (h2) {
      closePara();
      closeList();
      out.push(`<h2>${inline(h2[1])}</h2>`);
      continue;
    }
    if (h1) {
      closePara();
      closeList();
      out.push(`<h1>${inline(h1[1])}</h1>`);
      continue;
    }
    // 列表
    const ul = line.match(/^[-*]\s+(.+)$/);
    const ol = line.match(/^\d+\.\s+(.+)$/);
    if (ul) {
      closePara();
      if (inList !== 'ul') {
        closeList();
        out.push('<ul>');
        inList = 'ul';
      }
      out.push(`<li>${inline(ul[1])}</li>`);
      continue;
    }
    if (ol) {
      closePara();
      if (inList !== 'ol') {
        closeList();
        out.push('<ol>');
        inList = 'ol';
      }
      out.push(`<li>${inline(ol[1])}</li>`);
      continue;
    }
    // 段落
    closeList();
    if (!inPara) {
      out.push('<p>');
      inPara = true;
    } else {
      out.push('<br>');
    }
    out.push(inline(line));
  }
  closePara();
  closeList();
  return out.join('\n');
}

export async function GET(context: APIContext) {
  const all = await getCollection('radar', ({ data }) => !data.draft);
  // 不在 RSS 出现示例 / 演示内容
  const radars = all
    .filter((r) => r.data.contentKind !== '示例')
    .sort((a, b) => +b.data.verifiedDate - +a.data.verifiedDate)
    .slice(0, 30);

  // context.site 由 astro.config.mjs 的 site 注入
  const site = context.site ?? new URL('https://YOUR_DOMAIN.com/');
  const placeholder = isPlaceholderSite(site);

  return rss({
    title: '欧规雷达 · 规则雷达更新',
    description:
      '亚马逊欧洲站规则变化追踪 — 面向中国中小卖家的中文规则卡片。',
    site: site,
    items: radars.map((r) => {
      const slug = r.id.replace(/\.(md|mdx)$/, '');
      const link = new URL(`radar/${slug}/`, siteAsDir(site)).toString();
      return {
        title: r.data.title,
        pubDate: r.data.verifiedDate,
        description: r.data.summary,
        link,
        categories: r.data.categories,
        // 全文:summary + markdown body 渲染后的 HTML
        // @astrojs/rss 会把 content 字段转成 <content:encoded><![CDATA[...]]></content:encoded>
        content: `<p><em>${r.data.summary}</em></p>\n${mdToHtml(r.body || '')}`,
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

import { getCollection } from 'astro:content';
import { SITE_DEFAULTS } from '../lib/radar';
import { isPlaceholderSite, siteAsDir } from '../lib/url';
import type { APIContext } from 'astro';

/**
 * 规则雷达 JSON Feed (1.1)
 * --------------------------------------------------------------
 * 规范:https://www.jsonfeed.org/version/1.1/
 *
 * 行为:
 *   1) 不包含 contentKind === '示例' 的卡片(示例不进入任何生产 feed,与 RSS 保持一致)
 *   2) url 字段是绝对 URL(context.site 拼);占位 SITE 时仍是占位 host
 *   3) content_text 是纯文本(从 markdown body 简单提取,不去 HTML)
 *      content_html 是同一 body 渲染后的极简 HTML(复用 RSS 相同的 mdToHtml 思路)
 *   4) date_published 用 verifiedDate(本卡最近一次核对日期 = "发布日期")
 *      date_modified  = 同一日期(没有显式 modifiedDate 字段,沿用 verifiedDate)
 *   5) 故意不依赖 marked / markdown-it:与 rss.xml.ts 风格一致,自实现轻量 md→html
 * --------------------------------------------------------------
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

  const inline = (s: string): string => {
    const codeSlots: string[] = [];
    let t = s.replace(/`([^`]+)`/g, (_m, c) => {
      codeSlots.push(c);
      return `\u0000CODE${codeSlots.length - 1}\u0000`;
    });
    t = escape(t);
    t = t.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, txt, url) => `<a href="${url}">${txt}</a>`);
    t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    t = t.replace(/__([^_]+)__/g, '<strong>$1</strong>');
    t = t.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    t = t.replace(/_([^_]+)_/g, '<em>$1</em>');
    t = t.replace(
      /\u0000CODE(\d+)\u0000/g,
      (_m, i) => `<code>${escape(codeSlots[+i])}</code>`,
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

/** 极简 markdown → 纯文本(去标题 / 链接 / 强调标记,保留正文) */
function mdToText(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, ' ') // 代码块
    .replace(/`([^`]+)`/g, '$1') // 行内 code
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1') // 图片
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // 链接
    .replace(/^#{1,6}\s+/gm, '') // 标题前缀
    .replace(/^[-*]\s+/gm, '') // 无序列表
    .replace(/^\d+\.\s+/gm, '') // 有序列表
    .replace(/\*\*([^*]+)\*\*/g, '$1') // bold
    .replace(/__([^_]+)__/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1') // em
    .replace(/_([^_]+)_/g, '$1')
    .replace(/~~([^~]+)~~/g, '$1') // strike
    .replace(/\r?\n+/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .trim();
}

export async function GET(context: APIContext) {
  const all = await getCollection('radar', ({ data }) => !data.draft);
  // 不在 JSON Feed 出现示例 / 演示内容(与 RSS 行为一致)
  const radars = all
    .filter((r) => r.data.contentKind !== '示例')
    .sort((a, b) => +b.data.verifiedDate - +a.data.verifiedDate)
    .slice(0, 30);

  const site = context.site ?? new URL('https://YOUR_DOMAIN.com/');
  const placeholder = isPlaceholderSite(site);
  const home = siteAsDir(site);
  const feedUrl = home ? new URL('feed.json', home).toString() : '';

  const body = radars.map((r) => {
    const slug = r.id.replace(/\.(md|mdx)$/, '');
    const url = home ? new URL(`radar/${slug}/`, home).toString() : `radar/${slug}/`;
    const html = mdToHtml(r.body || '');
    const text = mdToText(r.body || '');
    return {
      id: url,
      url,
      title: r.data.title,
      // 纯文本:summary + body(空段已 trim)
      content_text: `${r.data.summary}\n\n${text}`.trim(),
      // HTML:summary 作为 <em> + body 渲染
      content_html: `<p><em>${r.data.summary.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</em></p>\n${html}`,
      summary: r.data.summary,
      date_published: r.data.verifiedDate.toISOString(),
      date_modified: r.data.verifiedDate.toISOString(),
      tags: r.data.categories,
      // 扩展字段(以 _ 开头,符合 JSON Feed v1.1 扩展约定)
      _risk_level: r.data.riskLevel,
      _status: r.data.status,
      _content_kind: r.data.contentKind,
      _countries: r.data.countries,
      _source_name: r.data.sourceName,
      _source_url: r.data.sourceUrl,
    };
  });

  const payload = {
    version: 'https://jsonfeed.org/version/1.1',
    title: '欧规雷达 · 规则雷达更新',
    home_page_url: home || undefined,
    feed_url: feedUrl || undefined,
    description:
      '亚马逊欧洲站规则变化追踪 — 面向中国中小卖家的中文规则卡片。',
    language: 'zh-cn',
    authors: [{ name: SITE_DEFAULTS.author }],
    // 站点管理者联系邮箱(对应 RSS 的 managingEditor)
    _managing_editor: SITE_DEFAULTS.contactEmail,
    _generator: 'Astro',
    // 占位提示:占位 SITE 时这个 feed 不会对真实用户公开
    _comment: placeholder
      ? 'JSON Feed generated with placeholder SITE; configure SITE for production feed.'
      : undefined,
    items: body,
  };

  return new Response(JSON.stringify(payload, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/feed+json; charset=utf-8',
      // 允许边缘缓存 1 小时,Stale 24 小时(静态生成,可放胆)
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

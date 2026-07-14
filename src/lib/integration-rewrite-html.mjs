// ============================================================
// Astro Integration: rewriteHtmlInternalLinks
// ------------------------------------------------------------
// 在 astro:build:done 阶段,扫描 dist 下的所有 .html 文件,
// 把 <a href="..."> 里的"以 / 开头 但不带 //"的内部链接(站内链接)
// 自动加上 BASE 前缀(例如 /eurorule-radar/)。
//
// 为什么不在 markdown rehype 阶段做:
//   Astro 5 在 legacy content collections(我们用 type: 'content')下,
//   `markdown.rehypePlugins` 的 transformer 收到 tree=undefined,
//   实际未被正确传入 AST(经验证)。改为在 HTML 产物层做后处理,
//   行为更确定、依赖更少。
//
// 为什么不是"全局字符串替换":
//   1) 用 parse5(符合 HTML 标准的 parser)解析 HTML;
//   2) 遍历 DOM 中的 <a> 元素;
//   3) 只在 href 以 / 开头且不是 BASE 已有前缀时改写;
//   4) 跳过 http(s):// / mailto: / tel: / data: / # / 协议无关 URL;
//   5) 通过 serializer 重新生成 HTML(保留原结构、空白、属性顺序)。
// ============================================================

import { readFile, writeFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import * as parse5 from 'parse5';

const SKIP_PREFIXES = ['http://', 'https://', '//', 'mailto:', 'tel:', 'data:', 'javascript:'];

/**
 * Astro 集成工厂
 * @param {{ base: string }} opts
 */
export default function rewriteHtmlInternalLinks(opts) {
  const base = (opts.base || '/').trim() || '/';
  const baseDir = base === '/' ? '/' : base.replace(/\/$/, '') + '/';

  return {
    name: 'rewrite-html-internal-links',
    hooks: {
      'astro:build:done': async ({ dir, pages, logger }) => {
        // Astro 5 把 dir 传成 string(形如 '/D:/OU/eurorule-radar/dist/'
        // 或 'D:/...')。做归一化:去掉 file:// 前缀,去掉前导 /。
        const root = typeof dir === 'string'
          ? dir
          : (dir && dir.pathname ? dir.pathname : String(dir));
        const normalizedRoot = root
          .replace(/^file:\/\/\//, '')
          .replace(/^file:\/\//, '')
          .replace(/^\//, '');

        const htmlFiles = await walkHtml(normalizedRoot);
        let rewroteCount = 0;
        for (const f of htmlFiles) {
          const original = await readFile(f, 'utf8');
          const rewritten = rewriteHtml(original, baseDir);
          if (rewritten !== original) {
            await writeFile(f, rewritten, 'utf8');
            rewroteCount++;
          }
        }
        const msg = `[rewrite-html-internal-links] baseDir=${JSON.stringify(baseDir)} rewrote ${rewroteCount} of ${htmlFiles.length} HTML files (${pages ? pages.length : '?'} pages)`;
        if (logger) logger.info(msg); else console.log(msg);
      },
    },
  };
}

async function walkHtml(dir) {
  /** @type {string[]} */
  const out = [];
  async function walk(d) {
    let entries;
    try { entries = await readdir(d, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      const p = join(d, e.name);
      if (e.isDirectory()) await walk(p);
      else if (e.isFile() && e.name.endsWith('.html')) out.push(p);
    }
  }
  await walk(dir);
  return out;
}

function rewriteHtml(html, baseDir) {
  // parse5 fragment 解析:把 HTML 当 fragment 解析,保留原结构
  const fragment = parse5.parseFragment(html, { sourceCodeLocationInfo: false });
  let changed = false;
  walk(fragment, baseDir, () => { changed = true; });
  if (!changed) return html;
  return parse5.serialize(fragment);
}

function walk(node, baseDir, onChange) {
  if (!node || typeof node !== 'object') return;
  if (node.tagName === 'a' && node.attrs) {
    for (const attr of node.attrs) {
      if (attr.name === 'href' && typeof attr.value === 'string') {
        const newHref = rewriteHref(attr.value, baseDir);
        if (newHref !== attr.value) {
          attr.value = newHref;
          onChange();
        }
      }
    }
  }
  if (Array.isArray(node.childNodes)) {
    for (const c of node.childNodes) walk(c, baseDir, onChange);
  }
}

function rewriteHref(href, baseDir) {
  if (typeof href !== 'string' || !href) return href;
  if (SKIP_PREFIXES.some((p) => href.startsWith(p))) return href;
  if (href.startsWith('#')) return href;
  if (href.startsWith(baseDir)) return href; // 已有 BASE 前缀
  if (href.startsWith('/')) {
    return baseDir + href.replace(/^\//, '');
  }
  return href;
}

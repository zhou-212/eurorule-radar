/**
 * 站点内部链接 / 资源路径工具
 * ------------------------------------------------------------
 * 支持两种部署模式:
 *   A. 自定义域名根路径 (BASE = '/')
 *      SITE=https://your-domain.com
 *      BASE=/
 *   B. GitHub Pages 项目页 (BASE = '/eurorule-radar/')
 *      SITE=https://<owner>.github.io/eurorule-radar
 *      BASE=/eurorule-radar/
 *
 * 所有站内链接 (导航/面包屑/资源/RSS/sitemap/canonical 等)
 * 都必须用本工具生成,不要手写 "/radar" 这种根路径。
 * ------------------------------------------------------------
 */

/** 当前 build 时的 BASE 前缀(由 Astro 注入;尾部带 /) */
export function getBase(): string {
  // import.meta.env.BASE_URL 由 Astro 在编译时静态替换。
  return import.meta.env.BASE_URL || '/';
}

/**
 * 给路径加 BASE 前缀。
 *   withBase('/radar') + BASE='/'                   -> '/radar'
 *   withBase('/radar') + BASE='/eurorule-radar/'    -> '/eurorule-radar/radar'
 *   withBase('/') + BASE='/'                        -> '/'
 *   withBase('/') + BASE='/eurorule-radar/'         -> '/eurorule-radar/'
 *   withBase('favicon.svg') + BASE='/'              -> '/favicon.svg'
 *   withBase('favicon.svg') + BASE='/eurorule-radar/' -> '/eurorule-radar/favicon.svg'
 */
export function withBase(path: string): string {
  const base = getBase();
  // 保证 base 末尾是 /
  const normalizedBase = base.endsWith('/') ? base : base + '/';
  const p = path.replace(/^\//, '');
  if (!p) return normalizedBase;
  return normalizedBase + p;
}

/**
 * 检测 SITE 是否仍是占位值 (例如 https://YOUR_DOMAIN.com 或 https://your_domain.com)。
 * 用于 robots.txt / RSS 等场景:占位时不允许输出虚构的 sitemap URL。
 */
export function isPlaceholderSite(site: string | URL | undefined | null): boolean {
  if (!site) return true;
  const s = (typeof site === 'string' ? site : site.toString()).toLowerCase();
  if (!s) return true;
  return /your[-_]?domain/.test(s) || /your[-_]?github[-_]?user/.test(s);
}

/**
 * 把 site 规整成"以 / 结尾"的目录形式,用于字符串拼接拼绝对 URL。
 *
 * 为什么需要:
 *   - Astro.site.toString() 在 GitHub Pages 项目页模式下形如
 *     'https://owner.github.io/eurorule-radar' (无尾斜杠,因为有 path)
 *   - 直接 `${siteStr}radar/foo/` 会拼成
 *     'https://owner.github.io/eurorule-radarradar/foo/' (路径段被吞)
 *   - 加尾斜杠后,`${siteStr}radar/foo/` → 'https://owner.github.io/eurorule-radar/radar/foo/' ✓
 *
 * 配合 Rss / jsonLd / canonical 等"先有 site 再拼 path"场景使用;
 * 不要用它 + withBase() —— withBase 已经包含 BASE 前缀,会重复。
 */
export function siteAsDir(site: string | URL | undefined | null): string {
  if (!site) return '';
  const s = typeof site === 'string' ? site : site.toString();
  if (!s) return '';
  return s.endsWith('/') ? s : s + '/';
}

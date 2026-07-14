import type { APIRoute } from 'astro';
import { isPlaceholderSite } from '../lib/url';

/**
 * 动态生成 /robots.txt
 * --------------------------------------------------------------
 * 行为:
 *   1) SITE 已配置且不是占位值 (不是 https://YOUR_DOMAIN.com /
 *      https://your_domain.com):输出对应 SITE 的 Sitemap 绝对地址
 *      (Sitemap 协议要求绝对 URL)。
 *   2) SITE 未配置 / 仍是占位值:不输出 Sitemap 行,只输出 User-agent
 *      与 Allow,避免污染搜索引擎 (提交一个假的 sitemap 会让站长
 *      工具报 404,看起来像站点坏了)。
 *   3) BASE 不影响 robots.txt 本身——它是个独立端点,Sitemap 指向
 *      站点根目录下的 /sitemap-index.xml,Astro 的 sitemap 集成会
 *      自动处理 BASE 下的物理路径。
 * --------------------------------------------------------------
 */
export const GET: APIRoute = ({ site }) => {
  const lines: string[] = [
    'User-agent: *',
    'Allow: /',
    '',
  ];

  if (!isPlaceholderSite(site)) {
    const origin = site!.toString().replace(/\/$/, '');
    lines.push(`Sitemap: ${origin}/sitemap-index.xml`);
  } else {
    lines.push('# Sitemap line omitted: SITE is not configured or still a placeholder.');
    lines.push('# Set SITE (env var or GitHub Variables) to enable a real sitemap URL.');
  }

  return new Response(lines.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};

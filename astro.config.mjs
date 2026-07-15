// @ts-nocheck
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rewriteHtmlInternalLinks from './src/lib/integration-rewrite-html.mjs';

// =============================================================================
// 部署模式 (部署前必读)
// =============================================================================
// 支持两种部署模式,选一种,设对应的 SITE 与 BASE:
//
//   A. 自定义域名根路径 (推荐生产)
//      SITE=https://your-domain.com
//      BASE=/
//      例:https://eurorule.example.com/radar  ← 站点在根目录
//
//   B. GitHub Pages 项目页
//      SITE=https://<owner>.github.io/eurorule-radar
//      BASE=/eurorule-radar/
//      例:https://<owner>.github.io/eurorule-radar/radar  ← 站点在子路径
//
// 优先顺序:环境变量 > astro.config.mjs 默认值
//  - 本地:在 .env 里设 SITE / BASE
//  - GitHub Actions:工作流根据是否设了 GitHub Variables 自动决定
//
// ⚠️ 重要: SITE 是上线前必配项
//   - 没设 SITE 时,robots.txt / RSS / sitemap 不会输出虚构地址 (输出空 Sitemap 行)
//   - 没设 SITE 时,canonical / OG / RSS link 会用占位 host,搜索引擎会忽略
// =============================================================================

const DEFAULT_SITE = 'https://YOUR_DOMAIN.com';

/** 把 BASE 归一化:确保以 / 开头、且非根时尾部带 / */
function normalizeBase(input) {
  const v = (input ?? '').trim();
  if (!v || v === '/') return '/';
  const withLeading = v.startsWith('/') ? v : '/' + v;
  return withLeading.endsWith('/') ? withLeading : withLeading + '/';
}

const SITE = (process.env.SITE || '').trim() || DEFAULT_SITE;
const BASE = normalizeBase(process.env.BASE);

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'ignore',
  // 启用 legacy content collections:让 markdown 文件被自动发现,
  // 且 type: 'content' 集合使用 Astro 的 markdown 管线
  legacy: {
    collections: true,
  },
  build: {
    format: 'directory',
  },
  integrations: [
    mdx(),
    sitemap({
      // 404 页不进 sitemap
      filter: (page) => !page.includes('/404'),
      changefreq: 'weekly',
      priority: 0.7,
    }),
    rewriteHtmlInternalLinks({ base: BASE }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
  // =============================================================================
  // 301 重定向:欧规雷达 2026-07 迁移到 /eu/ 目录
  //   - 配置只处理顶层 URL(裸路径)
  //   - 子路径通配由 src/pages/{old}/[...slug].astro 文件处理
  //   - 静态构建产物包含 meta refresh + 301 头(搜索引擎可识别)
  //   - 6 个月后(2027-01)再考虑清理 redirect 配置
  // =============================================================================
  redirects: {
    '/radar':       '/eu/radar',
    '/guide':       '/eu/guide',
    '/learn':       '/eu/learn',
    '/compare':     '/eu/compare',
    '/checklists':  '/eu/checklists',
    '/downloads':   '/eu/downloads',
    '/promote':     '/eu/promote',
    '/glossary':    '/eu/glossary',
    '/calendar':    '/eu/calendar',
    '/self-check':  '/eu/self-check',
  },
});

/**
 * sections.ts — weiread.com 分区注册表
 * ------------------------------------------------------
 * 站级抽象,所有 6 个分区统一注册;每个分区在 SECTIONS 数组里有一行配置。
 * SiteNav / SectionLayout / 站首页都从这里读数据。
 *
 * 状态:
 *   - live:    已上线,有内容
 *   - wip:     正在建,有部分占位
 *   - planned: 计划中,只有占位页
 */
export interface SectionConfig {
  slug: string;        // 'eu', 'tools', 'rules', 'read', 'learn', 'help'
  title: string;       // '欧规雷达'
  shortTitle: string;  // '欧规' — 顶部 tab 显示
  href: string;        // '/eu/'
  tagline: string;     // '欧盟法规变化,转成你今天能执行的清单'
  status: 'live' | 'wip' | 'planned';
  priority: 0 | 1 | 2 | 3;  // 0 = 旗舰
  icon: string;        // emoji
  navOrder: number;    // 0-5
  accent: string;      // 分区强调色(CSS variable or hex)
}

export const SECTIONS: SectionConfig[] = [
  {
    slug: 'eu',
    title: '欧规雷达',
    shortTitle: '欧规',
    href: '/eu/',
    tagline: '欧盟法规变化,转成你今天能执行的清单',
    status: 'live',
    priority: 0,
    icon: '🇪🇺',
    navOrder: 0,
    accent: '#1e40af',
  },
  {
    slug: 'rules',
    title: '法规通',
    shortTitle: '法规',
    href: '/rules/',
    tagline: '美/英/日/澳法规雷达,跨境合规全覆盖',
    status: 'planned',
    priority: 1,
    icon: '🌐',
    navOrder: 1,
    accent: '#047857',
  },
  {
    slug: 'tools',
    title: '工具集',
    shortTitle: '工具',
    href: '/tools/',
    tagline: '常用在线小工具,免下载即开即用',
    status: 'planned',
    priority: 1,
    icon: '🛠️',
    navOrder: 2,
    accent: '#475569',
  },
  {
    slug: 'read',
    title: '读',
    shortTitle: '读',
    href: '/read/',
    tagline: '长文同步知乎,跨境 + 效率 + 工具评测',
    status: 'planned',
    priority: 2,
    icon: '📖',
    navOrder: 3,
    accent: '#a16207',
  },
  {
    slug: 'learn',
    title: '学',
    shortTitle: '学',
    href: '/learn/',
    tagline: '跨主题学习路径,从 0 到 60 分钟',
    status: 'planned',
    priority: 2,
    icon: '🎓',
    navOrder: 4,
    accent: '#7c3aed',
  },
  {
    slug: 'help',
    title: '帮',
    shortTitle: '帮',
    href: '/help/',
    tagline: '跨境卖家 Q&A,垂直问答社区',
    status: 'planned',
    priority: 3,
    icon: '💬',
    navOrder: 5,
    accent: '#ea580c',
  },
];

export function getSection(slug: string): SectionConfig | undefined {
  return SECTIONS.find((s) => s.slug === slug);
}

export function getActiveSection(pathname: string): SectionConfig | undefined {
  // 移除 BASE 前缀(如有),取第一个 segment
  const cleaned = pathname.replace(/^\//, '').split('/')[0];
  if (!cleaned) return undefined; // 站首页
  return getSection(cleaned);
}

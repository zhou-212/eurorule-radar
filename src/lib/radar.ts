import type { CollectionEntry } from 'astro:content';

/**
 * 提取标签去重
 */
export function uniqueTags(items: { data: { countries?: string[]; categories?: string[]; sellerTypes?: string[] } }[]): string[] {
  const set = new Set<string>();
  for (const item of items) {
    for (const field of ['countries', 'categories', 'sellerTypes'] as const) {
      const arr = item.data[field];
      if (Array.isArray(arr)) {
        for (const v of arr) set.add(v);
      }
    }
  }
  return Array.from(set).sort();
}

export function getRiskClass(level: '高' | '中' | '低'): string {
  if (level === '高') return 'risk-high';
  if (level === '中') return 'risk-medium';
  return 'risk-low';
}

export function getStatusClass(status: string): string {
  if (status === '生效中') return 'status-active';
  if (status === '即将生效') return 'status-upcoming';
  if (status === '持续关注') return 'status-watching';
  return 'status-pending';
}

export function getContentKindClass(kind: '基础规则' | '近期更新' | '示例' | '待核实'): string {
  if (kind === '基础规则') return 'kind-basic';
  if (kind === '近期更新') return 'kind-update';
  if (kind === '示例') return 'kind-example';
  return 'kind-pending';
}

export type RadarEntry = CollectionEntry<'radar'>;
export type ChecklistEntry = CollectionEntry<'checklists'>;

export const SITE_DEFAULTS = {
  name: '欧规雷达',
  enName: 'EuroRule Radar',
  slogan: '欧洲站规则变化,转成你今天能执行的清单。',
  description:
    '面向中国亚马逊欧洲站中小卖家的规则变化追踪、影响判断和执行清单。提供规则卡片、检查清单、截止日历和影响自测。',
  author: '欧规雷达编辑团队',
  contactEmail: 'YOUR_CONTACT_EMAIL@example.com', // 待用户替换
  githubRepo: 'https://github.com/YOUR_GITHUB_USER/eurorule-radar', // 待用户替换
};

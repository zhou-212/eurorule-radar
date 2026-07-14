/**
 * Rule-list data source for the static GitHub Pages site.
 *
 * Keep this first release on Astro's local content collection.  Rule details
 * are generated as static pages; switching only the list to the Worker API
 * would create links for API-only slugs with no corresponding detail page.
 * The Worker is therefore used only by the opt-in subscription form until a
 * complete dynamic rule-detail flow (or a build-time content sync) exists.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import type { ContentKind } from './radar-api';

export type { ContentKind } from './radar-api';

const KEY_TO_LABEL: Record<ContentKind, string> = {
  basic: '基础规则',
  update: '近期更新',
  example: '示例',
  pending: '待核实',
};

const LABEL_TO_KEY: Record<string, ContentKind> = {
  基础规则: 'basic',
  近期更新: 'update',
  示例: 'example',
  待核实: 'pending',
};

export function keyToLabel(key: ContentKind | string): string {
  return KEY_TO_LABEL[key as ContentKind] ?? '基础规则';
}

export function labelToKey(label: string): ContentKind {
  return LABEL_TO_KEY[label] ?? 'basic';
}

export function getContentKindKey(entry: CollectionEntry<'radar'>): ContentKind {
  return labelToKey(entry.data.contentKind);
}

export async function getRadarRules(): Promise<CollectionEntry<'radar'>[]> {
  const entries = await getCollection('radar', ({ data }) => !data.draft);
  return entries.sort((a, b) => +b.data.verifiedDate - +a.data.verifiedDate);
}

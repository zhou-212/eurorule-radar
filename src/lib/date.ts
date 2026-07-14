/**
 * 日期格式化工具(中文化)
 */
export function formatDate(
  date: Date | string | undefined,
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' },
): string {
  if (!date) return '—';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('zh-CN', options);
}

export function formatShortDate(date: Date | string | undefined): string {
  return formatDate(date, { year: 'numeric', month: '2-digit', day: '2-digit' });
}

export function isoDate(date: Date | string | undefined): string {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString().slice(0, 10);
}

export function daysFromNow(date: Date | string): number {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const ms = d.getTime() - now.getTime();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

export function relativeDay(date: Date | string): string {
  const days = daysFromNow(date);
  if (days < -1) return `${-days} 天前`;
  if (days === -1) return '昨天';
  if (days === 0) return '今天';
  if (days === 1) return '明天';
  if (days < 7) return `${days} 天后`;
  if (days < 30) return `约 ${Math.ceil(days / 7)} 周后`;
  if (days < 365) return `约 ${Math.ceil(days / 30)} 个月后`;
  return `约 ${Math.ceil(days / 365)} 年后`;
}

export function bucketByUrgency(
  days: number,
): 'past' | 'urgent' | 'this-month' | 'later' {
  if (days < 0) return 'past';
  if (days <= 14) return 'urgent';
  if (days <= 30) return 'this-month';
  return 'later';
}

export const urgencyLabels: Record<ReturnType<typeof bucketByUrgency>, string> = {
  past: '已过期',
  urgent: '已临近(14 天内)',
  'this-month': '本月内',
  later: '后续关注',
};

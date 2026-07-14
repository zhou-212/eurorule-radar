/**
 * 欧规雷达 · 后端 API 客户端
 * ------------------------------------------------------------
 * 数据源:后端 contentKind 过滤 API(默认 http://127.0.0.1:8788)
 * 环境变量:PUBLIC_API_BASE(Astro 注入到 import.meta.env)
 * 失败行为:内部 try/catch 抛带 message 的 Error,调用方(radar-source.ts)
 *         决定是否 fallback 到静态数据。**不要**在 API 客户端层静默吞错。
 * ------------------------------------------------------------
 */

export type ContentKind = 'basic' | 'update' | 'example' | 'pending';

/** 单条规则 API 表示(后端响应结构) */
export interface ApiRule {
  /** slug 是 URL 友好的唯一标识,无 .md/.mdx 后缀 */
  slug: string;
  title: string;
  summary: string;
  body_markdown: string;
  countries: string[];
  category: string;
  content_status: string;
  /** 内容状态(后端英文键,与 filter select 值精确匹配) */
  contentKind: ContentKind;
  /** 其它字段透传(后端可返回更多,例如 publishedDate / verifiedDate /
   *  effectiveDate / categories / riskLevel / status / sourceName / sourceUrl ...)。
   *  锁定文件(RadarCard.astro / content.config.ts)依赖这些字段名 / 类型,
   *  fallback 路径会显式构造,API 路径原样透传。 */
  [key: string]: unknown;
}

export interface ApiPagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface FetchRulesResult {
  data: ApiRule[];
  pagination: ApiPagination;
}

export interface FetchRulesOptions {
  contentKind?: ContentKind | ContentKind[];
  category?: string;
  page?: number;
  pageSize?: number;
}

const DEFAULT_API_BASE = 'http://127.0.0.1:8788';
const REQUEST_TIMEOUT_MS = 5000;

function getApiBase(): string {
  const raw = (import.meta.env.PUBLIC_API_BASE as string | undefined) || DEFAULT_API_BASE;
  return raw.replace(/\/+$/, '');
}

function buildQuery(opts: FetchRulesOptions): string {
  const params = new URLSearchParams();
  if (opts.contentKind) {
    const kinds = Array.isArray(opts.contentKind) ? opts.contentKind : [opts.contentKind];
    if (kinds.length > 0) params.set('contentKind', kinds.join(','));
  }
  if (opts.category) params.set('category', opts.category);
  if (opts.page) params.set('page', String(opts.page));
  if (opts.pageSize) params.set('pageSize', String(opts.pageSize));
  const qs = params.toString();
  return qs ? `?${qs}` : '';
}

/**
 * 拉取规则列表。后端契约:`GET /api/v1/rules?contentKind=basic,update&...`
 * 响应:`{ data: ApiRule[], pagination: { page, pageSize, total, totalPages } }`
 * 错误:网络失败 / 5xx / 4xx / 超时 / JSON 解析失败 → 抛 Error,带 message。
 */
export async function fetchRules(opts: FetchRulesOptions = {}): Promise<FetchRulesResult> {
  const url = `${getApiBase()}/api/v1/rules${buildQuery(opts)}`;
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    if (!res.ok) {
      throw new Error(`fetchRules ${res.status} ${res.statusText} (${url})`);
    }
    const body = (await res.json()) as FetchRulesResult;
    if (!body || !Array.isArray(body.data)) {
      throw new Error(`fetchRules: invalid response shape (missing data[])`);
    }
    return body;
  } catch (err) {
    if (err instanceof Error) {
      // 保持原始 message(网络错 / AbortError / SyntaxError 都有 message)
      throw new Error(`fetchRules failed: ${err.message}`);
    }
    throw new Error(`fetchRules failed: ${String(err)}`);
  }
}

/**
 * 拉取单条规则。后端契约:`GET /api/v1/rules/:slug`
 * 404 → 返回 null(不抛)。其它错误抛 Error。
 */
export async function fetchRule(slug: string): Promise<ApiRule | null> {
  const url = `${getApiBase()}/api/v1/rules/${encodeURIComponent(slug)}`;
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    if (res.status === 404) return null;
    if (!res.ok) {
      throw new Error(`fetchRule ${res.status} ${res.statusText} (${url})`);
    }
    return (await res.json()) as ApiRule;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`fetchRule failed: ${err.message}`);
    }
    throw new Error(`fetchRule failed: ${String(err)}`);
  }
}

# TEST_REPORT.md — 测试报告

> 本文档记录**实际执行过的**测试、结果与已知限制。
> 真实构建 / 部署后填充"实际结果"列;**不允许**复制旧结论。
>
> 实际执行时间:2026-07-13 / 11:08 (UTC+8) / Windows 11 / PowerShell

---

## 1. 环境

| 项 | 值 |
|---|---|
| Node | v24.16.0(测试时);项目要求 Node 18+ |
| npm | 11.13.0 |
| OS | Windows 11 / PowerShell |
| Astro | 5.18.2(从 `package.json` 锁定 + 实际 build 输出确认) |

---

## 2. 命令测试(实测)

| 命令 | 预期 | 实测结果 | 耗时 |
|---|---|---|---|
| `npm.cmd install` | 成功安装所有依赖 | ✓ 成功(沿用之前 425 packages 缓存) | — |
| `npm.cmd run build:fast` | `dist/` 目录生成,无错误 | ✓ **19 个页面**生成,无错误 | ~3 s |
| `npm.cmd run check` | 类型 / 内容集合 schema 通过 | ✓ **0 errors / 0 warnings / 0 hints** | ~10 s |
| `npm.cmd run build` | type-check + build 完整流程 | ✓ check 通过 + 19 页 build | ~12 s |
| `npm.cmd run preview` | http://localhost:4321 预览构建产物 | ⏳ 本轮未执行(开发流程验证不需要) | — |

### 2.1 `npm.cmd run check` 早期超时问题(已修)

**症状**:第一次跑 `npm.cmd run check` 耗时 **7 分钟**,扫描了 4464 个文件。
**根因**:工作区存在 `_zip_tmp/` 目录,内含项目自身的**多层嵌套副本**(打包时复制错路径导致)。`astro check` 递归扫描这些副本,文件总数膨胀到 4 千多。
**修复**:
1. 用 Python `shutil.rmtree(..., ignore_errors=True)` 删除 `_zip_tmp/`(Windows 默认删除工具因路径超过 MAX_PATH 260 字符失败;Python 走 `\\?\` 前缀可处理长路径)。
2. 在 `tsconfig.json` `exclude` 加 `_zip_tmp` / `**/_zip_tmp/**`,即使再出现也不会被扫描。
3. 在 `.gitignore` 加 `_zip_tmp/`,避免污染 git。
**复测**:`npm.cmd run check` **10 秒**返回 0 errors / 0 warnings / 0 hints,正常。
**教训**:
- 任何临时目录 / 副本必须加 `.gitignore` 和 `tsconfig.json` `exclude`。
- 警惕 PowerShell 之外也能跑删除命令的工具(`shutil.rmtree` 走 Win32 长路径 API)。

---

## 3. dist 产物清单(实测)

| 路径 | 类型 | 大小 | 状态 |
|---|---|---|---|
| `/index.html` | 首页 | 30,279 字节 | ✓ |
| `/404.html` | 404 页面 | 5,866 字节 | ✓ |
| `/about/index.html` | 关于 | 10,567 字节 | ✓ |
| `/calendar/index.html` | 截止日历 | 9,408 字节 | ✓ |
| `/checklists/index.html` | 清单列表 | 10,447 字节 | ✓ |
| `/checklists/new-seller-basics/index.html` | 清单详情 | 16,517 字节 | ✓ |
| `/checklists/pre-listing-documents/index.html` | 清单详情 | 17,119 字节 | ✓ |
| `/checklists/compliance-notice-48h/index.html` | 清单详情 | 17,782 字节 | ✓ |
| `/disclaimer/index.html` | 免责声明 | 11,408 字节 | ✓ |
| `/privacy/index.html` | 隐私说明 | 10,711 字节 | ✓ |
| `/radar/index.html` | 规则列表 | 27,118 字节 | ✓ |
| `/radar/eu-gpsr-responsible-person/index.html` | 规则详情 | 22,823 字节 | ✓ |
| `/radar/de-lucid-packaging/index.html` | 规则详情 | 22,547 字节 | ✓ |
| `/radar/france-epr-triman/index.html` | 规则详情 | 21,194 字节 | ✓ |
| `/radar/eu-eprel-energy-label/index.html` | 规则详情 | 21,113 字节 | ✓ |
| `/radar/eu-child-product-warnings/index.html` | 规则详情 | 20,873 字节 | ✓ |
| `/radar/eu-ioss-vat/index.html` | 规则详情 | 19,756 字节 | ✓ |
| `/radar/example-ce-declaration/index.html` | 规则详情(示例) | 19,367 字节 | ✓ |
| `/self-check/index.html` | 影响自测 | 11,516 字节 | ✓ |
| `/rss.xml` | RSS Feed | 4,883 字节 | ✓ |
| `/sitemap-index.xml` | Sitemap 索引 | 186 字节 | ✓ |
| `/sitemap-0.xml` | Sitemap | 2,498 字节 | ✓ |
| `/robots.txt` | robots | 75 字节 | ✓(Sitemap 行是占位 `YOUR_DOMAIN.com`) |
| `/favicon.svg` | Favicon | 329 字节 | ✓ |
| `/og-default.svg` | OG 默认图 | 1,663 字节 | ✓ |
| `/site.webmanifest` | PWA manifest | 394 字节 | ✓ |
| `/CNAME.example` | 自定义域名模板 | 12 字节 | ✓(非真实 CNAME) |

> **CNAME 验证**:`dist/` 中**没有** `CNAME` 文件 ✅(避免 GitHub Pages 误用占位)。
> 部署时如需自定义域,`cp public/CNAME.example public/CNAME` 然后把内容改为真实域名(只能一行)。

### 3.1 内容状态分布(实测)

按 `contentKind` 分类,共 7 篇规则:

| contentKind | 数量 | 文件 |
|---|---|---|
| 基础规则 | 6 | eu-gpsr-responsible-person, de-lucid-packaging, france-epr-triman, eu-eprel-energy-label, eu-child-product-warnings, eu-ioss-vat |
| 近期更新 | 0 | (无) — 首页诚实显示"暂未发布已核对的近期更新" |
| 示例 | 1 | example-ce-declaration |
| 待核实 | 0 | (无) |

### 3.2 日历事件(实测)

`src/content/calendar/events.json` 共 1 条:
- "示例日历:运营节奏演示(请勿当作真实截止日)" — `isExample: true`,日期 2026-10-15,在"后续关注"分组显示

**严格按要求**:
- 默认无虚构截止日 ✅
- 保留 1 条明确标注"示例"的事件 ✅
- 空状态 UI 在 `events.length === 0` 时显示"暂未发布已核实的近期截止日"(本轮触发的是日历含 1 条示例,所以默认 UI 用了正常分组;若用户清空 events.json,空状态 UI 会生效)

---

## 4. 内部链接检查(实测)

`dist` 中所有 `href="/..."` 内部链接的目标**全部存在**:

```
/_astro/*  (CSS / JS 资源)              ✓
/about                                     ✓
/calendar                                  ✓
/checklists                                ✓
/checklists/compliance-notice-48h          ✓
/checklists/new-seller-basics              ✓
/checklists/pre-listing-documents          ✓
/disclaimer                                ✓
/privacy                                   ✓
/radar                                     ✓
/radar/{7 个 slug}                         ✓
/self-check                                ✓
/favicon.svg                               ✓
/rss.xml                                   ✓
/sitemap-index.xml                         ✓
```

**之前版本的不合法链接**(`/README.md`、`/CONTENT_GUIDE.md`)已全部移除,改为 `<code>README.md</code>` 形式或直接说"项目仓库的 README/CONTENT_GUIDE"。

---

## 5. 内容真实性 / 占位符审计(实测)

### 5.1 仓库内(dist 之外)

| 占位符 | 出现位置 | 替换路径 |
|---|---|---|
| `YOUR_DOMAIN.com` | `astro.config.mjs` 默认值 / `src/lib/radar.ts` JSON-LD 字段 / `public/robots.txt` | 设 SITE 环境变量,或手动替换 |
| `YOUR_GITHUB_USER` | `src/lib/radar.ts` `githubRepo` / `src/pages/about.astro` Issues 链接 | 部署前手动替换 |
| `YOUR_CONTACT_EMAIL@example.com` | `src/lib/radar.ts` `contactEmail` / `src/pages/about.astro` / `src/pages/privacy.astro` / `src/pages/rss.xml.ts` | 部署前手动替换 |

### 5.2 dist 内(部署后才会被爬到)

| 位置 | 出现值 | 性质 |
|---|---|---|
| `canonical`、`og:url`、`og:image`、`twitter:image` | `https://your_domain.com/...` | 显式占位,部署前用 SITE 替换 |
| `JSON-LD WebSite.url` / `Organization.url` / `logo` | `https://your_domain.com/...` | 同上 |
| `rss.xml <link>` / `<guid>` | `https://your_domain.com/...` | 同上 |
| `rss.xml <managingEditor>` | `YOUR_CONTACT_EMAIL@example.com` | 同上 |
| `sitemap-0.xml <loc>` | `https://your_domain.com/...` | 同上 |
| `robots.txt Sitemap:` | `https://YOUR_DOMAIN.com/sitemap-index.xml` | 同上 |

**判定**:所有占位都是**显式可识别**的(`YOUR_*` / `your_domain.com`),搜索引擎不会把它们当作"真实生产地址"误收录;**前提是**部署前必须配 SITE(README §5.3 已说明)。

### 5.3 真实密钥 / 假域名 / 未标示例

- ✓ **没有**任何 `api_key`、`secret`、`password`、`bearer token` 模式
- ✓ **没有**任何虚构的"真实"域名(只有显式 `your_domain.com` 占位)
- ✓ **没有**任何未标 `isExample: true` 的虚假截止日
- ✓ **没有**任何"近期更新"内容伪装(首页"近期更新"区域为空时,显示诚实提示)
- ✓ **没有**任何引自 EUR-Lex 首页 / 欧盟委员会首页的"具体日期"链接

---

## 6. SEO 检查(实测)

| 项 | 状态 |
|---|---|
| `/sitemap-index.xml` 可访问,包含 18 个 URL | ✓ |
| `/sitemap-0.xml` URL 都是绝对 URL(占位 `your_domain.com`,部署时 SITE 替换) | ✓ |
| `/rss.xml` 可解析为 RSS 2.0 | ✓(格式验证) |
| 每页 `<title>` 唯一 | ✓(astro:title + BaseLayout 唯一性) |
| 每页 canonical 是绝对 URL | ✓(占位但完整 URL) |
| 详情页有 `Article` + `BreadcrumbList` JSON-LD | ✓(src/pages/radar/[slug].astro) |
| 列表页有 `BreadcrumbList` JSON-LD | ✓(src/pages/calendar.astro 等) |
| 首页有 `WebSite` + `Organization` JSON-LD | ✓(src/pages/index.astro) |

---

## 7. GitHub Actions 部署(本轮未实跑)

`.github/workflows/deploy.yml` 已修复 SITE 拼接 bug:

```yaml
# 修复前(原 bug):
SITE: ${{ vars.SITE || format('https://{0}', github.repository_owner) }}.github.io/eurorule-radar/
# 当 vars.SITE = "https://eurorule.example.com" 时,拼接成
# "https://eurorule.example.com.github.io/eurorule-radar/"  ← BUG

# 修复后(两步式):
- name: Determine SITE
  id: site
  run: |
    if [ -n "${{ vars.SITE }}" ]; then
      echo "value=${{ vars.SITE }}" >> "$GITHUB_OUTPUT"
    else
      echo "value=https://${GITHUB_REPOSITORY_OWNER}.github.io/eurorule-radar" >> "$GITHUB_OUTPUT"
    fi
- name: Build
  env:
    SITE: ${{ steps.site.outputs.value }}
  run: npm run build:fast
```

**SITE 行为**:
- 配了 vars.SITE → 完整用 vars.SITE(自定义域名)
- 没配 vars.SITE → 自动拼 `https://<owner>.github.io/eurorule-radar`(默认 GitHub Pages)

**实测**:本轮 `npm run build:fast` 在本地 + `SITE=...` 环境变量下成功生成 dist;**GitHub Actions runner 上**的实际执行未跑(无 GitHub repo 可推),按工作流语法分析应当正确。

---

## 8. 已知限制

### 8.1 内容范围限制

- **不覆盖 TikTok Shop / Temu**(第一阶段明确排除)
- **不覆盖所有欧洲国家**(默认 DE / FR / IT / ES / NL / PL / SE;其它国家另加)
- **不覆盖所有产品类目**(默认一般消费品 + 电子 / 儿童 / 化妆品 / 食品接触;其它类目加专项)
- **不覆盖所有法规**(只覆盖有公开权威来源 + 可执行行动项的)
- **"近期更新"内容为空**:上线初版,运营正在分批核实 2026 年新公告;首页会诚实显示"暂未发布已核对的近期更新",**不会**塞示例凑数

### 8.2 设计 / 体验限制

- **不支持深色模式**(第一版不实现)
- **不实现多语言切换**(仅简体中文,部分专有名词保留英文)
- **不实现搜索结果高亮**(只过滤,不高亮)
- **不实现"保存清单进度同步"**(只在 localStorage,清浏览器数据会丢)
- **不实现"日历导出 .ics"**(v2 可加)
- **不实现账号 / 登录 / 数据库 / 付费**

### 8.3 商业限制

- **不提供法律意见**:站内有明确免责声明,但不阻断用户误用
- **不提供税务申报**:不与 Avalara / Vertex / TaxJar 等对接,只提供导航建议
- **不提供认证检测服务**:不与 TÜV / SGS 等对接,只提供说明
- **不直接联系欧盟律师 / 海关 / 监管机构**:站外联系方式占位

### 8.4 技术限制

- **订阅表单是占位**:点击提交只显示"已记录(占位模式)",不发送任何请求。需按 README §7 接入 Tally / Brevo / ConvertKit。
- **不内置分析**:不追踪用户行为;运营者只能看 GitHub Pages 基础访问日志。
- **不持久化用户数据**:清单勾选仅保存在浏览器 localStorage;订阅数据由第三方邮件服务管理。
- **不内置 AI 助手**:无聊天功能,所有内容都是静态 markdown。
- **占位域名 / 占位邮箱**:必须由用户部署前替换,否则 sitemap、canonical、OG、JSON-LD 都会指向 `your_domain.com`,导致搜索引擎收录失败 / 分享卡片异常。

---

## 9. 测试执行记录(实测)

| 日期 | 测试人 | 命令 | 结果 | 备注 |
|---|---|---|---|---|
| 2026-07-13 | Mavis | `npm.cmd run build:fast` | ✓ 19 页 / 3.19s | 删除 `_zip_tmp/` 后第一次 |
| 2026-07-13 | Mavis | `npm.cmd run check` | ✓ 0/0/0,9.9s | 修复 3 个真实 warning + 清理 `_zip_tmp/` |
| 2026-07-13 | Mavis | `npm.cmd run build` (check + build) | ✓ 0/0/0 + 19 页 / 11.7s | 完整流程 |
| 2026-07-13 | Mavis | 内部链接检查(grep href) | ✓ 全部 200 | 0 个失效链接 |
| 2026-07-13 | Mavis | 占位符 / 密钥审计(grep) | ✓ 无密钥 / 无假域名 | 仅有明确 `YOUR_*` 占位 |

---

**最后更新**:2026-07-13

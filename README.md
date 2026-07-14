# 欧规雷达 · EuroRule Radar

> 欧洲站规则变化,转成你今天能执行的清单。

面向中国亚马逊欧洲站中小卖家的"**规则变化 → 影响判断 → 行动清单 → 截止日期提醒**"网站。
第一阶段聚焦欧洲站,信息整理和辅助判断;非法律意见,所有规则与日期以原始来源为准。

---

## 1. 这是什么 / 不是什么

| 这是 ✅ | 这不是 ❌ |
|---|---|
| 中文规则追踪与影响判断 | 法律 / 税务 / 认证意见 |
| 可勾选 / 可打印的行动清单 | 通用 AI 聊天机器人 |
| 截止日期 + 自测 + 订阅 | 泛资讯门户 / 论坛 / 复杂 SaaS |
| 第一阶段 GitHub Pages 静态部署 | 一开始就要服务器 / 后端 / 数据库 |

**核心边界:**

- 是信息整理和辅助判断工具;
- **不提供**法律、税务、认证或专业合规结论;
- **不承诺**用户一定合规;
- **不伪造**法规、平台规则、发布日期、生效时间、罚款、处罚或来源;
- 涉及规则变化的结论必须有官方原始来源 + 核对日期;
- 无法确认的信息必须明确标记"待核实 / 示例",不得写成事实;
- **不能**把示例日历或演示内容伪装成真实时事。

---

## 2. 技术栈

- **Astro 5**(最新稳定版) + TypeScript
- **静态站点生成 (SSG)**,无后端,无数据库
- **Markdown / MDX** 内容集合,纯文件管理
- **GitHub Pages** 部署
- **不依赖任何付费服务**
- 中文字体使用系统字体,加载轻量
- 颜色:深靛蓝主色 + 青绿辅色,无花哨动画

---

## 3. 快速开始

> **Windows PowerShell 用户:** 由于 PowerShell 默认执行策略可能阻止 `npm.ps1`,
> 请使用 **`npm.cmd`** 而不是 `npm`。`npm.cmd` 在所有 Windows PowerShell / CMD 环境都可用。
> macOS / Linux 用户用 `npm` 即可。

```powershell
# 1. 安装依赖
npm.cmd install

# 2. 本地开发(默认 http://localhost:4321)
npm.cmd run dev

# 3. 快速构建(跳过类型检查,适合本地反复构建)
npm.cmd run build:fast

# 4. 完整构建(类型检查 + 静态生成,产物在 dist/)
npm.cmd run build

# 5. 预览构建产物
npm.cmd run preview

# 6. 类型检查(可能较慢,可单独跑;若超时见 §11)
npm.cmd run check
```

> Node 18+ 推荐;项目用 Node 20 测试通过。

---

## 4. 目录结构

```
eurorule-radar/
├── public/                       # 静态资源(拷贝到 dist/)
│   ├── CNAME.example             # 自定义域名模板(部署前复制为 CNAME,内容必须只有一行真实域名)
│   ├── favicon.svg
│   ├── og-default.svg            # 社交分享默认图
│   ├── runtime-config.example.js # 订阅后端配置模板(部署时复制为 runtime-config.js)
│   └── site.webmanifest
├── src/
│   ├── content.config.ts         # 内容集合 schema(包含 contentKind 字段)
│   ├── content/
│   │   ├── radar/                # 规则详情文章(*.md)
│   │   ├── checklists/           # 行动清单(*.md)
│   │   └── calendar/events.json  # 日历事件(默认仅 1 条示例;生产页面不展示)
│   ├── components/               # 复用组件
│   │   ├── Header.astro          # 导航(用 withBase)
│   │   ├── Footer.astro          # 页脚(用 withBase)
│   │   ├── RadarCard.astro       # 显示 contentKind 徽标
│   │   ├── ChecklistCard.astro
│   │   ├── CalendarEvent.astro
│   │   └── SubscribeForm.astro   # 默认禁用,后端接入后启用
│   ├── layouts/
│   │   └── BaseLayout.astro      # 占位 SITE 时自动 noindex
│   ├── lib/
│   │   ├── date.ts
│   │   ├── radar.ts              # 含 getContentKindClass / SITE_DEFAULTS
│   │   └── url.ts                # withBase() / isPlaceholderSite() —— 内部链接工具
│   ├── pages/
│   │   ├── index.astro           # 首页(分"近期更新"和"已核对基础规则")
│   │   ├── radar/
│   │   ├── checklists/
│   │   ├── calendar.astro        # 日历(空状态 + 过滤示例)
│   │   ├── self-check.astro
│   │   ├── about.astro
│   │   ├── disclaimer.astro
│   │   ├── privacy.astro
│   │   ├── 404.astro
│   │   ├── robots.txt.ts         # 动态 robots.txt(SITE 缺失时不输出 Sitemap)
│   │   └── rss.xml.ts            # RSS(过滤示例事件)
│   └── styles/global.css
├── .github/workflows/deploy.yml  # 自动部署(SITE / BASE 都已支持)
├── astro.config.mjs              # 读 SITE / BASE 环境变量
├── package.json
├── tsconfig.json
├── README.md                     # 本文件
├── CONTENT_GUIDE.md              # 内容编辑指南(含 contentKind 定义)
├── LAUNCH_CHECKLIST.md           # 上线前检查清单
├── TEST_REPORT.md                # 测试报告(只记录实际跑过的结果)
└── .env.example
```

---

## 4.5 当前实际的部署模式(2026-07-14 起)

仓库已经配置好 **双仓 + custom domain** 自动部署,**本节先于 §5 读**,
避免被后面的"项目页默认部署"误导。

- **源码仓**:`zhou-212/eurorule-radar`(public)
  - `main` 分支:全部 Astro 源码 + `.github/workflows/deploy.yml`
  - push 触发 GitHub Actions
- **构建产物仓**:`zhou-212/zhou-212.github.io`(public,user page)
  - `main` 分支:由 Actions 自动同步的 `dist/` 内容 + `CNAME`(custom domain) + `.nojekyll`
  - GitHub Pages 从这个 user page 仓部署到 **https://weiread.com**
- **Custom domain**:`weiread.com`(DNS 4 条 A 记录指向 GitHub Pages IP,CNAME 文件写 `weiread.com`)
- **Workflow**:
  - `npm ci` → `npm run build:fast` (`SITE=https://weiread.com`, `BASE=/`) → 推 `dist/` 到 user page 仓
  - 保留 user page 仓的 `CNAME` / `.nojekyll`,其他文件被 `dist` 覆盖
  - 跳过的 dist 文件:`CNAME.example`(文档占位)、`runtime-config.example.js`(后端集成模板,等后端部署时手动 cp)

### 4.5.1 日常开发流程

```bash
# 改源码 → 提交 → push,Actions 自动 build + 同步到 user page
cd D:\OU\eurorule-radar
# ... 改源码 ...
git add -A
git commit -m "feat: ..."
git push origin main
# 等 1-2 分钟 → https://weiread.com 看到改动
```

### 4.5.2 故障排查

| 现象 | 看什么 |
|---|---|
| push 后没反应 | `gh run list --repo zhou-212/eurorule-radar --limit 3` 看 workflow 状态 |
| workflow 跑成功但 weiread.com 没变 | 看 `git log --oneline origin/main` 确认 user page 仓 HEAD 是不是更新了;GitHub Pages 缓存通常 1 分钟内刷新 |
| custom domain 失效 | 确认 user page 仓 `CNAME` 内容还是 `weiread.com`(workflow 保留它,但手动操作可能删) |
| `PAGES_PUSH_TOKEN` 失效 | 重新 `gh auth token` 拿 token,然后 `gh secret set PAGES_PUSH_TOKEN --repo zhou-212/eurorule-radar --body <token>` |

### 4.5.3 如果你想换部署模式

- 换 custom domain:改 `deploy.yml` 第 60 行 `SITE: https://weiread.com`,改 user page 仓的 `CNAME`,改 DNS A 记录
- 改回项目页(不推荐,URL 路径会变成 `weiread.com/eurorule-radar/`):用 §5.0 模式 B + 改 deploy.yml 用 `actions/deploy-pages@v4` 部署到本仓 Pages

---

## 5. 部署到 GitHub Pages

### 5.0 部署前必读:SITE 与 BASE

`SITE` 和 `BASE` 两个变量决定整个站点的部署模式,**至少要正确理解**:

| 部署场景 | SITE | BASE | 物理路径 |
|---|---|---|---|
| A. 自定义域名根路径 | `https://your-domain.com` | `/` | `https://your-domain.com/radar/` |
| B. GitHub Pages 项目页(默认) | (不设)工作流自动拼 `https://<owner>.github.io/eurorule-radar` | (不设)工作流自动 `/eurorule-radar/` | `https://<owner>.github.io/eurorule-radar/radar/` |
| C. 项目页 + 自定义子路径 | (不设) | `vars.BASE=/eu-radar/` | `https://<owner>.github.io/eu-radar/radar/` |

**代码内统一使用 `src/lib/url.ts` 的 `withBase(path)` 工具函数** —— 所有站内
链接(导航、面包屑、canonical、OG、RSS、sitemaps、favicon 等)都通过它生成,
不要在源码里手写 `href="/radar"` 这种根路径。

**⚠️ SITE 是上线前必配项:**
- 不设 SITE / 仍是占位值 (`https://YOUR_DOMAIN.com`):工作流构建出的页面
  会自动添加 `<meta name="robots" content="noindex">`,robots.txt 不会输出
  Sitemap 行,防止搜索引擎索引到一个不存在的 host。
- 配好 SITE 后,这一行 meta 消失,robots.txt 输出真实 Sitemap 地址。

### 5.1 第一次部署

1. **创建 GitHub 仓库**:`<user>/eurorule-radar`(public)
2. **推送代码**:
   ```bash
   git init
   git add .
   git commit -m "init: 欧规雷达 第一版"
   git branch -M main
   git remote add origin git@github.com:<user>/eurorule-radar.git
   git push -u origin main
   ```
3. **配置 Pages**:`Settings → Pages → Source: GitHub Actions`(自动识别 `.github/workflows/deploy.yml`)
4. **等待构建**:第一次约 2-3 分钟,后续推送约 1-2 分钟
5. **访问**:`https://<user>.github.io/eurorule-radar/`

### 5.2 自定义域名(可选,先看 5.3)

#### 5.2.1 子域名(如 `radar.example.com`)

1. 复制 `public/CNAME.example` 为 `public/CNAME`,把内容改为**一行真实域名**(`radar.example.com`)。
   - **重要**:`public/CNAME` 必须**只有一行**真实域名(没有注释、没有占位符),否则 GitHub Pages 无法识别。
2. 在 DNS 服务商加 CNAME:
   ```
   radar.example.com  CNAME  <user>.github.io
   ```
3. 在 `Settings → Pages → Custom domain` 输入 `radar.example.com`,勾 `Enforce HTTPS`。
4. 等待 DNS 传播 + GitHub 证书签发(5-30 分钟)。
5. **SITE 变量**:在 `Settings → Secrets and variables → Actions → Variables` 添加 `SITE=https://radar.example.com`(完整 URL,不要拼 `.github.io/eurorule-radar/`)。**BASE 不需要设**(自定义域名走默认 `/`)。

#### 5.2.2 主域名(不推荐,容易和现有服务冲突)

如果你确实要把主域指过来:
- 4 条 A 记录:
  ```
  @  A  185.199.108.153
  @  A  185.199.109.153
  @  A  185.199.110.153
  @  A  185.199.111.153
  ```
- `www` 也加 CNAME 指向 `<user>.github.io`
- SITE 变量设为 `https://example.com`,BASE 不设(默认 `/`)

### 5.3 SITE / BASE 变量配置(工作流已支持两种部署模式)

`.github/workflows/deploy.yml` 已支持三种模式:

- **若你设了 GitHub Variables 中的 `SITE`** → 用你的值;BASE 缺省为 `/`
- **若你没设 `SITE`** → 自动用 `https://<owner>.github.io/eurorule-radar`;BASE 缺省为 `/eurorule-radar/`
- **若你设了 `BASE`(可选)** → 覆盖默认 BASE(用于把项目页部署到非默认子路径)

**配置步骤(自定义域名时必做):**

1. 打开 GitHub 仓库 → **Settings → Secrets and variables → Actions → Variables**
2. 标签切到 **Variables**(不是 Secrets),点 **New repository variable**
3. Name 填 `SITE`,Value 填完整 URL,例如 `https://eurorule.example.com`
   - 不要带尾部斜杠(尾部斜杠会被 Astro 归一化)
   - 不要把 `.github.io/eurorule-radar` 拼在后面
4. (可选)Name 填 `BASE`,Value 填子路径,例如 `/eu-radar/`

### 5.4 替换其他占位符

部署前,把以下占位符替换为真实值(在 `src/lib/radar.ts`、`src/pages/about.astro`、`src/pages/privacy.astro` 中):

| 占位符 | 替换为 |
|---|---|
| `YOUR_DOMAIN.com` | 你的真实域名(如 `eurorule.example.com`) |
| `YOUR_GITHUB_USER` | 你的 GitHub 用户名 |
| `YOUR_CONTACT_EMAIL@example.com` | 你的真实联系邮箱 |

替换方式示例(PowerShell):

```powershell
Get-ChildItem -Recurse -Include *.astro,*.ts,*.md,*.mjs,CNAME.example -Path src,public |
  Where-Object { $_.FullName -notmatch 'node_modules|dist' } |
  ForEach-Object {
    (Get-Content $_.FullName -Encoding UTF8) `
      -replace 'YOUR_DOMAIN\.com','eurorule.example.com' `
      -replace 'YOUR_GITHUB_USER','yourname' `
      -replace 'YOUR_CONTACT_EMAIL@example\.com','hello@example.com' |
    Set-Content -Encoding UTF8 $_.FullName
  }
```

注意:本命令只动 `src/` 和 `public/` 下的源文件,**不**动 `node_modules`、`dist/`、根目录的 `*.md`(项目文档保持占位符可见)。

---

## 6. 配置 DNS / Pages / 搜索引擎

### 6.1 DNS(以 Cloudflare / 阿里云为例)

详见 `.github/workflows/deploy.yml` 流程;DNS 配置参考上文 5.2。

### 6.2 提交搜索引擎

#### Google Search Console

1. 打开 https://search.google.com/search-console/
2. 添加资源 → URL 前缀:`https://eurorule.example.com`
3. 验证方式(DNS TXT 记录最快):
   - Google 提供一段 TXT 记录
   - 在 DNS 服务商加这条 TXT
   - 回 GSC 点 "验证"
4. 验证后 → 站点地图 → 输入 `https://eurorule.example.com/sitemap-index.xml` → 提交
5. (可选)索引检查 → 输入关键 URL → 请求编入索引

#### Bing Webmaster Tools

1. 打开 https://www.bing.com/webmasters
2. 添加站点 → 同样的 URL
3. 验证(DNS TXT 或 meta 标签;DNS TXT 更快)
4. 站点地图 → 提交 `https://eurorule.example.com/sitemap-index.xml`

#### 百度站长(可选,面向中文搜索)

1. 打开 https://ziyuan.baidu.com/
2. 添加站点 → 验证
3. 链接提交 → 主动推送(API)或 sitemap

---

## 7. 接入邮件订阅(自建后端)

**当前默认状态:订阅表单禁用,不发送任何数据。** 在 `public/runtime-config.js`
填入 `API_BASE_URL` 之前,按钮显示"订阅功能即将开放",UI 明确告知用户当前不收集邮箱。

### 启用步骤

1. **部署自建后端**(必须),实现以下接口:

   ```
   POST {API_BASE_URL}/api/v1/subscriptions
   Content-Type: application/json

   Body: {
     "email":   "user@example.com",   // string
     "topics":  ["DE", "FR"],          // string[] 国家 / 主题代码
     "consent": true                    // boolean
   }
   ```

   返回:`200/201` 表示成功,`4xx/5xx` 表示失败(前端会显示明确错误)。

2. **生成 runtime-config.js**(用户部署时手动操作,不要提交到 git):

   ```bash
   # macOS / Linux
   cp public/runtime-config.example.js public/runtime-config.js
   # Windows PowerShell
   Copy-Item public/runtime-config.example.js public/runtime-config.js
   ```

   编辑 `public/runtime-config.js`:

   ```js
   window.__EURORULE_RUNTIME_CONFIG__ = {
     API_BASE_URL: 'https://api.your-domain.com',
   };
   ```

3. **构建并部署**。`public/runtime-config.js` 会被自动复制到 `dist/`。
   访问任意页面时,`BaseLayout.astro` 会先加载该脚本,表单自动启用。

### 行为保证

- `runtime-config.js` 不存在 / `API_BASE_URL` 缺失或不是 `https://` 开头 → 表单保持禁用,不会发出任何网络请求。
- 启用后,`API` 返回 4xx/5xx → 显示明确错误,绝不假装成功。
- 隐私说明页(`/privacy`)已同步更新,准确描述"当前不收集 / 启用后通过自建后端收集"。

---

## 8. SEO

站点已默认配置:

- 每页唯一 `<title>` 和 `<meta name="description">`
- `<link rel="canonical">`
- Open Graph + Twitter Card
- `sitemap-index.xml`(自动生成)
- `robots.txt`
- `/rss.xml` 规则雷达更新 Feed
- JSON-LD:`WebSite`、`Organization`、`Article`、`BreadcrumbList`
- 详情页语义化(article / header / time / dl)
- 面包屑导航
- 内链:规则 / 清单 / 日历 / 自测相互关联

提交到 GSC / Bing Webmasters 步骤见 6.2。

---

## 9. 内容编辑(内容状态 / 示例边界)

本站把规则分为 4 类,**视觉上明确区分**:

| contentKind | 含义 | 视觉 |
|---|---|---|
| `基础规则` | 长期有效的常驻要求(GPSR / LUCID / EPR / EPREL 等) | 灰色徽标 |
| `近期更新` | 90 天内有具体更新 / 修订 / 新规,**必须有官方原始来源 + 核对日期** | 绿色徽标 |
| `示例` | 编辑模板 / 演示用,**不代表任何真实事件** | 黄色"示例"徽标 |
| `待核实` | 尚未找到可靠原始来源,**不发布** | 紫色徽标 |

- 首页"近期更新(已核对)"区域默认可能为空 —— 我们**不允许**把未核实的日期 / 公告包装成"新近发布的变化"。
- 首页"已核对的基础规则"区域列出 evergreen 卡片,明确标注"长期有效的常驻要求,不是新近变化"。
- 日历默认只展示有官方原始来源的真实节点;**没有**就显示"暂未发布已核实的近期截止日"。

详见 [CONTENT_GUIDE.md](./CONTENT_GUIDE.md)。

---

## 10. 商业化路线图

### 阶段 1:免费内容验证(当前)

- 免费规则卡、清单、自测、邮件订阅
- **目标**:验证用户是否愿意订阅和持续回访
- **目标指标**:
  - 上线 14 天内:目标卖家订阅数达到 **30**
  - 至少 **5 位**目标用户回复明确需求或提出规则追踪问题
  - 至少 **3 位**用户表达愿意为个性化提醒或检查清单付费
- **如未达到**:优先调整细分人群和内容主题,而不是立刻增加复杂功能

### 阶段 2:轻量订阅

- 按国家 / 类目 / 主题订阅提醒
- 每周摘要 + 重点截止日期提醒
- 收费:€3-8 / 月(中国用户可能人民币 ¥20-50 / 月)

### 阶段 3:付费工具

- 自定义行动清单
- 单品 / 类目资料准备向导
- 付费人工复核 / 第三方服务商转介
- **保持边界**:"非法律意见"——明确转介有资质的律师 / 认证机构

> 商业化方案要重新评估法律 / 税务影响,可能需要主体公司 / 发票能力。

---

## 11. 命令速查与常见问题

| 命令 | 作用 |
|---|---|
| `npm.cmd install` | 安装依赖 |
| `npm.cmd run dev` | 本地开发服务器(默认 http://localhost:4321) |
| `npm.cmd run build:fast` | 仅构建(跳过类型检查,最快) |
| `npm.cmd run build` | 类型检查 + 静态构建(产物在 `dist/`) |
| `npm.cmd run preview` | 预览构建产物(默认 http://localhost:4321) |
| `npm.cmd run check` | 仅类型检查 / 内容集合 schema(可能慢,见下) |
| `npm.cmd run format` | 用 Prettier 格式化 |

### `npm.cmd run check` 超时 / 卡住怎么办?

`astro check` 启动 TypeScript Language Service + 解析所有 .astro / .ts / .mdx 文件。
在 Windows / 大型项目上**首次运行**可能 30s-2min,**第二次**有缓存会快很多。

**如果超过 3 分钟仍卡住:**

1. 看是否有 `node_modules/.astro` 缓存目录(没有就 npm install 不全)
2. 看是否被杀毒软件实时扫描拖慢
3. 看 `package.json` 的 `@astrojs/check` 版本是否兼容 Astro 5
4. **临时替代**:跑 `npm.cmd run build:fast` 完成构建,然后看 `dist/` 的 HTML 是否有 500 / 渲染失败。
   - `build:fast` 跳过 `astro check`,不代表代码"没问题"——只代表产物已生成。
   - 上线前必须跑过一次完整 `check` 或确认 `build` 成功。
5. **绝不要**因为 `check` 超时,就把 `package.json` 里的 `build` 改成只有 `astro build` 来"看起来通过"。
   本项目 `build:fast` 是显式的快捷方式,`build` 仍是带 check 的完整流程,二者并存。

如果 `check` 真的无法在合理时间内跑通,在 `TEST_REPORT.md` 中**如实记录**实际跑过的命令、耗时和结果。

### PowerShell 提示

- 看到 `npm.ps1 cannot be loaded because running scripts is disabled on this system`?
  - 解决方法 1(推荐):用 `npm.cmd` 替代 `npm`
  - 解决方法 2(谨慎):`Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`
  - 不要全局放宽 `ExecutionPolicy` 到 `Bypass`

---

## 12. 待配置项(部署前必须替换)

| 占位符 | 当前值 | 替换为 | 是否阻塞上线 |
|---|---|---|---|
| GitHub Variables `SITE` | 未设 | 生产 URL(如 `https://eurorule.example.com`)。**不设会导致 robots.txt 没 Sitemap、整站 noindex** | ⚠️ **必配** |
| GitHub Variables `BASE` | 未设(自动推断) | 自定义子路径(项目页默认 `/eurorule-radar/`,可省略) | 可选 |
| `YOUR_DOMAIN.com` | 占位 | 你的真实域名 | 推荐 |
| `YOUR_GITHUB_USER` | 占位 | 你的 GitHub 用户名 | 推荐 |
| `YOUR_CONTACT_EMAIL@example.com` | 占位 | 你的真实联系邮箱 | 推荐 |
| `public/CNAME` | 仓库里**没有**;有 `public/CNAME.example` | 用自定义域名前:`cp public/CNAME.example public/CNAME` 并把内容改为一行真实域名 | 仅自定义域名 |
| `public/runtime-config.js` | 仓库里**没有**(在 .gitignore) | 接入自建订阅后端时:从 `runtime-config.example.js` 复制并填 `API_BASE_URL` | 可选(不配则订阅功能保持禁用) |

替换方式见 5.4。

---

## 13. 已知限制

- **第一阶段不持久化订阅数据**(邮件服务接入前)
- **不在站内做账号 / 登录 / 数据库**
- **不接入付费服务**;邮件服务、分析都需要可选接入
- **不内置 AI 写作 / 自动发布**
- **不伪造 2026 年新规** —— "近期更新"为空时,**首页**诚实显示"暂未发布已核对的近期更新",而不是塞示例凑数
- **日历默认只 1 条示例事件**(用于视觉演示);运营需用真实节点替换
- **不内置 analytics**(可后续接 Plausible / Cloudflare Analytics)

详见 [TEST_REPORT.md](./TEST_REPORT.md) 的"已知限制"。

---

## 14. 部署前必查

详见 [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md)。

---

## 15. 致谢

- 设计参考:GOV.UK Design System、Stripe Docs、Vercel Docs
- 字体:系统字体优先,加载轻量
- 图标:内联 SVG,无第三方资源
- 数据来源:Amazon Seller Central、EUR-Lex、欧盟成员国机构

---

**最后更新**:2026-07-13

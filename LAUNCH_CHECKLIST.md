# LAUNCH_CHECKLIST.md — 上线前检查清单

> 真正部署到生产环境前,逐项打勾。
> 涉及"可执行命令"的,在 PowerShell 下用 `npm.cmd`;在 macOS/Linux 下用 `npm`。

---

## A. 代码 / 构建

- [ ] `npm.cmd install` 成功
- [ ] `npm.cmd run build:fast` 成功(快速构建,跳过类型检查)
- [ ] `npm.cmd run build` 成功(类型检查 + 构建);**或**记录为何 check 失败的实际情况(见 §K)
- [ ] `dist/` 目录生成,包含 `index.html`、`radar/`、`checklists/`、`calendar/`、`self-check/`、`about/`、`disclaimer/`、`privacy/`、`404.html`、`sitemap-index.xml`、`rss.xml`、`robots.txt`、`favicon.svg`、`og-default.svg`
- [ ] 所有规则详情页 / 清单详情页都已生成
- [ ] `404.html` 存在
- [ ] `dist/` 中**没有** `CNAME` 文件(默认不放;用自定义域名前才 cp CNAME.example)
- [ ] `dist/` 中 `robots.txt` 的 Sitemap 行是**有效占位**(可以保留 `YOUR_DOMAIN.com` 模板,但 README §5.3 必须配 SITE 变量)

## B. 占位符与域名

- [ ] `astro.config.mjs` 的 `site` 已设置为生产 URL(或 `SITE` 环境变量)
- [ ] 决定是否用自定义域名:
  - **用子域 / 主域**:复制 `public/CNAME.example` 为 `public/CNAME`,把内容改为**一行**真实域名;在 GitHub Variables 加 `SITE` 为完整 URL(不要拼 `.github.io/eurorule-radar/`)
  - **用 GitHub Pages 默认子域**:不创建 `public/CNAME`,不设 `SITE` 变量
- [ ] `public/robots.txt` 的 Sitemap URL(部署后是生产域名;部署前是 `YOUR_DOMAIN.com` 占位)
- [ ] `src/lib/radar.ts` 的 `contactEmail` / `githubRepo` 替换为真实值
- [ ] `src/pages/about.astro` 的联系邮箱、GitHub 链接替换
- [ ] `src/pages/privacy.astro` 的联系邮箱替换
- [ ] 全局搜索 `YOUR_DOMAIN`、`YOUR_GITHUB_USER`、`YOUR_CONTACT_EMAIL`,**无残留**(在 `src/` 和 `public/` 范围内)
- [ ] 项目根的 `*.md` 文档可以保留占位符(开发者文档,不在生产构建中)

## C. 内容真实性

- [ ] 每条规则都附**具体**原始来源(不是官网首页)+ 核对日期
- [ ] **没有任何虚构**的法规结论、链接、日期或处罚后果
- [ ] **没有任何**未经核实的"近期更新"(contentKind 只能是 `基础规则` / `示例` / `待核实`)
- [ ] **没有任何**未标 `isExample: true` 的虚假截止日
- [ ] "示例 / 待核实"内容视觉标记清楚(详情页有黄色 / 紫色提示)
- [ ] "近期更新"区域为空时,首页显示"暂未发布已核对的近期更新"而不是塞示例
- [ ] 日历为空时,显示"暂未发布已核实的近期截止日"
- [ ] 免责声明 + 隐私说明页面可访问,内容完整,联系邮箱已替换

## D. SEO 元信息

- [ ] 每页 `<title>` 唯一,包含核心关键词
- [ ] 每页 `<meta name="description">` 唯一,150-160 字
- [ ] 每页 `<link rel="canonical">` 正确(用 SITE 变量 / 部署 URL,不是 `YOUR_DOMAIN.com` 模板)
- [ ] Open Graph + Twitter Card 在首页和详情页正常
- [ ] `sitemap-index.xml` URL 全部是生产域名(部署后验证)
- [ ] `robots.txt` 不阻止重要页面
- [ ] `rss.xml` 链接是绝对 URL
- [ ] 详情页有 `Article` JSON-LD
- [ ] 列表 / 详情页有 `BreadcrumbList` JSON-LD
- [ ] 首页有 `WebSite` + `Organization` JSON-LD
- [ ] 不存在 `/README.md` / `/CONTENT_GUIDE.md` 等指向项目根文档的内部链接(详情检查:在 `dist/` 中 grep `href=".*\.md"` 应该没有命中)

## E. 访问性 / 体验

- [ ] 移动端 375px 宽无横向溢出
- [ ] 导航 / 搜索 / 筛选 / 表单 / 清单键盘可操作(Tab、Enter、Esc)
- [ ] 所有图片有 alt
- [ ] 颜色对比度 ≥ WCAG AA(深靛蓝 + 白底)
- [ ] 表单有 label
- [ ] 错误状态有 aria-live
- [ ] 跳转链接(`skip-link`)可用
- [ ] 移动端导航汉堡菜单可开 / 关
- [ ] 风险等级用文字 + 颜色 + 图标(不依赖颜色,色盲友好)
- [ ] 内容状态(contentKind)有视觉标记

## F. 第三方服务(可选)

- [ ] 邮件订阅:已选定 Tally / Brevo / ConvertKit(或继续用占位)
- [ ] 表单 action URL 已配置
- [ ] 在表单中明确标识"占位模式"
- [ ] 分析:决定是否启用 Plausible / Umami / Cloudflare Analytics
- [ ] 如启用:在隐私说明中明确告知

## G. GitHub 仓库 / Actions

- [ ] `.github/workflows/deploy.yml` 存在,且 SITE 拼接逻辑已修复(看文件头部注释)
- [ ] `Settings → Pages → Source: GitHub Actions`
- [ ] `Settings → Secrets and variables → Actions` 中 `SITE` 变量(若用自定义域名)已设
- [ ] 推送 `main` 后能看到 Action 运行
- [ ] Action 完成后 Pages 部署成功
- [ ] 检查 `gh-pages` / `actions/deploy-pages` 输出

## H. DNS / 域名

- [ ] DNS 记录已加(子域 CNAME 或主域 4 条 A)
- [ ] DNS 传播已确认(`dig` / 在线工具)
- [ ] GitHub Pages → Custom domain 已设
- [ ] Enforce HTTPS 灰 → 绿
- [ ] `https://你的域名` 浏览器可访问,带绿锁
- [ ] `curl -I https://你的域名` 返回 200

## I. 搜索引擎

- [ ] Google Search Console:添加资源、验证、提交 sitemap
- [ ] Bing Webmaster Tools:添加资源、验证、提交 sitemap
- [ ] 百度站长(可选):添加资源、验证、提交 sitemap
- [ ] 手动请求几条关键 URL 索引

## J. 监控 / 维护

- [ ] 监控:GitHub Actions 失败通知(在 Repo → Watch → All Activity)
- [ ] 备份:内容文件在 git 中(自动);考虑每月一次 git tag 备份
- [ ] 升级:`npm.cmd outdated` / `npm.cmd audit` 每月检查

## K. 测试执行记录

- [ ] 把本次实际跑过的命令、耗时、结果写到 `TEST_REPORT.md` 的"测试执行记录"表
- [ ] 如果 `npm.cmd run check` 超时或失败,记录**真实原因**(比如 `astro check` Language Service 启动慢、Windows Defender 实时扫描拖慢等)
- [ ] **不要**为了让 check 通过而删除类型检查或降低内容 schema 校验

## L. 上线后 7 天

- [ ] 每天查看 GitHub Action 状态
- [ ] 每天看 1-2 次搜索引擎索引进度
- [ ] 第 7 天:GSC 的 Coverage / Performance 看基础数据
- [ ] 第 14 天:评估是否达到 README §10 阶段 1 目标指标

---

**最后更新**:2026-07-13

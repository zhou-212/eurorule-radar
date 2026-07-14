// 扫描 dist 产物:
// 1) 是否还有 YOUR_DOMAIN / your_domain 残留 (默认 SITE 下应该 robots 不输出 sitemap,但 sitemap-* 仍会有占位)
// 2) 是否还有 /radar 这种根路径硬编码 (BASE=/ 时合法,但 BASE=/eurorule-radar/ 下应该被替换)
// 3) 订阅表单是否已禁用
// 4) 是否有示例截止日出现在生产页面
// 5) 示例事件是否漏到 RSS
// 6) robots.txt 在占位 SITE 下的行为

// ============================================================
// verify-dist.cjs
// ------------------------------------------------------------
// 用法:node verify-dist.cjs <dist 路径> <base 路径>
// 例:  node verify-dist.cjs D:/OU/eurorule-radar/dist /eurorule-radar/
//      node verify-dist.cjs D:/OU/eurorule-radar/dist /
// ============================================================
const fs = require('fs');
const path = require('path');

const DIST = process.argv[2] || 'D:/OU/eurorule-radar/dist';
const BASE = process.argv[3] || '/';

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const files = walk(DIST);
const results = [];
let ok = true;
function fail(msg) { results.push({ ok: false, msg }); ok = false; }
function pass(msg) { results.push({ ok: true, msg }); }

const expectedBasePrefix = BASE === '/' ? '' : BASE.replace(/\/$/, '');

// ===== 1) robots.txt =====
const robotsPath = path.join(DIST, 'robots.txt');
if (!fs.existsSync(robotsPath)) {
  fail('robots.txt 缺失');
} else {
  const robots = fs.readFileSync(robotsPath, 'utf8');
  console.log('\n--- robots.txt ---\n' + robots);
  if (BASE === '/' && /sitemap:.*your[-_]?domain/i.test(robots)) {
    fail('占位 SITE 下 robots.txt 不应输出 sitemap');
  } else if (BASE === '/eurorule-radar/') {
    if (!/sitemap:.*github\.io\/eurorule-radar/i.test(robots)) {
      fail('GH Pages SITE 下 robots.txt 应输出真实 sitemap URL');
    } else {
      pass('GH Pages SITE 下 robots.txt 输出真实 sitemap URL');
    }
  } else {
    pass('robots.txt 行为正确');
  }
}

// ===== 2) sitemap-index.xml =====
const smPath = path.join(DIST, 'sitemap-index.xml');
if (fs.existsSync(smPath)) {
  const sm = fs.readFileSync(smPath, 'utf8');
  console.log('\n--- sitemap-index.xml ---\n' + sm);
}

// ===== 3) rss.xml =====
const rssPath = path.join(DIST, 'rss.xml');
if (fs.existsSync(rssPath)) {
  const rss = fs.readFileSync(rssPath, 'utf8');
  console.log('\n--- rss.xml (head) ---\n' + rss.slice(0, 1200) + '\n...');
  // 检查示例事件是否漏到 RSS
  if (/示例内容|示例演示|example-ce-declaration/i.test(rss)) {
    fail('RSS 包含示例内容 (example-ce-declaration 或"示例")');
  } else {
    pass('RSS 不含示例内容');
  }
  // 检查 link 是否含 BASE 路径(绝对 URL 通过 site 拼)
  if (BASE === '/eurorule-radar/') {
    if (!/https:\/\/[^\/]+\.github\.io\/eurorule-radar\/radar\//i.test(rss)) {
      fail('RSS link 不含 /eurorule-radar/ 路径');
    } else {
      pass('RSS link 含 /eurorule-radar/ 路径');
    }
  } else {
    if (BASE === '/' && /\/radar\//.test(rss) && !/https?:\/\/your[-_]?domain\.com\/radar\//.test(rss)) {
      pass('RSS link 不含占位 host');
    } else if (BASE === '/' && /https?:\/\/your[-_]?domain\.com\/radar\//.test(rss)) {
      console.warn('⚠️  RSS link 用了占位 host (默认 SITE 下,正常)');
    }
  }
}

// ===== 4) 检查手写根路径 =====
console.log('\n--- 扫描错误根路径 ---');
let badLinks = [];
for (const f of files) {
  if (!f.endsWith('.html')) continue;
  if (f.includes('_astro')) continue;
  const html = fs.readFileSync(f, 'utf8');
  // BASE=/eurorule-radar/ 下,任何 href="/radar" / href="/_astro" / href="/favicon.svg"
  // href="/rss.xml" 都是错的(应该 href="/eurorule-radar/...")
  if (expectedBasePrefix) {
    const re = /href="(\/(?:radar|checklists|calendar|self-check|about|disclaimer|privacy|rss\.xml|og-default\.svg|favicon\.svg|sitemap-index\.xml|404|runtime-config\.js))"/g;
    let m;
    while ((m = re.exec(html)) !== null) {
      badLinks.push({ file: path.relative(DIST, f), href: m[1] });
    }
  }
}
if (badLinks.length > 0) {
  fail(`发现 ${badLinks.length} 处错误根路径 (BASE=${BASE} 下应该被前缀)`);
  for (const b of badLinks.slice(0, 30)) console.log('   ', b.file, b.href);
  if (badLinks.length > 30) console.log('   ... 还有', badLinks.length - 30, '处');
} else {
  pass(`无错误根路径 (BASE=${BASE} 下所有站内链接正确)`);
}

// ===== 5) 占位 SITE / 占位 host 扫描 =====
console.log('\n--- 扫描占位 host ---');
let placeholders = [];
for (const f of files) {
  if (!f.endsWith('.html') && !f.endsWith('.xml') && !f.endsWith('.txt')) continue;
  if (f.includes('_astro')) continue;
  const txt = fs.readFileSync(f, 'utf8');
  // 占位 host:your_domain.com / your-domain.com / YOUR_DOMAIN.com
  // canonical/og/sitemap 用占位 host 正常(默认 SITE),但 robots.txt 不应有
  const re = /your[-_]?domain\.com/gi;
  let m;
  while ((m = re.exec(txt)) !== null) {
    // 排除 README 等
    placeholders.push({ file: path.relative(DIST, f), hit: m[0] });
  }
}
if (placeholders.length > 0) {
  // 分类:robots.txt 中不应有;其他文件可接受(因为 SITE 是占位)
  const inRobots = placeholders.filter(p => p.file === 'robots.txt');
  const inOthers = placeholders.filter(p => p.file !== 'robots.txt');
  if (inRobots.length > 0) {
    fail('robots.txt 仍含占位 host');
    inRobots.forEach(p => console.log('   ', p.file, p.hit));
  } else {
    pass('robots.txt 不含占位 host');
  }
  console.log(`   占位 host 出现 ${placeholders.length} 次 (Sitemap/CANONICAL/OG 包含,正常因为 SITE 是占位)`);
  if (inOthers.length > 0) {
    console.log('   详细:');
    inOthers.slice(0, 20).forEach(p => console.log('     ', p.file));
  }
} else {
  pass('完全无占位 host');
}

// ===== 6) 订阅表单状态 =====
console.log('\n--- 检查订阅表单 ---');
const indexHtml = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
if (/订阅功能即将开放|订阅功能筹备中/.test(indexHtml)) {
  pass('订阅按钮显示"即将开放"');
} else {
  fail('订阅按钮未显示即将开放');
}
if (/已记录\(占位模式\)/.test(indexHtml)) {
  fail('订阅表单仍假装"已记录"');
} else {
  pass('订阅表单不再假装"已记录"');
}
if (/name="email"[^>]*\bdisabled\b/.test(indexHtml)) {
  pass('email 输入框已 disabled');
} else {
  fail('email 输入框未 disabled');
}
if (/name="agree"[^>]*\bdisabled\b|name="country"[^>]*\bdisabled\b/.test(indexHtml)) {
  pass('country/agree 控件已 disabled');
} else {
  fail('country/agree 控件未 disabled');
}
// 检查"订阅每周汇总"是否还出现在营销文案中(disabled 状态时不应该)
if (/请<strong[^>]*>订阅每周汇总<\/strong>|订阅后你将收到/.test(indexHtml)) {
  fail('首页仍有"请订阅每周汇总" / "订阅后你将收到"营销文案');
} else {
  pass('首页订阅区文案与 disabled 状态一致');
}

// ===== 7) 示例截止日 =====
console.log('\n--- 检查示例截止日 ---');
for (const f of ['index.html', 'calendar/index.html', 'rss.xml']) {
  const fp = path.join(DIST, f);
  if (!fs.existsSync(fp)) continue;
  const txt = fs.readFileSync(fp, 'utf8');
  if (f === 'index.html' || f === 'calendar/index.html') {
    if (/示例日历/.test(txt) && !/示例日历[：:]/.test(txt)) {
      // 不严谨,需要看上下文。直接 grep "2026-10-15"(示例日期)
      if (/2026-10-15/.test(txt)) {
        fail(`${f} 含示例日期 2026-10-15`);
      } else {
        pass(`${f} 不含示例日期 2026-10-15`);
      }
    } else if (/2026-10-15/.test(txt)) {
      fail(`${f} 含示例日期 2026-10-15`);
    } else {
      pass(`${f} 不含示例日期 2026-10-15`);
    }
  }
  if (f === 'rss.xml' && /example-ce-declaration|示例内容|示例演示/.test(txt)) {
    fail('RSS 含示例内容');
  } else if (f === 'rss.xml') {
    pass('RSS 不含示例内容');
  }
}

// ===== 8) OG image / canonical 检查 =====
console.log('\n--- 检查 OG / canonical ---');
const indexHtmlContent = indexHtml;
if (/<link rel="canonical" href="https:\/\/your[-_]?domain\.com\//.test(indexHtmlContent)) {
  console.log('   canonical 使用占位 host (默认 SITE 下正常)');
}
if (/<meta name="robots" content="noindex/.test(indexHtmlContent)) {
  pass('占位 SITE 下页面已加 noindex 保护');
} else {
  console.log('   ⚠️  占位 SITE 下页面无 noindex 保护');
}
if (/<meta property="og:image"/.test(indexHtmlContent)) {
  if (/og:image" content="https:\/\/your[-_]?domain\.com\//.test(indexHtmlContent)) {
    console.log('   og:image 使用占位 host (默认 SITE 下正常)');
  } else {
    pass('og:image 不含占位 host');
  }
}

// ===== 9) runtime-config 引用 =====
console.log('\n--- 检查 runtime-config 引用 ---');
if (/<script[^>]*src="[^"]*runtime-config\.js"/.test(indexHtmlContent)) {
  pass('BaseLayout 注入了 runtime-config.js script');
} else {
  fail('BaseLayout 未注入 runtime-config.js');
}

console.log('\n=== 总结 ===');
console.log(ok ? '所有检查通过' : '有问题需要修复');

// 写 JSON 报告,方便后续被 wrapper 读
fs.writeFileSync('verify-report.json', JSON.stringify({ ok, results, base: BASE, dist: DIST }, null, 2));

process.exit(ok ? 0 : 1);

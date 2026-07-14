// ============================================================
// check-hrefs.cjs
// ------------------------------------------------------------
// 用法:node check-hrefs.cjs <dist 路径> <base 路径>
// 例:  node check-hrefs.cjs D:/OU/eurorule-radar/dist /eurorule-radar/
//      node check-hrefs.cjs D:/OU/eurorule-radar/dist /
// ============================================================
const fs = require('fs');
const path = require('path');
const DIST = process.argv[2] || 'D:/OU/eurorule-radar/dist';
const BASE = process.argv[3] || '/eurorule-radar/';
// 当 BASE=/ 时,根路径是合法的;否则需要带 BASE 前缀
const expectedPrefix = BASE === '/' ? '' : BASE.replace(/\/$/, '');

function walk(dir, out=[]) { for (const e of fs.readdirSync(dir, { withFileTypes: true })) { const p = path.join(dir, e.name); if (e.isDirectory()) walk(p, out); else out.push(p); } return out; }
const files = walk(DIST).filter(f => f.endsWith('.html'));
let bad = [];
for (const f of files) {
  const t = fs.readFileSync(f, 'utf8');
  // 匹配 href="/something" 形式 (不带 BASE 前缀)
  const re = /href="(\/(?:radar|checklists|calendar|self-check|about|disclaimer|privacy|rss\.xml|og-default\.svg|favicon\.svg|sitemap-index\.xml|runtime-config\.js))"/g;
  let m;
  while ((m = re.exec(t)) !== null) {
    if (!m[1].startsWith(expectedPrefix)) {
      bad.push({ file: path.relative(DIST, f), href: m[1] });
    }
  }
}
console.log(`=== href check (BASE=${BASE}) ===`);
console.log('total HTML files:', files.length);
console.log('unprefixed internal hrefs:', bad.length);
if (bad.length > 0) {
  bad.slice(0, 20).forEach(b => console.log(' ', b.file, '->', b.href));
  process.exit(1);
} else {
  console.log('PASS: All internal hrefs are correctly BASE-prefixed');
}


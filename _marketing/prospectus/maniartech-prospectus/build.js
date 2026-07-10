// Assembles the self-contained prospectus booklet: inlines the Satoshi variable
// font, logo, ISO badge, and the in-production Chemo screenshot as data URIs, and
// normalizes typographic characters to HTML entities (charset-proof).
// Run from repo root:  node _marketing/prospectus/maniartech-prospectus/build.js
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../../..');
const dir = __dirname;
const A = 'themes/maniartech/assets';
const b64 = (p) => fs.readFileSync(path.join(root, p)).toString('base64');

const font  = `data:font/woff2;base64,${b64(`${A}/fonts/Satoshi/Satoshi-Variable.woff2`)}`;
const logo  = `data:image/png;base64,${b64(`${A}/imgs/mt-imgs/logo-white.png`)}`;
const iso   = `data:image/png;base64,${b64(`${A}/imgs/mt-imgs/iso.png`)}`;
const chemo = `data:image/png;base64,${b64(`${A}/imgs/projects/chemo.png`)}`;

let html = fs.readFileSync(path.join(dir, 'booklet.src.html'), 'utf8');

const ents = {
  '—':'&mdash;','–':'&ndash;','·':'&middot;','→':'&rarr;','←':'&larr;',
  '“':'&ldquo;','”':'&rdquo;','‘':'&lsquo;','’':'&rsquo;','…':'&hellip;',
  '✕':'&#10005;','×':'&times;','©':'&copy;'
};
html = html.replace(/[—–·→←“”‘’…✕×©]/g, function(c){return ents[c];});

html = html.split('__SATOSHI__').join(font)
           .split('__LOGO__').join(logo)
           .split('__ISO__').join(iso)
           .split('__CHEMO__').join(chemo);

fs.writeFileSync(path.join(dir, 'index.html'), html);
console.log(`built index.html (${(Buffer.byteLength(html)/1024).toFixed(0)} KB) — font/logo/iso/chemo inlined`);

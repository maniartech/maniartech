// Assembles the self-contained deck: inlines the Satoshi variable font, the
// white logo, and the ISO badge as data URIs. Run from repo root:
//   node _marketing/presentations/maniartech-pitch/build.js
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../../..');
const dir = __dirname;
const A = 'themes/maniartech/assets';

const b64 = (p) => fs.readFileSync(path.join(root, p)).toString('base64');
const font = `data:font/woff2;base64,${b64(`${A}/fonts/Satoshi/Satoshi-Variable.woff2`)}`;
const logo = `data:image/png;base64,${b64(`${A}/imgs/mt-imgs/logo-white.png`)}`;
const iso  = `data:image/png;base64,${b64(`${A}/imgs/mt-imgs/iso.png`)}`;

let html = fs.readFileSync(path.join(dir, 'deck.src.html'), 'utf8');

// Charset-proof the output: convert typographic non-ASCII to HTML entities so
// it renders correctly regardless of the host's declared charset.
const ents = {
  '—':'&mdash;', '–':'&ndash;', '·':'&middot;',
  '→':'&rarr;',  '←':'&larr;',
  '“':'&ldquo;', '”':'&rdquo;', '‘':'&lsquo;', '’':'&rsquo;',
  '…':'&hellip;','✕':'&#10005;',' ':'&nbsp;',  '×':'&times;'
};
html = html.replace(/[—–·→←“”‘’…✕ ×]/g, function(c){return ents[c];});

html = html.split('__SATOSHI__').join(font)
           .split('__LOGO__').join(logo)
           .split('__ISO__').join(iso);

fs.writeFileSync(path.join(dir, 'index.html'), html);
const kb = (Buffer.byteLength(html) / 1024).toFixed(0);
console.log(`built index.html (${kb} KB) — font/logo/iso inlined`);

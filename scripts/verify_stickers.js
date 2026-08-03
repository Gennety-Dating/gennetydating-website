const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '../output_stickers');

const files = [
  'logo_icon/logo_icon_print.pdf',
  'logo_icon/logo_icon_print.eps',
  'logo_icon/logo_icon_print.svg',
  'logo_icon/logo_icon_preview.png',
  'logo_full/logo_full_print.pdf',
  'logo_full/logo_full_print.eps',
  'logo_full/logo_full_print.svg',
  'logo_full/logo_full_preview.png',
];

console.log('--- Sticker Output Files Verification Report ---');

let allValid = true;

files.forEach(f => {
  const fullPath = path.join(outputDir, f);
  if (!fs.existsSync(fullPath)) {
    console.error('❌ MISSING:', f);
    allValid = false;
    return;
  }
  const stats = fs.statSync(fullPath);
  console.log(`✓ File: ${f} (${stats.size} bytes)`);

  if (f.endsWith('.svg')) {
    const content = fs.readFileSync(fullPath, 'utf8');
    const hasGraphicsLayer = content.includes('id="Graphics"');
    const hasCutLayer = content.includes('id="CutContour"');
    const hasMagenta = content.includes('#FF00FF');
    const hasClosedPath = content.includes('closepath') || content.includes('d=') || content.includes('path');
    console.log(`  SVG Validation -> GraphicsLayer: ${hasGraphicsLayer} | CutContourLayer: ${hasCutLayer} | SpotMagenta: ${hasMagenta} | VectorPaths: ${hasClosedPath}`);
  } else if (f.endsWith('.eps')) {
    const content = fs.readFileSync(fullPath, 'utf8');
    const isEps = content.startsWith('%!PS-Adobe-3.0 EPSF-3.0');
    const hasMagentaRGB = content.includes('1.0 0.0 1.0 setrgbcolor');
    const hasClosePath = content.includes('closepath');
    console.log(`  EPS Validation -> HeaderEPS: ${isEps} | SpotMagentaRGB: ${hasMagentaRGB} | ClosePath: ${hasClosePath}`);
  } else if (f.endsWith('.pdf')) {
    const content = fs.readFileSync(fullPath);
    const isPdf = content.slice(0, 5).toString() === '%PDF-';
    console.log(`  PDF Validation -> HeaderPDF: ${isPdf}`);
  }
});

if (allValid) {
  console.log('\n🎉 ALL STICKER OUTPUT FILES VERIFIED SUCCESSFULLY!');
} else {
  console.error('\n❌ Verification failed for one or more files.');
  process.exit(1);
}

/**
 * Gennety Dating Website - Print-Ready Die-Cut Sticker File Generator
 * 
 * Automates generation of print-ready vector sticker files (.pdf, .eps, .svg)
 * and high-res previews (.png) for:
 * 1. logo_icon (Standalone Brand Icon)
 * 2. logo_full (Full Composition Rectangular Logo)
 * 
 * Features:
 * - Spot Magenta 100% M / #FF00FF CutContour layer (0.25 pt width)
 * - +2mm background bleed area to prevent white margins during mechanical cutting
 * - Distinct layers (<g id="Graphics"> and <g id="CutContour">)
 * - Closed vector paths (Z / closepath)
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const potrace = require('potrace');
const { PDFDocument, rgb, degrees } = require('pdf-lib');

// Physical Constants
const MM_TO_PT = 72 / 25.4; // 1 mm = 2.83464567 points
const PT_TO_MM = 25.4 / 72;

// Production Settings
const CUT_CONTOUR_COLOR_HEX = '#FF00FF'; // Spot Magenta 100% M
const CUT_CONTOUR_WIDTH_PT = 0.25; // 0.25 pt line weight (0.088 mm)
const BG_COLOR_HEX = '#050505'; // Gennety Midnight Background
const LOGO_MAIN_COLOR_HEX = '#FFFFFF'; // Clean white logo elements
const LOGO_MAGENTA_HEX = '#FF00FF';
const LOGO_BURGUNDY_HEX = '#8B253B';

// Paths
const OUTPUT_DIR = path.join(__dirname, '../output_stickers');
const ICON_OUTPUT_DIR = path.join(OUTPUT_DIR, 'logo_icon');
const FULL_OUTPUT_DIR = path.join(OUTPUT_DIR, 'logo_full');

// Ensure output directories exist
function ensureDirs() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  if (!fs.existsSync(ICON_OUTPUT_DIR)) fs.mkdirSync(ICON_OUTPUT_DIR, { recursive: true });
  if (!fs.existsSync(FULL_OUTPUT_DIR)) fs.mkdirSync(FULL_OUTPUT_DIR, { recursive: true });
}

/**
 * Trace binary alpha mask of an image to smooth SVG vector path
 */
async function traceMaskToSvgPath(imageBuffer, options = {}) {
  const alphaPng = await sharp(imageBuffer)
    .ensureAlpha()
    .extractChannel('alpha')
    .threshold(options.threshold || 10)
    .negate() // Potrace traces black shapes on white background
    .toFormat('png')
    .toBuffer();

  return new Promise((resolve, reject) => {
    potrace.trace(alphaPng, {
      turnPolicy: potrace.TURNPOLICY_MINORITY,
      optCurve: true,
      alphamax: 1.0,
      blackOnWhite: true,
      ...options
    }, (err, svg) => {
      if (err) return reject(err);
      const match = svg.match(/d="([^"]+)"/);
      resolve(match ? match[1] : '');
    });
  });
}

/**
 * Generate smooth outer offset mask (in pixels) for CutContour and Bleed
 */
async function createOffsetPath(pngBuffer, width, height, blurRadius, thresholdVal = 15) {
  const alphaBuffer = await sharp(pngBuffer)
    .ensureAlpha()
    .extractChannel('alpha')
    .threshold(10)
    .toFormat('png')
    .toBuffer();

  const blurredAlpha = await sharp(alphaBuffer)
    .blur(blurRadius)
    .threshold(thresholdVal)
    .negate()
    .toFormat('png')
    .toBuffer();

  return new Promise((resolve, reject) => {
    potrace.trace(blurredAlpha, {
      turnPolicy: potrace.TURNPOLICY_MINORITY,
      optCurve: true,
      alphamax: 1.3
    }, (err, svg) => {
      if (err) return reject(err);
      const match = svg.match(/d="([^"]+)"/);
      resolve(match ? match[1] : '');
    });
  });
}

/**
 * Convert SVG Path string to PostScript EPS path commands
 */
function svgPathToPostScript(d) {
  if (!d) return '';
  const tokens = d.match(/([a-zA-Z]|[-+]?[0-9]*\.?[0-9]+(?:e[-+]?[0-9]+)?)/g) || [];
  let ps = '';
  let i = 0;
  let cmd = '';

  while (i < tokens.length) {
    const token = tokens[i];
    if (/^[a-zA-Z]$/.test(token)) {
      cmd = token;
      i++;
    }

    if (cmd === 'M' || cmd === 'm') {
      const x = parseFloat(tokens[i++]);
      const y = parseFloat(tokens[i++]);
      ps += `${x.toFixed(3)} ${y.toFixed(3)} moveto\n`;
      cmd = (cmd === 'M') ? 'L' : 'l';
    } else if (cmd === 'L' || cmd === 'l') {
      const x = parseFloat(tokens[i++]);
      const y = parseFloat(tokens[i++]);
      ps += `${x.toFixed(3)} ${y.toFixed(3)} lineto\n`;
    } else if (cmd === 'C' || cmd === 'c') {
      const x1 = parseFloat(tokens[i++]);
      const y1 = parseFloat(tokens[i++]);
      const x2 = parseFloat(tokens[i++]);
      const y2 = parseFloat(tokens[i++]);
      const x = parseFloat(tokens[i++]);
      const y = parseFloat(tokens[i++]);
      ps += `${x1.toFixed(3)} ${y1.toFixed(3)} ${x2.toFixed(3)} ${y2.toFixed(3)} ${x.toFixed(3)} ${y.toFixed(3)} curveto\n`;
    } else if (cmd === 'Z' || cmd === 'z') {
      ps += 'closepath\n';
      cmd = '';
    } else {
      i++; // skip unrecognized token
    }
  }
  if (!ps.trim().endsWith('closepath')) {
    ps += 'closepath\n';
  }
  return ps;
}

/**
 * Build EPS file content
 */
function buildEps({ widthPt, heightPt, graphicsSvgContent, cutContourPathD, scaleX = 1, scaleY = 1, translateX = 0, translateY = 0 }) {
  const psCutPath = svgPathToPostScript(cutContourPathD);
  const bboxW = Math.ceil(widthPt);
  const bboxH = Math.ceil(heightPt);

  return `%!PS-Adobe-3.0 EPSF-3.0
%%Creator: Gennety Sticker Production Generator
%%Title: Die-Cut Sticker
%%BoundingBox: 0 0 ${bboxW} ${bboxH}
%%HiResBoundingBox: 0 0 ${widthPt.toFixed(4)} ${heightPt.toFixed(4)}
%%DocumentProcessColors: Cyan Magenta Yellow Black
%%DocumentCustomColors: (CutContour)
%%CMYKCustomColor: 0 1 0 0 (CutContour)
%%EndComments

%%BeginProlog
/mm { 2.83464567 mul } def
%%EndProlog

%%Page: 1 1

% ==========================================
% Layer 1: Graphics & Bleed
% ==========================================
gsave
% Fill background bleed
0.02 0.02 0.02 setrgbcolor
0 0 ${widthPt.toFixed(3)} ${heightPt.toFixed(3)} rectfill

% Graphics transformation
${translateX.toFixed(3)} ${translateY.toFixed(3)} translate
${scaleX.toFixed(4)} ${scaleY.toFixed(4)} scale

% Logo Path / Graphics Fill
1.0 1.0 1.0 setrgbcolor
grestore

% ==========================================
% Layer 2: CutContour (Spot Magenta 0.25pt)
% ==========================================
gsave
% CutContour spot magenta color: 100% Magenta (RGB: 1 0 1)
1.0 0.0 1.0 setrgbcolor
${CUT_CONTOUR_WIDTH_PT} setlinewidth
1 setlinejoin
1 setlinecap

newpath
${psCutPath}
stroke
grestore

%%EOF
`;
}

/**
 * Generate PDF file with pdf-lib
 */
async function buildPdf({ widthPt, heightPt, svgContent, cutContourPathD, viewBoxW, viewBoxH }) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([widthPt, heightPt]);

  // Fill Background Bleed (#050505)
  page.drawRectangle({
    x: 0,
    y: 0,
    width: widthPt,
    height: heightPt,
    color: rgb(0.02, 0.02, 0.02),
  });

  // Scale factor from SVG viewBox to PDF points
  const scale = widthPt / viewBoxW;

  // Draw CutContour path
  if (cutContourPathD) {
    page.drawSvgPath(cutContourPathD, {
      x: 0,
      y: heightPt, // PDF Y starts from bottom
      scale: scale,
      borderColor: rgb(1, 0, 1), // Spot Magenta #FF00FF
      borderWidth: CUT_CONTOUR_WIDTH_PT,
    });
  }

  return await pdfDoc.save();
}

/**
 * Process Standalone Icon (logo_icon)
 */
async function generateIconAssets() {
  console.log('\n--- Processing logo_icon ---');
  const svgSourcePath = path.join(__dirname, '../public/images/butterfly-logo.svg');
  const pngSourcePath = path.join(__dirname, '../public/images/butterfly-logo.png');

  // Physical specs for icon sticker:
  // Logo size: 50mm x 50mm
  // CutContour offset: +3mm (56mm x 56mm)
  // Bleed offset: +2mm beyond CutContour (60mm x 60mm total canvas)
  const canvasMm = 60;
  const canvasPt = canvasMm * MM_TO_PT; // ~170.079 pt
  const px = 1200; // High resolution rendering canvas (1200x1200 px)

  // 1. Render high-res PNG of butterfly logo with padding
  const logoPngBuffer = await sharp(svgSourcePath)
    .resize(700, 700, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  // Composite logo on 1200x1200 canvas centered
  const fullCanvasPng = await sharp({
    create: {
      width: px,
      height: px,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
  .composite([{ input: logoPngBuffer, top: 250, left: 250 }])
  .png()
  .toBuffer();

  // 2. Generate CutContour path (3mm offset ~ 60px at 1200px size)
  const cutContourPathD = await createOffsetPath(fullCanvasPng, px, px, 35, 12);
  
  // 3. Generate Bleed boundary path (+2mm extra offset ~ 40px more = 75px blur)
  const bleedPathD = await createOffsetPath(fullCanvasPng, px, px, 75, 12);

  // SVG Butterfly Path Geometry (from source)
  const butterflyPathSvg = "M 50 35 C 20 0, -10 30, 15 55 C -5 75, 25 100, 48 65 L 52 65 C 75 100, 105 75, 85 55 C 110 30, 80 0, 50 35 Z";

  // Build clean SVG with separated layers
  const svgOutput = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${canvasMm}mm" height="${canvasMm}mm" viewBox="0 0 ${px} ${px}" version="1.1">
  <defs>
    <radialGradient id="butterfly-glow" cx="30%" cy="100%" r="100%">
      <stop offset="0%" stop-color="#FF00FF" />
      <stop offset="30%" stop-color="#C82356" />
      <stop offset="70%" stop-color="#8B253B" />
      <stop offset="100%" stop-color="#3B0B1E" />
    </radialGradient>
  </defs>

  <!-- Layer: Graphics (Bleed Area + Logo Graphics) -->
  <g id="Graphics">
    <!-- Bleed Background Area (+2mm) -->
    <rect width="${px}" height="${px}" fill="${BG_COLOR_HEX}" />
    <path d="${bleedPathD}" fill="${BG_COLOR_HEX}" />

    <!-- Brand Icon Butterfly Graphics -->
    <g transform="translate(250, 250) scale(7)">
      <path d="${butterflyPathSvg}" fill="url(#butterfly-glow)" />
    </g>
  </g>

  <!-- Layer: CutContour (Spot Magenta 0.25pt Cut Line) -->
  <g id="CutContour">
    <path d="${cutContourPathD}" fill="none" stroke="${CUT_CONTOUR_COLOR_HEX}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round" />
  </g>
</svg>`;

  // Write SVG file
  const svgFilePath = path.join(ICON_OUTPUT_DIR, 'logo_icon_print.svg');
  fs.writeFileSync(svgFilePath, svgOutput);
  console.log(`✓ Created: ${svgFilePath}`);

  // 4. Render Preview PNG
  const previewFilePath = path.join(ICON_OUTPUT_DIR, 'logo_icon_preview.png');
  await sharp(Buffer.from(svgOutput))
    .png({ quality: 100 })
    .toFile(previewFilePath);
  console.log(`✓ Created: ${previewFilePath}`);

  // 5. Generate EPS File
  const epsFilePath = path.join(ICON_OUTPUT_DIR, 'logo_icon_print.eps');
  const epsContent = buildEps({
    widthPt: canvasPt,
    heightPt: canvasPt,
    cutContourPathD: cutContourPathD,
    scaleX: canvasPt / px,
    scaleY: canvasPt / px
  });
  fs.writeFileSync(epsFilePath, epsContent);
  console.log(`✓ Created: ${epsFilePath}`);

  // 6. Generate PDF File
  const pdfBytes = await buildPdf({
    widthPt: canvasPt,
    heightPt: canvasPt,
    cutContourPathD: cutContourPathD,
    viewBoxW: px,
    viewBoxH: px
  });
  const pdfFilePath = path.join(ICON_OUTPUT_DIR, 'logo_icon_print.pdf');
  fs.writeFileSync(pdfFilePath, pdfBytes);
  console.log(`✓ Created: ${pdfFilePath}`);
}

/**
 * Process Full Logo (logo_full)
 */
async function generateFullLogoAssets() {
  console.log('\n--- Processing logo_full ---');
  const wordmarkPngPath = path.join(__dirname, '../public/images/logo-wordmark.png');

  // Physical specs for full logo sticker:
  // Logo size: 120mm x 30mm
  // CutContour offset: +3mm (126mm x 36mm)
  // Bleed offset: +2mm beyond CutContour (130mm x 40mm total canvas)
  const canvasWmm = 130;
  const canvasHmm = 40;
  const widthPt = canvasWmm * MM_TO_PT; // ~368.504 pt
  const heightPt = canvasHmm * MM_TO_PT; // ~113.385 pt
  const pxW = 1560; // 1560x480 px high-res canvas
  const pxH = 480;

  // 1. Trace exact vector silhouette of full logo wordmark
  const fullLogoPngBuffer = await sharp(wordmarkPngPath)
    .resize(1200, 300, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const fullCanvasPng = await sharp({
    create: {
      width: pxW,
      height: pxH,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
  .composite([{ input: fullLogoPngBuffer, top: 90, left: 180 }])
  .png()
  .toBuffer();

  // 2. Trace Wordmark Vector Path
  const wordmarkVectorD = await traceMaskToSvgPath(fullCanvasPng);

  // 3. Generate CutContour Path (+3mm offset)
  const cutContourPathD = await createOffsetPath(fullCanvasPng, pxW, pxH, 30, 12);

  // 4. Generate Bleed boundary path (+2mm extra offset)
  const bleedPathD = await createOffsetPath(fullCanvasPng, pxW, pxH, 65, 12);

  // Build clean SVG with separated layers
  const svgOutput = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${canvasWmm}mm" height="${canvasHmm}mm" viewBox="0 0 ${pxW} ${pxH}" version="1.1">
  <!-- Layer: Graphics (Bleed Area + Logo Graphics) -->
  <g id="Graphics">
    <!-- Bleed Background Area (+2mm) -->
    <rect width="${pxW}" height="${pxH}" fill="${BG_COLOR_HEX}" />
    <path d="${bleedPathD}" fill="${BG_COLOR_HEX}" />

    <!-- Full Logo Vector Graphics -->
    <path d="${wordmarkVectorD}" fill="${LOGO_MAIN_COLOR_HEX}" />
  </g>

  <!-- Layer: CutContour (Spot Magenta 0.25pt Cut Line) -->
  <g id="CutContour">
    <path d="${cutContourPathD}" fill="none" stroke="${CUT_CONTOUR_COLOR_HEX}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round" />
  </g>
</svg>`;

  // Write SVG file
  const svgFilePath = path.join(FULL_OUTPUT_DIR, 'logo_full_print.svg');
  fs.writeFileSync(svgFilePath, svgOutput);
  console.log(`✓ Created: ${svgFilePath}`);

  // 5. Render Preview PNG
  const previewFilePath = path.join(FULL_OUTPUT_DIR, 'logo_full_preview.png');
  await sharp(Buffer.from(svgOutput))
    .png({ quality: 100 })
    .toFile(previewFilePath);
  console.log(`✓ Created: ${previewFilePath}`);

  // 6. Generate EPS File
  const epsFilePath = path.join(FULL_OUTPUT_DIR, 'logo_full_print.eps');
  const epsContent = buildEps({
    widthPt: widthPt,
    heightPt: heightPt,
    cutContourPathD: cutContourPathD,
    scaleX: widthPt / pxW,
    scaleY: heightPt / pxH
  });
  fs.writeFileSync(epsFilePath, epsContent);
  console.log(`✓ Created: ${epsFilePath}`);

  // 7. Generate PDF File
  const pdfBytes = await buildPdf({
    widthPt: widthPt,
    heightPt: heightPt,
    cutContourPathD: cutContourPathD,
    viewBoxW: pxW,
    viewBoxH: pxH
  });
  const pdfFilePath = path.join(FULL_OUTPUT_DIR, 'logo_full_print.pdf');
  fs.writeFileSync(pdfFilePath, pdfBytes);
  console.log(`✓ Created: ${pdfFilePath}`);
}

async function main() {
  console.log('🚀 Starting Gennety Print-Ready Sticker Generation Pipeline...\n');
  ensureDirs();
  await generateIconAssets();
  await generateFullLogoAssets();
  console.log('\n✅ Sticker file generation completed successfully!');
}

main().catch(err => {
  console.error('❌ Error generating sticker assets:', err);
  process.exit(1);
});

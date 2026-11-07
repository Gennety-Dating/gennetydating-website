// Builds the /deck slide images from page renders of the investor PDF.
// Usage: node scripts/deck-slides.mjs <dir with slide-NN.jpg renders>
// Renders come from PDFKit (macOS) at 2400 px wide; this writes
// public/deck/slides/slide-NN.webp (2400 px) and slide-NN-thumb.webp (480 px).
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const source = process.argv[2];
if (!source) {
  console.error("usage: node scripts/deck-slides.mjs <render dir>");
  process.exit(1);
}

const target = path.join(process.cwd(), "public/deck/slides");
fs.mkdirSync(target, { recursive: true });

const files = fs.readdirSync(source).filter((name) => /^slide-\d+\.jpg$/.test(name)).sort();
for (const name of files) {
  const base = name.replace(/\.jpg$/, "");
  const input = path.join(source, name);
  await sharp(input).resize(2400).webp({ quality: 82 }).toFile(path.join(target, `${base}.webp`));
  await sharp(input).resize(480).webp({ quality: 70 }).toFile(path.join(target, `${base}-thumb.webp`));
}
console.log(`wrote ${files.length} slides to ${target}`);

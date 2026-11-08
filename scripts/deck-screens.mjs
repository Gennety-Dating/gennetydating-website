// Builds the /deck app screens from iOS simulator captures (1206×2622 PNG).
// Usage: node scripts/deck-screens.mjs <dir with NN-name.png>
// Writes public/deck/screens/NN-name.webp at 600 px wide.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const source = process.argv[2];
if (!source) {
  console.error("usage: node scripts/deck-screens.mjs <capture dir>");
  process.exit(1);
}
const target = path.join(process.cwd(), "public/deck/screens");
fs.mkdirSync(target, { recursive: true });

const files = fs.readdirSync(source).filter((name) => /^\d\d-[a-z0-9-]+\.png$/.test(name)).sort();
for (const name of files) {
  await sharp(path.join(source, name)).resize(600).webp({ quality: 80 }).toFile(path.join(target, name.replace(/\.png$/, ".webp")));
}
console.log(`wrote ${files.length} screens to ${target}`);

/** Imbas public/audio dan tulis manifest.json (kunci → fail). Jalankan: npm run audio:manifest */
import { readdirSync, writeFileSync } from 'node:fs';

const dir = 'public/audio';
const files = readdirSync(dir).filter(f => /\.(mp3|m4a|ogg|wav)$/i.test(f)).sort();
const manifest = Object.fromEntries(files.map(f => [f.replace(/\.[a-z0-9]+$/i, ''), `audio/${f}`]));
writeFileSync(`${dir}/manifest.json`, JSON.stringify(manifest, null, 2) + '\n');
console.log(`manifest.json: ${files.length} rakaman`);

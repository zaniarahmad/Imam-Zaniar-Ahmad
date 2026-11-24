// Usage: node scripts/optimize-ceremony-photos.cjs <path-to-sharp>
const sharp = require(process.argv[2]);
const path = require('node:path');
const fs = require('node:fs/promises');
const source = 'C:/Users/zanah/OneDrive/Desktop/Nikkah Media/nikkah photos';
const photos = [
  ['24619459-c001-4d27-be0e-840de14cf5b7.jpg', 'imam-zaniar-ahmad-nikah-ceremony-stone-pavilion.webp'],
  ['ea261adc-b5bf-429e-ae29-5e498d946fa3.jpg', 'imam-zaniar-ahmad-bride-groom-nikah-ceremony.webp'],
  ['9c193c6d-22ba-49a2-abdd-6db4f2a842c7.jpg', 'imam-zaniar-ahmad-nikah-document-signing.webp'],
];
(async () => {
  for (const [input, output] of photos) {
    const target = path.join(__dirname, '../public/images/imam-zaniar', output);
    const info = await sharp(path.join(source, input)).rotate()
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 }).toFile(target);
    const original = await fs.stat(path.join(source, input));
    console.log(JSON.stringify({ output, width: info.width, height: info.height,
      bytes: info.size, originalBytes: original.size }));
  }
})().catch(error => { console.error(error.message); process.exitCode = 1; });

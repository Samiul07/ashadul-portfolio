const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, '../public/images/brands');
const pngFiles = ['brand-09-keukenglas@2x.png', 'brand-10-speak@2x.png', 'brand-15-tante-alma@2x.png'];

async function processPngs() {
  for (const file of pngFiles) {
    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) {
      console.log('Not found:', file);
      continue;
    }

    const image = sharp(filePath);
    const { width, height, channels } = await image.metadata();

    // Get raw RGBA pixel buffer
    const rawBuffer = await image.ensureAlpha().raw().toBuffer();

    // Iterate through pixels and set alpha=0 for black/near-black background pixels (R,G,B < 45)
    for (let i = 0; i < rawBuffer.length; i += 4) {
      const r = rawBuffer[i];
      const g = rawBuffer[i + 1];
      const b = rawBuffer[i + 2];

      if (r < 45 && g < 45 && b < 45) {
        rawBuffer[i + 3] = 0; // set alpha to 0 (fully transparent)
      }
    }

    // Save modified RGBA buffer back to PNG
    await sharp(rawBuffer, {
      raw: {
        width,
        height,
        channels: 4,
      },
    })
      .png()
      .toFile(filePath + '.tmp');

    fs.renameSync(filePath + '.tmp', filePath);
    console.log('Processed transparent PNG:', file);
  }
}

processPngs().catch(console.error);

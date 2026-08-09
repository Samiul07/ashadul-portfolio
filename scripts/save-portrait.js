/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require('fs');
const path = require('path');

const srcPath = "C:\\Users\\ashad\\.gemini\\antigravity\\brain\\0bd39837-01bc-46f7-aa96-767409c89ec4\\.system_generated\\steps\\666\\output.txt";
const destDir = path.join(__dirname, '..', 'public', 'images');
const destPath = path.join(destDir, 'magnific-portrait.png');

try {
  const fileContent = fs.readFileSync(srcPath, 'utf8');
  const json = JSON.parse(fileContent);
  const base64Data = json.result.base64;
  
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  const buffer = Buffer.from(base64Data, 'base64');
  fs.writeFileSync(destPath, buffer);
  console.log('Image successfully saved to ' + destPath);
} catch (error) {
  console.error('Error saving image:', error);
}

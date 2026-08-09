const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../public/images/brands');
fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.svg')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const originalLen = content.length;
    // Remove rect fill="#1E1E1E" and rect fill="black"
    content = content.replace(/<rect[^>]*fill="#1E1E1E"[^>]*\/>/gi, '');
    content = content.replace(/<rect[^>]*fill="black"[^>]*\/>/gi, '');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Cleaned ${file}: reduced from ${originalLen} to ${content.length} bytes`);
  }
});

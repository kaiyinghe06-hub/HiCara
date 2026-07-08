const fs = require('fs');

const fontsCss = fs.readFileSync('fonts-inlined.css', 'utf8');
const html = fs.readFileSync('index.html', 'utf8');

const updatedHtml = html.replace('<style>', '<style>' + fontsCss + '\n');

fs.writeFileSync('index.html', updatedHtml);
console.log('Merged fonts into index.html');

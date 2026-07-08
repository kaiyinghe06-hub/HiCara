const fs = require('fs');

const gaegu = fs.readFileSync('fonts/gaegu-v23-latin-regular.woff2').toString('base64');
const caveat = fs.readFileSync('fonts/caveat-v23-latin-regular.woff2').toString('base64');
const pacifico = fs.readFileSync('fonts/pacifico-v23-latin-regular.woff2').toString('base64');
const noto = fs.readFileSync('fonts/noto-sans-sc-v40-latin-regular.woff2').toString('base64');

const css = `@font-face {
    font-family: 'Gaegu';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(data:font/woff2;base64,${gaegu}) format('woff2');
}

@font-face {
    font-family: 'Caveat';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(data:font/woff2;base64,${caveat}) format('woff2');
}

@font-face {
    font-family: 'Pacifico';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(data:font/woff2;base64,${pacifico}) format('woff2');
}

@font-face {
    font-family: 'Noto Sans SC';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(data:font/woff2;base64,${noto}) format('woff2');
}`;

fs.writeFileSync('fonts-inlined.css', css);
console.log('Generated fonts-inlined.css');

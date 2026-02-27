const fs = require('fs');

const themeScript = `// theme.js
(function() {
  const savedTheme = localStorage.getItem('app-theme') || 'default';
  if(savedTheme !== 'default') {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
})();
`;
fs.writeFileSync('theme.js', themeScript);

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));
let count = 0;
files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (!content.includes('theme.js')) {
        const updated = content.replace('</head>', '  <script src="./theme.js"></script>\n</head>');
        fs.writeFileSync(file, updated);
        count++;
    }
});
console.log('Injected theme.js into ' + count + ' HTML files.');

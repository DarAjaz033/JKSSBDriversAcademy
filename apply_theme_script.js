const fs = require('fs');
const path = require('path');

const inlineScript = `
  <script>
    (function () {
      const savedTheme = localStorage.getItem('siteTheme') || 'default';
      if (savedTheme !== 'default') {
        document.documentElement.setAttribute('data-theme', savedTheme);
      }
      const themeColors = {
        'default': '#B45309',
        'green': '#047857',
        'blue': '#1E40AF',
        'golden': '#AA8A2E',
        'black': '#000000',
        'frost': '#E0F2FE'
      };
      const color = themeColors[savedTheme] || '#B45309';
      let meta = document.querySelector('meta[name="theme-color"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'theme-color';
        document.head.appendChild(meta);
      }
      meta.content = color;
    })();
  </script>
`;

// Helper to walk directories
function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            if (f !== 'node_modules' && f !== 'dist' && !f.startsWith('.')) {
                walkDir(dirPath, callback);
            }
        } else {
            if (f.endsWith('.html')) {
                callback(dirPath);
            }
        }
    });
}

walkDir(__dirname, (filePath) => {
    let content = fs.readFileSync(filePath, 'utf-8');
    let originalContent = content;

    // 1. Remove any existing inline theme scripts (to avoid duplicates)
    content = content.replace(/<script>\s*\(\s*function\s*\(\)\s*\{\s*const savedTheme = localStorage\.getItem\('siteTheme'\)[\s\S]*?<\/script>/gi, '');

    // 2. Remove existing <meta name="theme-color" ...> tags if any
    content = content.replace(/<meta\s+name=["']theme-color["'].*?>/gi, '');

    // 3. Inject new script + meta tag right after <head>
    const injection = `\n  <meta name="theme-color" content="#B45309">\n${inlineScript}`;

    if (content.includes('<head>')) {
        content = content.replace('<head>', `<head>${injection}`);
    }

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log('Updated:', filePath);
    }
});

console.log('Done injecting scripts.');

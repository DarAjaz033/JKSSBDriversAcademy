const fs = require('fs');

const legalFiles = [
    'contact.html',
    'privacy-policy.html',
    'terms-and-conditions.html',
    'refund-policy.html',
    'about.html'
];

const scriptHtml = `
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

legalFiles.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf-8');

        // Only inject if it doesn't already have it
        if (!content.includes('localStorage.getItem(\'siteTheme\')')) {
            // Find the <head> tag
            content = content.replace(/<head>/i, `<head>\n${scriptHtml}`);
            fs.writeFileSync(file, content, 'utf-8');
            console.log(\`Injected theme script into \${file}\`);
    } else {
      console.log(\`\${file} already has theme script\`);
    }
  }
});

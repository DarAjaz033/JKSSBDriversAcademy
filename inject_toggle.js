const fs = require('fs');
const path = require('path');

const toggleBtnHtml = `
          <button class="icon-btn theme-toggle-nav" id="theme-toggle-nav"
            style="width: 32px; height: 32px; margin-left: auto; border: none; background: transparent; backdrop-filter: none; box-shadow: none; display: flex !important; flex-shrink: 0;">
            <i data-lucide="palette" style="width: 18px; height: 18px; color: var(--app-bar-text);"></i>
          </button>
`;

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        if (fs.statSync(dirPath).isDirectory()) {
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

    // Add the toggle button into the .app-bar-title if it's not already there
    if (content.includes('class="app-bar-title"') && !content.includes('id="theme-toggle-nav"')) {
        content = content.replace(/(<div class="app-bar-title"[^>]*>[\s\S]*?)(<\/div>)/i, `$1${toggleBtnHtml}$2`);
    }

    // Same for standalone navbars that might just use the logo-text / logo-wrap, but the user specifies "top navbar title bar" -> which is .app-bar-title.

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log('Added toggle to:', filePath);
    }
});

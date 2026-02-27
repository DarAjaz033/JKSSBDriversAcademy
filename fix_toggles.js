const fs = require('fs');
const path = require('path');

const toggleBtnHtml = `
          <button class="icon-btn theme-toggle-nav" id="theme-toggle-nav"
            style="width: 32px; height: 32px; margin-left: auto; border: none; background: transparent; backdrop-filter: none; box-shadow: none; display: flex !important; flex-shrink: 0;">
            <i data-lucide="palette" style="width: 18px; height: 18px; color: var(--app-bar-text);"></i>
          </button>
        </div>`;

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

    // 1. Strip out ANY existing theme-toggle-nav buttons to clean up mistakes
    content = content.replace(/<button[^>]*id="theme-toggle-nav"[^>]*>[\s\S]*?<\/button>\s*/gi, '');

    // 2. Fix the broken </div> tags in the logo-circle from the user's manual mis-paste
    // The user pasted it before the </div> of logo circle, or deleted the </div> of logo circle
    // We need to ensure .app-bar-title has proper closing.
    // Actually, let's just do a clean regex matching the .app-bar-title block

    // 3. Inject the correct button right before the closing </div> of .app-bar-title
    // We know it ends with </div>. We look for <div class="app-bar-title">...</div>
    content = content.replace(/(<div class="app-bar-title"(?:(?!<div class="app-bar-title")[\s\S])*?)<\/div>/gi, function (match, p1) {
        if (p1.includes('theme-toggle-nav')) return match; // Already exists
        return p1 + toggleBtnHtml;
    });

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log('Fixed toggle in:', filePath);
    }
});
console.log('Done repairing toggles!');

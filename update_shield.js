const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\insha\\jkssbtab';

function processDirectory(directory) {
    const files = fs.readdirSync(directory);
    for (const file of files) {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            if (['dist', 'node_modules', '.git', '.firebase', '.gemini'].includes(file)) continue;
            processDirectory(fullPath);
        } else if (file.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let newContent = content;

            // Replace standard logo-circle with shield-check
            // Some files have <i data-lucide="shield-check" width="24" height="24"></i>
            // Some have <i data-lucide="shield-check"></i>
            // Some have <i data-lucide="shield-check" width="22" height="22"></i>
            const searchPattern = /<div class="logo-circle">\s*<i data-lucide="shield-check"[^>]*><\/i>\s*<\/div>/g;
            const replaceContent = `<div class="logo-circle" style="background: none; padding: 0;">\n            <img src="./favicon.svg" alt="Logo" style="width: 32px; height: 32px; object-fit: contain;">\n          </div>`;

            newContent = newContent.replace(searchPattern, replaceContent);

            // Also ensure the title says "JKSSB Drivers Academy" next to it
            newContent = newContent.replace(/<span id="page-title">JKSSB Academy<\/span>/g, '<span id="page-title">JKSSB Drivers Academy</span>');

            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent);
                console.log('Updated shield-check in: ' + fullPath);
            }
        }
    }
}

try {
    processDirectory(dir);
    console.log('Done replacing app-bar logos.');
} catch (e) {
    console.error(e);
}

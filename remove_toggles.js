const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        if (fs.statSync(dirPath).isDirectory()) {
            if (f !== 'node_modules' && f !== 'dist' && !f.startsWith('.')) {
                walkDir(dirPath, callback);
            }
        } else {
            if (f.endsWith('.html')) {
                callback(dirPath, f);
            }
        }
    });
}

walkDir(__dirname, (filePath, fileName) => {
    if (fileName === 'index.html') return; // Keep toggle on home page

    let content = fs.readFileSync(filePath, 'utf-8');
    let originalContent = content;

    // Remove the toggle button block
    content = content.replace(/<button[^>]*id="theme-toggle-nav"[^>]*>[\s\S]*?<\/button>\s*/gi, '');

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log('Removed toggle from:', fileName);
    }
});
console.log('Finished removing toggles from non-home pages.');

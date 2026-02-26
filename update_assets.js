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
        } else if (file.endsWith('.html') || file.endsWith('.ts') || file.endsWith('.js') || file.endsWith('.css')) {
            if (file === 'update_assets.js') continue;

            let content = fs.readFileSync(fullPath, 'utf8');
            let newContent = content;

            // Normalize favicons and logos
            newContent = newContent.replace(/favicon\.PNG/gi, 'favicon.svg');
            newContent = newContent.replace(/logo\.png/gi, 'favicon.svg');

            // Ensure type is svg+xml for html links
            newContent = newContent.replace(/type="image\/png"\s+href="\.\/favicon\.svg"/g, 'type="image/svg+xml" href="./favicon.svg"');

            // Replace name
            newContent = newContent.replace(/JKSSB Drivers Academy/g, 'TEMP_PLACEHOLDER');
            newContent = newContent.replace(/JKSSB Academy/g, 'JKSSB Drivers Academy');
            newContent = newContent.replace(/TEMP_PLACEHOLDER/g, 'JKSSB Drivers Academy');

            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent);
                console.log('Updated: ' + fullPath);
            }
        }
    }
}

try {
    processDirectory(dir);
    console.log('Done replacing assets.');
} catch (e) {
    console.error(e);
}

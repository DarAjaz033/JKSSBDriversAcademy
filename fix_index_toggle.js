const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf-8');

const toggleBtnHtml = `
          <button class="icon-btn theme-toggle-nav" id="theme-toggle-nav"
            style="width: 32px; height: 32px; margin-left: auto; border: none; background: transparent; backdrop-filter: none; box-shadow: none; display: flex !important; flex-shrink: 0;">
            <i data-lucide="palette" style="width: 18px; height: 18px; color: var(--app-bar-text);"></i>
          </button>
`;

// Remove the existing broken toggle anywhere inside app-bar-title
content = content.replace(/<button[^>]*id="theme-toggle-nav"[^>]*>[\s\S]*?<\/button>\s*/g, '');

// Clean up the structure and add toggle right after the page-title
// The current structure in index.html is:
// <div class="app-bar-title">
//             <div class="logo-circle" style="background: none; padding: 0;">
//     <img src="./favicon.svg" alt="Logo" style="width: 32px; height: 32px; object-fit: contain;">
//   </div>
//   <span id="page-title">JKSSB Drivers Academy</span>
// </div>

content = content.replace(/<div class="app-bar-title">([\s\S]*?)<span id="page-title">JKSSB Drivers Academy<\/span>\s*<\/div>/,
  `<div class="app-bar-title">$1<span id="page-title">JKSSB Drivers Academy</span>${toggleBtnHtml}        </div>`
);

fs.writeFileSync('index.html', content, 'utf-8');
console.log('Fixed index.html toggle position (to the right)');

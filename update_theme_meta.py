import os
import re

theme_script = """  <script>
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
        'black': '#0A0A0A',
        'frost': '#E0F2FE'
      };
      document.write('<meta name="theme-color" content="' + (themeColors[savedTheme] || '#B45309') + '">');
    })();
  </script>"""

def update_html_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # If the script is already there, don't double inject
    if 'themeColors' in content and 'document.write(\'<meta name="theme-color"' in content:
        # Check if it has the updated frost theme
        if "'frost': '#E0F2FE'" in content:
            return False
        else:
            # Replace old version with new version
            print(f"Updating old theme script in {filepath}")
            # Simplified regex to find the script block
            content = re.sub(r'<script>\s*\(function\s*\(\)\s*\{.*?themeColors.*?\}\)\(\);\s*</script>', theme_script, content, flags=re.DOTALL)
    
    # Try to find existing theme-color meta or head
    if '<meta name="theme-color"' in content:
        content = re.sub(r'<meta name="theme-color" content=".*?>', '', content)
    
    # Inject after <head> or at the top of head
    if '<head>' in content:
        content = content.replace('<head>', '<head>\n' + theme_script)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    return True

html_files = []
for root, dirs, files in os.walk('.'):
    if 'node_modules' in dirs: dirs.remove('node_modules')
    if 'dist' in dirs: dirs.remove('dist')
    if '.git' in dirs: dirs.remove('.git')
    for file in files:
        if file.endswith('.html'):
            html_files.append(os.path.join(root, file))

for html_file in html_files:
    try:
        if update_html_file(html_file):
            print(f"Processed {html_file}")
    except Exception as e:
        print(f"Error processing {html_file}: {e}")

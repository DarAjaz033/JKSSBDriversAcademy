$newScript = @"
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
        'black': '#0A0A0A',
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
"@

$htmlFiles = Get-ChildItem -Path . -Filter *.html -Recurse | Where-Object { $_.FullName -notmatch "node_modules|dist" }

foreach ($file in $htmlFiles) {
    if ($file.Name -eq "index.html") {
        continue
    }
    
    $content = Get-Content $file.FullName -Raw
    
    # Try to find existing theme script first
    if ($content -match "(?s)<script>.*?siteTheme.*?</script>") {
        $content = [regex]::Replace($content, "(?s)<script>.*?siteTheme.*?</script>", $newScript)
        Set-Content $file.FullName $content
        Write-Host "Updated $($file.FullName)"
    }
    # Otherwise inject into head
    elseif ($content -match "<head>") {
        $content = $content -replace "<head>", "<head>`n$newScript"
        Set-Content $file.FullName $content
        Write-Host "Injected $($file.FullName)"
    }
}

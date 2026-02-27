// theme.js
(function() {
  const savedTheme = localStorage.getItem('app-theme') || 'default';
  if(savedTheme !== 'default') {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
})();

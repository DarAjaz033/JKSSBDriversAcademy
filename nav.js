/**
 * nav.js — Universal Bottom Navigation + Page Transitions + Toast System
 * Include on every page: <script src="./nav.js"></script>
 * Auto-skips: pdf-viewer.html, video-viewer.html, admin*.html, login.html
 */
(function () {
  'use strict';

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  // Pages that should NOT get the bottom nav
  const SKIP_PAGES = ['pdf-viewer.html', 'video-viewer.html', 'login.html',
    'admin-login.html', 'admin-dashboard.html', 'admin-courses.html',
    'admin-pdfs.html', 'admin-tests.html', 'admin-purchases.html'];

  const skipNav = SKIP_PAGES.some(p => currentPage === p || currentPage.startsWith('admin'));

  // ── Tab definitions ──────────────────────────────────────────────────────────
  const TABS = [
    {
      id: 'nav-home', href: './index.html', label: 'Home',
      match: ['index.html', ''],
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
               <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
               <polyline points="9 22 9 12 15 12 15 22"/>
             </svg>`
    },
    {
      id: 'nav-courses', href: './my-courses.html', label: 'Courses',
      match: ['my-courses.html', 'course-details.html', 'full-course.html', 'part-1.html', 'part-2.html', 'part-3.html', 'course-purchase.html'],
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
               <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
             </svg>`
    },
    {
      id: 'nav-tests', href: './mock-tests.html', label: 'Tests',
      match: ['mock-tests.html', 'practice-test.html'],
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
               <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
               <rect x="9" y="3" width="6" height="4" rx="2"/><path d="m9 12 2 2 4-4"/>
             </svg>`
    },
    {
      id: 'nav-pdfs', href: './gk-pdfs.html', label: 'PDFs',
      match: ['gk-pdfs.html', 'demo-pdfs.html'],
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
               <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
               <polyline points="14 2 14 8 20 8"/>
             </svg>`
    },
    {
      id: 'nav-profile', href: './profile.html', label: 'Profile',
      match: ['profile.html'],
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="22" height="22">
               <circle cx="12" cy="8" r="4"/>
               <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
             </svg>`
    }
  ];

  // ── Active tab detection ─────────────────────────────────────────────────────
  function getActiveId() {
    for (const tab of TABS) {
      if (tab.match.includes(currentPage)) return tab.id;
    }
    return '';
  }

  // ── Inject global styles ─────────────────────────────────────────────────────
  function injectStyles() {
    if (document.getElementById('nav-global-styles')) return;
    const s = document.createElement('style');
    s.id = 'nav-global-styles';
    s.textContent = `
      /* ── Page enter animation ───────────────────── */
      #app, .profile-screen, .auth-wrapper {
        animation: navPageEnter 0.28s cubic-bezier(0.16,1,0.3,1) both;
        will-change: opacity, transform;
      }
      @keyframes navPageEnter {
        from { opacity:0; transform:translateY(10px); }
        to   { opacity:1; transform:translateY(0); }
      }
      @keyframes navPageLeave {
        from { opacity:1; transform:translateY(0); }
        to   { opacity:0; transform:translateY(-6px); }
      }

      /* ── Bottom nav ────────────────────────────── */
      #unav {
        position: fixed;
        bottom:0; left:0; right:0;
        z-index: 9000;
        height: 60px;
        background: rgba(255,255,255,0.96);
        backdrop-filter: blur(18px);
        -webkit-backdrop-filter: blur(18px);
        border-top: 1px solid rgba(180,83,9,0.1);
        display: flex;
        align-items: stretch;
        box-shadow: 0 -2px 16px rgba(0,0,0,0.07);
        padding-bottom: env(safe-area-inset-bottom, 0);
        will-change: transform;
      }
      body { padding-bottom: calc(60px + env(safe-area-inset-bottom, 0px)) !important; }
      .unav-btn {
        flex: 1;
        display: flex; flex-direction: column;
        align-items: center; justify-content: center;
        gap: 2px;
        text-decoration: none;
        color: #9ca3af;
        padding: 6px 2px 5px;
        position: relative;
        border: none; background: none; cursor: pointer;
        -webkit-tap-highlight-color: transparent;
        transition: color 0.18s;
      }
      .unav-btn:hover { color: #b45309; }
      .unav-btn.active { color: #c85d10; }
      .unav-btn.active svg { transform: scale(1.08); stroke: #c85d10; }
      .unav-btn svg { transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1); }
      .unav-lbl {
        font-size: 9.5px; font-weight: 700;
        font-family: 'Poppins', system-ui, sans-serif;
        letter-spacing: 0.1px; line-height: 1;
      }
      .unav-pip {
        position: absolute; bottom: 4px; left: 50%;
        transform: translateX(-50%);
        width: 3px; height: 3px; border-radius: 50%;
        background: #c85d10;
      }

      /* ── Toast ─────────────────────────────────── */
      #app-toast-wrap {
        position: fixed;
        top: 64px; left: 50%;
        transform: translateX(-50%);
        z-index: 99999;
        display: flex; flex-direction: column;
        align-items: center; gap: 8px;
        pointer-events: none;
        width: min(92vw, 380px);
      }
      .app-toast-el {
        padding: 13px 20px;
        border-radius: 14px;
        font-size: 13px; font-weight: 600;
        font-family: 'Poppins', system-ui, sans-serif;
        color: white; text-align: center;
        backdrop-filter: blur(20px);
        box-shadow: 0 8px 28px rgba(0,0,0,0.18);
        pointer-events: all;
        animation: toastSlide 0.38s cubic-bezier(0.34,1.56,0.64,1) both;
        will-change: opacity, transform;
      }
      @keyframes toastSlide {
        from { opacity:0; transform:translateY(-14px) scale(0.92); }
        to   { opacity:1; transform:translateY(0) scale(1); }
      }
      @keyframes toastFadeOut {
        to { opacity:0; transform:translateY(-8px); }
      }
      .app-toast-el.success { background: rgba(16,185,129,0.92); }
      .app-toast-el.error   { background: rgba(239,68,68,0.90); }
      .app-toast-el.info    { background: rgba(180,83,9,0.92); }

      /* ── Performance ────────────────────────────── */
      * { -webkit-tap-highlight-color: transparent; }
      img { loading: lazy; }
    `;
    document.head.appendChild(s);
  }

  // ── Build and inject bottom nav ──────────────────────────────────────────────
  function injectNav() {
    if (skipNav || document.getElementById('unav')) return;
    const active = getActiveId();
    const nav = document.createElement('nav');
    nav.id = 'unav';
    nav.setAttribute('role', 'navigation');
    nav.setAttribute('aria-label', 'Main navigation');
    nav.innerHTML = TABS.map(t => `
      <a href="${t.href}" class="unav-btn${t.id === active ? ' active' : ''}"
         id="${t.id}" aria-label="${t.label}" data-href="${t.href}">
        ${t.icon}
        <span class="unav-lbl">${t.label}</span>
        ${t.id === active ? '<div class="unav-pip"></div>' : ''}
      </a>`).join('');
    document.body.appendChild(nav);

    // Intercept nav clicks for smooth exit transition
    nav.querySelectorAll('a').forEach(a => {
      // Preload on hover/touch
      a.addEventListener('mouseenter', () => prefetch(a.dataset.href), { once: true });
      a.addEventListener('touchstart', () => prefetch(a.dataset.href), { passive: true, once: true });
      a.addEventListener('click', e => {
        if (a.classList.contains('active')) { e.preventDefault(); return; }
        e.preventDefault();
        smoothNavigate(a.dataset.href || a.href);
      });
    });
  }

  // ── Toast system ─────────────────────────────────────────────────────────────
  function ensureToastWrap() {
    if (!document.getElementById('app-toast-wrap')) {
      const w = document.createElement('div');
      w.id = 'app-toast-wrap';
      document.body.appendChild(w);
    }
    return document.getElementById('app-toast-wrap');
  }

  window.showAppToast = function (msg, type, duration) {
    type = type || 'info';
    duration = duration || 3000;
    const wrap = ensureToastWrap();
    const el = document.createElement('div');
    el.className = 'app-toast-el ' + type;
    el.textContent = msg;
    wrap.appendChild(el);
    setTimeout(() => {
      el.style.animation = 'toastFadeOut 0.3s ease forwards';
      setTimeout(() => el.remove(), 300);
    }, duration);
  };

  // ── Smooth page-exit then navigate ────────────────────────────────────────────
  window.smoothNavigate = function (href) {
    if (!href) return;
    const app = document.getElementById('app') || document.querySelector('main') || document.body;
    app.style.animation = 'navPageLeave 0.15s ease forwards';
    setTimeout(() => { window.location.href = href; }, 140);
  };

  // ── Prefetch pages for instant navigation ─────────────────────────────────────
  const prefetched = new Set();
  function prefetch(href) {
    if (!href || prefetched.has(href)) return;
    prefetched.add(href);
    const l = document.createElement('link');
    l.rel = 'prefetch'; l.href = href;
    document.head.appendChild(l);
  }

  // Also intercept ALL internal anchor clicks sitewide for smooth transitions
  document.addEventListener('click', function (e) {
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href');
    // Only handle internal .html links that aren't already handled, no anchors, no external
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')
      || href.startsWith('tel') || a.target === '_blank') return;
    // Skip PDF links — they go to pdf-viewer.html which IS an internal page
    // Skip if onclick already set
    if (a.hasAttribute('onclick') && a.getAttribute('onclick') !== '') return;
    e.preventDefault();
    // Skip transition for same page
    const target = href.split('?')[0].split('/').pop();
    if (target === currentPage) return;
    prefetch(href);
    smoothNavigate(href);
  }, true); // capture phase

  // ── Check sessionStorage for post-login toast ──────────────────────────────
  function checkToast() {
    try {
      const msg = sessionStorage.getItem('app_toast_msg');
      const type = sessionStorage.getItem('app_toast_type') || 'success';
      if (msg) {
        sessionStorage.removeItem('app_toast_msg');
        sessionStorage.removeItem('app_toast_type');
        // Delay slightly so page has rendered
        setTimeout(() => window.showAppToast(msg, type, 3500), 500);
      }
    } catch { }
  }

  // ── Prefetch likely-next pages ──────────────────────────────────────────────
  function prefetchCommon() {
    ['./index.html', './profile.html', './mock-tests.html', './gk-pdfs.html']
      .forEach(p => prefetch(p));
  }

  // ── Init ────────────────────────────────────────────────────────────────────
  function init() {
    injectStyles();
    if (!skipNav) injectNav();
    ensureToastWrap();
    checkToast();
    setTimeout(prefetchCommon, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

import"./firebase-config-D0UifA0H.js";/* empty css               */import"./global-pdf-viewer-Bl9busOb.js";import{o as v}from"./auth-service-By807CDz.js";import{f as x,g as f,b,d as w}from"./admin-service-BQGa3a-U.js";let k=0;function y(){return++k}class C{constructor(){this.coursesContainer=document.querySelector("#courses-content"),this.injectStyles(),this.init()}injectStyles(){if(document.getElementById("mc-styles"))return;const e=document.createElement("style");e.id="mc-styles",e.textContent=`
      /* page wrapper — 1 col stack */
      #courses-content {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 14px 13px 30px;
        background: transparent;
      }
      
      /* Wrapper to hold courses + sliding views */
      .mc-wrapper {
        position: relative;
        width: 100%;
        overflow-x: hidden;
      }
      .mc-courses-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
        transition: transform 0.3s ease, opacity 0.3s ease;
      }
      .mc-courses-list.hidden {
        transform: translateX(-50%);
        opacity: 0;
        pointer-events: none;
        position: absolute;
        width: 100%;
      }

      /* ── Card shell ── */
      .mc-card {
        border-radius: 20px;
        overflow: hidden;
        box-shadow: var(--shadow-lg);
        animation: mcUp 0.4s cubic-bezier(0.16,1,0.3,1) both;
        background: var(--bg-card);
        border: 1px solid var(--border);
      }
      @keyframes mcUp {
        from { opacity:0; transform:translateY(20px) scale(0.96); }
        to   { opacity:1; transform:translateY(0)    scale(1); }
      }

      /* ── Gradient face ── */
      .mc-face {
        position: relative;
        min-height: 175px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 16px 13px 14px;
        overflow: hidden;
        /* dynamic gradient based on theme */
        background: var(--gradient-hero, linear-gradient(135deg, #B45309 0%, #D97706 50%, #EA580C 100%));
      }

      /* decorative circles */
      .mc-face::before {
        content:'';
        position:absolute;
        width:120px; height:120px;
        border-radius:50%;
        background:rgba(255,255,255,0.07);
        top:-40px; right:-30px;
        pointer-events:none;
      }
      .mc-face::after {
        content:'';
        position:absolute;
        width:75px; height:75px;
        border-radius:50%;
        background:rgba(255,255,255,0.08); /* light circle */
        bottom:-18px; left:-18px;
        pointer-events:none;
      }

      /* enrolled pill */
      .mc-enrolled {
        position: absolute;
        top: 10px; right: 10px;
        z-index: 2;
        font-size: 9px;
        font-weight: 700;
        letter-spacing: 0.4px;
        color: #fff;
        background: rgba(255,255,255,0.18);
        border: 1px solid rgba(255,255,255,0.35);
        border-radius: 99px;
        padding: 2px 8px;
        backdrop-filter: blur(6px);
      }

      /* icon bubble */
      .mc-icon {
        width: 40px; height: 40px;
        border-radius: 12px;
        background: rgba(255,255,255,0.18);
        border: 1.5px solid rgba(255,255,255,0.28);
        display: flex; align-items: center; justify-content: center;
        color: #fff;
        flex-shrink: 0;
        position: relative; z-index: 1;
        margin-bottom: 8px;
        backdrop-filter: blur(4px);
      }

      /* course title */
      .mc-title {
        font-size: 13.5px;
        font-weight: 700;
        color: #fff;
        line-height: 1.38;
        text-shadow: 0 1px 4px rgba(0,0,0,0.2);
        margin: 0 0 13px;
        position: relative; z-index: 1;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      /* ── two action buttons stacked ── */
      .mc-btns {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        position: relative; z-index: 1;
        margin-top: auto;
      }
      .mc-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 10px;
        border: 1.5px solid rgba(255,255,255,0.25);
        border-radius: 12px;
        background: rgba(255,255,255,0.12);
        backdrop-filter: blur(8px);
        color: #fff;
        font-family: 'Poppins', system-ui, sans-serif;
        font-size: 11.5px;
        font-weight: 600;
        cursor: pointer;
        transition: background .18s, border-color .18s, transform .13s;
        -webkit-tap-highlight-color: transparent;
        user-select: none;
        width: 100%;
      }
      .mc-btn:hover  { background:rgba(255,255,255,0.22); border-color:rgba(255,255,255,0.5); }
      .mc-btn:active { transform:scale(0.95); }
      
      /* Theme-aware button accents */
      .mc-btn-icon-pdf {
        width: 22px; height: 22px;
        background: #ef4444; /* PDF Red */
        border-radius: 6px;
        display: flex; align-items: center; justify-content: center;
        color: #fff;
        box-shadow: 0 2px 5px rgba(239,68,68,0.3);
      }
      .mc-btn-icon-quiz {
        width: 22px; height: 22px;
        background: #22c55e; /* Quiz Green */
        border-radius: 6px;
        display: flex; align-items: center; justify-content: center;
        color: #fff;
        box-shadow: 0 2px 5px rgba(34,197,94,0.3);
      }

      .mc-btn-lbl    { flex:1; text-align: left; }
      .mc-chev       { margin-left:auto; flex-shrink:0; transition:transform .24s; }

      /* ── Content View (slides in from right) ── */
      .mc-content-view {
        position: absolute;
        top: 0; left: 0; right: 0;
        background: transparent;
        transform: translateX(100%);
        opacity: 0;
        visibility: hidden;
        transition: transform 0.3s ease, opacity 0.3s ease, visibility 0.3s;
        z-index: 10;
        min-height: 400px;
      }
      .mc-content-view.active {
        transform: translateX(0);
        opacity: 1;
        visibility: visible;
        position: relative;
      }
      
      .mc-view-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 16px;
      }
      
      .mc-btn-back {
        width: 36px; height: 36px;
        border-radius: 50%;
        background: var(--bg-card);
        border: 1px solid var(--border);
        display: flex; align-items: center; justify-content: center;
        color: var(--text-primary);
        box-shadow: var(--shadow-sm);
        cursor: pointer;
        padding: 0;
        transition: transform 0.2s, background 0.2s;
      }
      .mc-btn-back:active { transform: scale(0.9); opacity: 0.8; }
      
      .mc-view-title {
        font-size: 16px;
        font-weight: 700;
        color: var(--text-primary);
        margin: 0;
      }

      /* ── Items in view list ── */
      .mc-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        border-radius: 12px;
        background: var(--bg-card);
        border: 1px solid var(--border);
        text-decoration: none;
        color: var(--text-primary);
        font-size: 12px;
        font-weight: 500;
        transition: background .14s, border-color .14s, transform .14s;
        box-shadow: var(--shadow-sm);
        line-height: 1.4;
        margin-bottom: 10px;
      }
      .mc-item:hover { background: var(--bg-app); border-color: var(--primary); transform: translateX(2px); }

      .mc-ico-pdf {
        width: 32px; height: 32px; border-radius: 8px; flex-shrink: 0;
        background: linear-gradient(135deg, #fee2e2, #ef4444);
        display: flex; align-items: center; justify-content: center; color: #fff;
      }
      .mc-ico-quiz {
        width: 32px; height: 32px; border-radius: 8px; flex-shrink: 0;
        background: linear-gradient(135deg, #dcfce7, #22c55e);
        display: flex; align-items: center; justify-content: center; color: #fff;
      }
      .mc-item-txt   { flex: 1; word-break: break-word; }
      .mc-item-badge {
        font-size: 10px; color: #fff; background: var(--primary);
        padding: 2px 8px; border-radius: 99px; font-weight: 600;
        flex-shrink: 0; white-space: nowrap;
      }

      .mc-none {
        text-align: center; color: var(--text-tertiary); font-size: 13px; padding: 24px 0;
        background: var(--bg-card); border-radius: 12px; border: 1px dashed var(--border);
      }

      /* loading / empty spans full */
      .mc-full { width: 100%; }

      /* Dark mode specifics for item lists */
      [data-theme="dark"] .mc-ico-pdf, [data-theme="dark"] .mc-ico-quiz { box-shadow: 0 4px 12px rgba(0,0,0,0.3); }
      [data-theme="dark"] .mc-item { background: rgba(255,255,255,0.05); }
    `,document.head.appendChild(e)}async init(){v(async e=>{e?await this.loadEnrolledCourses(e.uid):this.showEmptyState("Sign In Required","Please sign in to view your enrolled courses.","Go to Home","./index.html")},!0)}async loadEnrolledCourses(e){this.coursesContainer.innerHTML=`
      <div class="skeleton-card" style="margin-bottom: var(--spacing-md);"><div class="skeleton skeleton-img"></div><div style="padding-top:12px;"><div class="skeleton skeleton-title"></div><div class="skeleton skeleton-text"></div></div></div>
      <div class="skeleton-card" style="margin-bottom: var(--spacing-md);"><div class="skeleton skeleton-img"></div><div style="padding-top:12px;"><div class="skeleton skeleton-title"></div><div class="skeleton skeleton-text"></div></div></div>
    `;const t=await x(e),o=t.success?t.enrolledIds:[];if(o.length===0){this.showEmptyState("No Enrolled Courses","You have no active enrolled courses. Browse courses to get started. If you recently purchased, please wait a minute and refresh.","Browse Courses","./course-details.html");return}const i=await f(),n=(i.success&&"courses"in i&&i.courses?i.courses:[]).filter(r=>r.id&&o.includes(r.id));if(n.length===0){this.showEmptyState("No Enrolled Courses","No enrolled courses found. Course data may have changed — browse to find new courses.","Browse Courses","./course-details.html");return}const a=await b(),p=a.success&&a.pdfs?a.pdfs:[],c=[],l=[];for(const r of n){const s=p.filter(m=>r.pdfIds?.includes(m.id)),h=await w(r.id),g=h.success&&h.tests?h.tests:[],u=this.buildCardWithViews(r,s,g);c.push(u.card),l.push(u.views)}this.coursesContainer.innerHTML=`
      <div class="mc-wrapper">
        <div class="mc-courses-list" id="mc-courses-list">
          ${c.join("")}
        </div>
        ${l.join("")}
      </div>
    `,this.attachListeners()}buildCardWithViews(e,t,o){const i=y(),d=`mc-view-pdf-${i}`,n=`mc-view-quiz-${i}`,a=this.categoryIcon(e.category??""),p=t.length>0?t.map(s=>`
          <a href="./pdf-viewer.html?name=${encodeURIComponent(s.name)}&url=${encodeURIComponent(s.url)}" class="mc-item">
            <span class="mc-ico-pdf">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
            </span>
            <span class="mc-item-txt">${s.name}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>`).join(""):'<p class="mc-none">No PDFs available for this course yet.</p>',c=o.length>0?o.map(s=>`
          <a href="./practice-test.html?id=${s.id}" class="mc-item">
            <span class="mc-ico-quiz">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </span>
            <span class="mc-item-txt">${s.title}</span>
            <span class="mc-item-badge">${s.questions?.length??0}Q · ${s.duration}m</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </a>`).join(""):'<p class="mc-none">No quizzes available for this course yet.</p>',l=`
      <div class="mc-card">
        <!-- Gradient square face -->
        <div class="mc-face">
          <span class="mc-enrolled">✓ Enrolled</span>

          <div>
            <div class="mc-icon">${a}</div>
            <div class="mc-title">${e.title}</div>
          </div>

          <div class="mc-btns">
            <!-- PDFs btn -->
            <button class="mc-btn" data-target="${d}">
              <span class="mc-btn-icon-pdf">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                  <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l.5-5.5Z"/><path d="m16 8-3 3"/>
                </svg>
              </span>
              <span class="mc-btn-lbl">PDFs</span>
              <svg class="mc-chev" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>

            <!-- Quiz btn -->
            <button class="mc-btn" data-target="${n}">
              <span class="mc-btn-icon-quiz">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 1 0 4v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z"/>
                  <path d="M12 13h.01M8 13h.01M16 13h.01"/>
                </svg>
              </span>
              <span class="mc-btn-lbl">Quiz</span>
              <svg class="mc-chev" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>`,r=`
      <!-- PDFs View -->
      <div class="mc-content-view" id="${d}">
        <div class="mc-view-header">
          <button class="mc-btn-back">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <h3 class="mc-view-title">${e.title} - PDFs</h3>
        </div>
        <div class="mc-view-list">${p}</div>
      </div>

      <!-- Quiz View -->
      <div class="mc-content-view" id="${n}">
        <div class="mc-view-header">
          <button class="mc-btn-back">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <h3 class="mc-view-title">${e.title} - Quizzes</h3>
        </div>
        <div class="mc-view-list">${c}</div>
      </div>
    `;return{card:l,views:r}}attachListeners(){const e=this.coursesContainer.querySelector(".mc-courses-list");this.coursesContainer.querySelectorAll(".mc-btn").forEach(t=>{t.addEventListener("click",()=>{const o=t.getAttribute("data-target"),i=document.getElementById(o);e.classList.add("hidden"),i.classList.add("active"),window.scrollTo({top:0,behavior:"smooth"})})}),this.coursesContainer.querySelectorAll(".mc-btn-back").forEach(t=>{t.addEventListener("click",o=>{o.currentTarget.closest(".mc-content-view").classList.remove("active"),e.classList.remove("hidden")})})}categoryIcon(e){return{"Complete Package":'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',"Traffic Rules":'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',"MV Act":'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',Mechanical:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M4.34 19.66l-1.41 1.41M20 12h2M2 12h2M19.07 19.07l-1.41-1.41M4.34 4.34L2.93 2.93M12 20v2M12 2v2"/></svg>'}[e]??'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>'}showEmptyState(e,t,o,i){this.coursesContainer.innerHTML=`
      <div class="mc-full info-card" style="text-align:center;margin:8px 0;">
        <div class="info-icon" style="margin:0 auto var(--spacing-lg);">
          <i data-lucide="book-open" style="width:48px;height:48px;"></i>
        </div>
        <h2 style="font-size:21px;font-weight:700;color:var(--text-primary);margin-bottom:var(--spacing-md);">${e}</h2>
        <p style="font-size:14px;color:var(--text-secondary);margin-bottom:var(--spacing-lg);line-height:1.6;">${t}</p>
        <a href="${i}" class="btn-primary"
           style="display:inline-flex;width:auto;padding:13px 26px;font-size:14px;font-weight:600;text-decoration:none;">
          <span>${o}</span>
          <i data-lucide="arrow-right" style="width:18px;height:18px;"></i>
        </a>
      </div>`,window.lucide?.createIcons()}}new C;

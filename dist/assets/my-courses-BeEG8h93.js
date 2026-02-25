import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css               */import{o as p}from"./auth-service-CzQAHVFu.js";import{g,b as h,f as u}from"./admin-service-B7fwtq3Q.js";import"./firebase-config-DyDltD9C.js";let x=0;function f(){return++x}class m{constructor(){this.coursesContainer=document.querySelector("#courses-content"),this.injectStyles(),this.init()}injectStyles(){if(document.getElementById("mc-styles"))return;const e=document.createElement("style");e.id="mc-styles",e.textContent=`
      /* page wrapper — 2 col grid */
      #courses-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        padding: 14px 13px 30px;
        align-items: start;
      }

      /* ── Card shell ── */
      .mc-card {
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 8px 26px rgba(124,45,18,0.30);
        animation: mcUp 0.4s cubic-bezier(0.16,1,0.3,1) both;
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
        /* rich amber-to-orange gradient */
        background: linear-gradient(148deg,
          #3d0c02 0%,
          #7c2d12 28%,
          #b45309 60%,
          #f97316 82%,
          #fbbf24 100%
        );
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
        background:rgba(255,190,80,0.14);
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
        font-size: 13px;
        font-weight: 700;
        color: #fff;
        line-height: 1.38;
        text-shadow: 0 1px 6px rgba(0,0,0,0.28);
        margin: 0 0 13px;
        position: relative; z-index: 1;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      /* ── two action buttons stacked ── */
      .mc-btns {
        display: flex;
        flex-direction: column;
        gap: 6px;
        position: relative; z-index: 1;
      }
      .mc-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 7px 10px;
        border: 1.5px solid rgba(255,255,255,0.38);
        border-radius: 11px;
        background: rgba(255,255,255,0.17);
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
        text-align: left;
      }
      .mc-btn:hover  { background:rgba(255,255,255,0.28); border-color:rgba(255,255,255,0.7); }
      .mc-btn:active { transform:scale(0.95); }
      .mc-btn.active { background:rgba(255,255,255,0.34); border-color:#fff; }
      .mc-btn-lbl    { flex:1; }
      .mc-chev       { margin-left:auto; flex-shrink:0; transition:transform .24s; }

      /* ── Accordion ── */
      .mc-acc {
        background: #fffbf6;
        max-height: 0;
        overflow: hidden;
        transition: max-height .36s cubic-bezier(0.4,0,0.2,1);
      }
      .mc-acc.open { max-height: 900px; }
      .mc-acc-inner {
        padding: 11px 11px 13px;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .mc-acc-label {
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.6px;
        color: #b45309;
        margin-bottom: 2px;
      }

      /* ── Items in accordion ── */
      .mc-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 9px;
        border-radius: 11px;
        background: #fff;
        border: 1px solid rgba(180,83,9,0.1);
        text-decoration: none;
        color: #1c1917;
        font-size: 11.5px;
        font-weight: 500;
        transition: background .14s, border-color .14s, transform .14s;
        box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        line-height: 1.3;
      }
      .mc-item:hover { background:#fff8f0; border-color:#b45309; transform:translateX(2px); }

      .mc-ico-pdf {
        width:26px; height:26px; border-radius:8px; flex-shrink:0;
        background:linear-gradient(135deg,#fde68a,#f97316);
        display:flex; align-items:center; justify-content:center; color:#7c2d12;
      }
      .mc-ico-quiz {
        width:26px; height:26px; border-radius:8px; flex-shrink:0;
        background:linear-gradient(135deg,#ddd6fe,#7c3aed);
        display:flex; align-items:center; justify-content:center; color:#fff;
      }
      .mc-item-txt   { flex:1; word-break:break-word; }
      .mc-item-badge {
        font-size:10px; color:#7c3aed; background:#ede9fe;
        padding:2px 5px; border-radius:99px; font-weight:600;
        flex-shrink:0; white-space:nowrap;
      }

      .mc-none {
        text-align:center; color:#9ca3af; font-size:11.5px; padding:8px 0 2px;
      }

      /* loading / empty spans full grid */
      .mc-full { grid-column:1/-1; }
      .mc-loading {
        text-align:center; padding:52px 24px;
      }
      .mc-spinner {
        width:40px; height:40px;
        border:3px solid rgba(180,83,9,0.15);
        border-top-color:#b45309;
        border-radius:50%;
        animation:mcSpin .8s linear infinite;
        margin:0 auto 14px;
      }
      @keyframes mcSpin { to{transform:rotate(360deg);} }
    `,document.head.appendChild(e)}async init(){p(async e=>{e?await this.loadUserCourses(e.uid):this.showEmptyState("Please Sign In","You need to sign in to view your courses.","Go to Home","./index.html")})}async loadUserCourses(e){this.coursesContainer.innerHTML=`
      <div class="mc-full mc-loading">
        <div class="mc-spinner"></div>
        <p style="color:#9ca3af;font-size:13.5px;">Loading your courses…</p>
      </div>`;const i=await g(e);if(i.success&&i.courses&&i.courses.length>0){const n=await h(),s=n.success&&n.pdfs?n.pdfs:[],o=[];for(const t of i.courses){const c=s.filter(a=>{var d;return(d=t.pdfIds)==null?void 0:d.includes(a.id)}),r=await u(t.id),l=r.success&&r.tests?r.tests:[];o.push(this.buildCard(t,c,l))}this.coursesContainer.innerHTML=o.join(""),this.attachListeners()}else this.showEmptyState("No Courses Yet","You haven't enrolled in any courses yet. Browse and start learning today!","Browse Courses","./index.html")}buildCard(e,i,n){const s=f(),o=`mc-pdf-${s}`,t=`mc-quiz-${s}`,c=this.categoryIcon(e.category),r=i.length>0?i.map(a=>`
          <a href="${a.url}" target="_blank" rel="noopener" class="mc-item">
            <span class="mc-ico-pdf">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
            </span>
            <span class="mc-item-txt">${a.name}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>`).join(""):'<p class="mc-none">No PDFs yet.</p>',l=n.length>0?n.map(a=>{var d;return`
          <a href="./practice-test.html?id=${a.id}" class="mc-item">
            <span class="mc-ico-quiz">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </span>
            <span class="mc-item-txt">${a.title}</span>
            <span class="mc-item-badge">${((d=a.questions)==null?void 0:d.length)??0}Q · ${a.duration}m</span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </a>`}).join(""):'<p class="mc-none">No quizzes yet.</p>';return`
      <div class="mc-card">

        <!-- Gradient square face -->
        <div class="mc-face">
          <span class="mc-enrolled">✓ Enrolled</span>

          <div>
            <div class="mc-icon">${c}</div>
            <div class="mc-title">${e.title}</div>
          </div>

          <div class="mc-btns">
            <!-- PDFs btn -->
            <button class="mc-btn" data-acc="${o}" data-pair="${t}" aria-expanded="false">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
              <span class="mc-btn-lbl">📄 PDFs</span>
              <svg class="mc-chev" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>

            <!-- Quiz btn -->
            <button class="mc-btn" data-acc="${t}" data-pair="${o}" aria-expanded="false">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              <span class="mc-btn-lbl">🧪 Quiz</span>
              <svg class="mc-chev" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- PDFs accordion -->
        <div class="mc-acc" id="${o}">
          <div class="mc-acc-inner">
            <div class="mc-acc-label">📄 Study Materials</div>
            ${r}
          </div>
        </div>

        <!-- Quiz accordion -->
        <div class="mc-acc" id="${t}">
          <div class="mc-acc-inner">
            <div class="mc-acc-label">🧪 Quiz / MCQs</div>
            ${l}
          </div>
        </div>

      </div>`}attachListeners(){this.coursesContainer.querySelectorAll(".mc-btn").forEach(e=>{e.addEventListener("click",()=>{const i=e.getAttribute("data-acc"),n=e.getAttribute("data-pair"),s=document.getElementById(i),o=document.getElementById(n),t=this.coursesContainer.querySelector(`.mc-btn[data-acc="${n}"]`),c=e.querySelector(".mc-chev"),r=s.classList.contains("open");if(o.classList.contains("open")){o.classList.remove("open"),t==null||t.classList.remove("active"),t==null||t.setAttribute("aria-expanded","false");const l=t==null?void 0:t.querySelector(".mc-chev");l&&(l.style.transform="rotate(0deg)")}s.classList.toggle("open",!r),e.classList.toggle("active",!r),e.setAttribute("aria-expanded",String(!r)),c&&(c.style.transform=r?"rotate(0deg)":"rotate(180deg)")})})}categoryIcon(e){return{"Complete Package":'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',"Traffic Rules":'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',"MV Act":'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',Mechanical:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M4.34 19.66l-1.41 1.41M20 12h2M2 12h2M19.07 19.07l-1.41-1.41M4.34 4.34L2.93 2.93M12 20v2M12 2v2"/></svg>'}[e]??'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>'}showEmptyState(e,i,n,s){var o;this.coursesContainer.innerHTML=`
      <div class="mc-full info-card" style="text-align:center;margin:8px 0;">
        <div class="info-icon" style="margin:0 auto var(--spacing-lg);">
          <i data-lucide="book-open" style="width:48px;height:48px;"></i>
        </div>
        <h2 style="font-size:21px;font-weight:700;color:var(--text-primary);margin-bottom:var(--spacing-md);">${e}</h2>
        <p style="font-size:14px;color:var(--text-secondary);margin-bottom:var(--spacing-lg);line-height:1.6;">${i}</p>
        <a href="${s}" class="btn-primary"
           style="display:inline-flex;width:auto;padding:13px 26px;font-size:14px;font-weight:600;text-decoration:none;">
          <span>${n}</span>
          <i data-lucide="arrow-right" style="width:18px;height:18px;"></i>
        </a>
      </div>`,(o=window.lucide)==null||o.createIcons()}}new m;

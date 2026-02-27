import{o as b,g as C}from"./auth-service-BYs2Equ7.js";import{e as g}from"./escape-html-BUkjI-KV.js";import{g as k}from"./admin-service-WdanE3z8.js";function S(r){return`jkssb_enrolled_${r}`}function x(r,t){const l=S(t),s=JSON.parse(localStorage.getItem(l)??"[]");s.includes(r)||(s.push(r),localStorage.setItem(l,JSON.stringify(s))),window.location.href="./my-courses.html"}function E(r){var c,u,p,v;(c=document.getElementById("course-detail-modal"))==null||c.remove();const t=(r.syllabus??"").split(`
`).map(o=>o.trim()).filter(Boolean),l=[],s=((u=r.description)==null?void 0:u.trim())??"",a=s.split(/\s*\d+\.\s+/).map(o=>o.trim()).filter(Boolean);let n="";a.length>1?(n=a[0],l.push(...a.slice(1))):s&&l.push(s);const d=t.length?`<ul class="cdm-list">${t.map(o=>`<li>${g(o)}</li>`).join("")}</ul>`:'<p style="color:#888;font-style:italic;">No syllabus added yet.</p>',e=l.length?`${n?`<p class="cdm-desc-heading">${g(n)}</p>`:""}<ul class="cdm-list">${l.map(o=>`<li>${g(o)}</li>`).join("")}</ul>`:s?`<p style="color:#ccc;line-height:1.7;">${g(s)}</p>`:'<p style="color:#888;font-style:italic;">No description added yet.</p>',i=document.createElement("div");i.id="course-detail-modal",i.className="cdm-overlay",i.innerHTML=`
    <div class="cdm-panel" role="dialog" aria-modal="true">
      <div class="cdm-header">
        <button class="cdm-close" aria-label="Close">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <h2 class="cdm-title">${g(r.title)}</h2>
        <div class="cdm-price">₹${r.price.toLocaleString()}</div>
      </div>

      <div class="cdm-body">
        <!-- Syllabus toggle -->
        <div class="cdm-toggle-bar" data-target="cdm-syllabus">
          <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg> Syllabus</span>
          <svg class="cdm-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="cdm-section" id="cdm-syllabus" style="display:none;">
          ${d}
        </div>

        <!-- Description toggle -->
        <div class="cdm-toggle-bar" data-target="cdm-description">
          <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> Description</span>
          <svg class="cdm-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="cdm-section" id="cdm-description" style="display:none;">
          ${e}
        </div>
      </div>

      <div class="cdm-footer">
        <button class="cdm-buy-btn" id="cdm-buy-btn-trigger">
          <span>Buy Now</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  `,i.querySelectorAll(".cdm-toggle-bar").forEach(o=>{o.addEventListener("click",()=>{const m=o.dataset.target,y=document.getElementById(m),f=o.querySelector(".cdm-arrow"),w=y.style.display!=="none";i.querySelectorAll(".cdm-section").forEach(h=>h.style.display="none"),i.querySelectorAll(".cdm-arrow").forEach(h=>h.style.transform=""),w||(y.style.display="block",f.style.transform="rotate(180deg)")})}),i.addEventListener("click",o=>{o.target===i&&i.remove()}),(p=i.querySelector("#cdm-buy-btn-trigger"))==null||p.addEventListener("click",()=>{const o=C();if(!o){alert("Please sign in to purchase a course.");return}window.confirm(`Enroll in "${r.title}" for ₹${r.price.toLocaleString()}?

(Demo payment — no real charge)

Click OK to confirm.`)&&(i.remove(),x(r.id,o.uid))}),(v=i.querySelector(".cdm-close"))==null||v.addEventListener("click",()=>i.remove()),document.body.appendChild(i)}class L{constructor(){this.currentUser=null,this.coursesContainer=document.querySelector(".course-cards"),this.init(),this.setupExpandTopicsDelegation()}setupExpandTopicsDelegation(){document.addEventListener("click",t=>{var e;const l=t.target.closest(".expand-more-topics-btn");if(!l)return;t.preventDefault(),t.stopPropagation();const s=l,a=s.closest(".course-description-card"),n=a==null?void 0:a.querySelector(".course-topics-extra");if(!n)return;const d=getComputedStyle(n).display==="none";n.style.display=d?"block":"none",s.textContent=d?s.dataset.lessText||"Show less":s.dataset.moreText||"+ more topics",(e=window.lucide)==null||e.createIcons()})}async init(){b(async t=>{this.currentUser=t,await this.loadCourses()})}async loadCourses(){var t,l;if(this.coursesContainer){this.coursesContainer.innerHTML=`
      <div class="glass-card skeleton-glass"></div>
      <div class="glass-card skeleton-glass"></div>
      <div class="glass-card skeleton-glass"></div>
    `;try{const s=await k(),a=s.success&&"courses"in s&&s.courses?s.courses:[];if(a.length===0){this.coursesContainer.innerHTML=`
          <div class="alert-card info" style="grid-column:1/-1;">
            <div class="alert-icon"><i data-lucide="info"></i></div>
            <div class="alert-content">
              <h3>No Courses Available</h3>
              <p>Courses are being prepared. Check back soon!</p>
            </div>
          </div>
        `,window.lucide.createIcons();return}const n=this.currentUser?(()=>{try{return JSON.parse(localStorage.getItem(`jkssb_enrolled_${this.currentUser.uid}`)??"[]")}catch{return[]}})():[],d=a.map(e=>({id:e.id,title:e.title,description:e.description,syllabus:e.syllabus,price:e.price,duration:e.duration,paymentLink:e.paymentLink})).sort((e,i)=>{const c=n.includes(e.id),u=n.includes(i.id);return c&&!u?-1:!c&&u?1:0});this.coursesContainer.innerHTML=d.map(e=>this.renderCourseCard(e,n.includes(e.id))).join(""),this.coursesContainer.querySelectorAll(".btn-enrolled").forEach(e=>{e.addEventListener("click",()=>{window.location.href="./my-courses.html"})}),this.coursesContainer.querySelectorAll(".btn-enroll").forEach(e=>{e.addEventListener("click",()=>{const i=e.dataset.courseId,c=d.find(u=>u.id===i);c&&E(c)})}),(t=window.lucide)==null||t.createIcons()}catch(s){console.error("Error loading courses:",s),this.coursesContainer&&(this.coursesContainer.innerHTML=`
          <div class="alert-card error" style="grid-column:1/-1;">
            <div class="alert-icon"><i data-lucide="alert-circle"></i></div>
            <div class="alert-content">
              <h3>Error Loading Courses</h3>
              <p>Unable to load courses. Please refresh the page.</p>
            </div>
          </div>
        `,(l=window.lucide)==null||l.createIcons())}}}renderCourseCard(t,l=!1){return l?`
        <div class="glass-card glass-card--enrolled">
          <div class="glass-card-glow glass-card-glow--enrolled"></div>
          <div class="glass-card-inner">
            <div class="glass-card-icon glass-card-icon--enrolled">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h3 class="glass-card-title">${g(t.title)}</h3>
            <button class="btn-enrolled glass-enrolled-btn" data-course-id="${t.id}">
              🎉 Enrolled
            </button>
            <span class="glass-card-hint">Click to view your course</span>
          </div>
        </div>
      `:`
      <div class="glass-card">
        <div class="glass-card-glow"></div>
        <div class="glass-card-inner">
          <div class="glass-card-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
            </svg>
          </div>
          <h3 class="glass-card-title">${g(t.title)}</h3>
          <div class="glass-card-price">₹${t.price.toLocaleString()}</div>
          <button class="btn-enroll glass-enroll-btn" data-course-id="${t.id}">
            View Details &amp; Enroll
          </button>
        </div>
      </div>
    `}}document.querySelector(".course-cards")&&new L;

import{o as b,g as C}from"./auth-service-BYs2Equ7.js";import{e as d}from"./escape-html-BUkjI-KV.js";import{g as k}from"./admin-service-WdanE3z8.js";function S(r){return`jkssb_enrolled_${r}`}function x(r,t){const l=S(t),e=JSON.parse(localStorage.getItem(l)??"[]");e.includes(r)||(e.push(r),localStorage.setItem(l,JSON.stringify(e))),window.location.href="./my-courses.html"}function E(r){var u,g,p,v;(u=document.getElementById("course-detail-modal"))==null||u.remove();const t=(r.syllabus??"").split(`
`).map(o=>o.trim()).filter(Boolean),l=[],e=((g=r.description)==null?void 0:g.trim())??"",n=e.split(/\s*\d+\.\s+/).map(o=>o.trim()).filter(Boolean);let a="";n.length>1?(a=n[0],l.push(...n.slice(1))):e&&l.push(e);const c=t.length?`<ul class="cdm-list">${t.map(o=>`<li>${d(o)}</li>`).join("")}</ul>`:'<p style="color:#888;font-style:italic;">No syllabus added yet.</p>',s=l.length?`${a?`<p class="cdm-desc-heading">${d(a)}</p>`:""}<ul class="cdm-list">${l.map(o=>`<li>${d(o)}</li>`).join("")}</ul>`:e?`<p style="color:#ccc;line-height:1.7;">${d(e)}</p>`:'<p style="color:#888;font-style:italic;">No description added yet.</p>',i=document.createElement("div");i.id="course-detail-modal",i.className="cdm-overlay",i.innerHTML=`
    <div class="cdm-panel" role="dialog" aria-modal="true">
      <div class="cdm-header">
        <button class="cdm-close" aria-label="Close">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <h2 class="cdm-title">${d(r.title)}</h2>
        <div class="cdm-price">₹${r.price.toLocaleString()}</div>
      </div>

      <div class="cdm-body">
        <!-- Syllabus toggle -->
        <div class="cdm-toggle-bar" data-target="cdm-syllabus">
          <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg> Syllabus</span>
          <svg class="cdm-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="cdm-section" id="cdm-syllabus" style="display:none;">
          ${c}
        </div>

        <!-- Description toggle -->
        <div class="cdm-toggle-bar" data-target="cdm-description">
          <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> Description</span>
          <svg class="cdm-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="cdm-section" id="cdm-description" style="display:none;">
          ${s}
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

Click OK to confirm.`)&&(i.remove(),x(r.id,o.uid))}),(v=i.querySelector(".cdm-close"))==null||v.addEventListener("click",()=>i.remove()),document.body.appendChild(i)}class L{constructor(){this.currentUser=null,this.coursesContainer=document.querySelector(".course-cards"),this.init(),this.setupExpandTopicsDelegation()}setupExpandTopicsDelegation(){document.addEventListener("click",t=>{var s;const l=t.target.closest(".expand-more-topics-btn");if(!l)return;t.preventDefault(),t.stopPropagation();const e=l,n=e.closest(".course-description-card"),a=n==null?void 0:n.querySelector(".course-topics-extra");if(!a)return;const c=getComputedStyle(a).display==="none";a.style.display=c?"block":"none",e.textContent=c?e.dataset.lessText||"Show less":e.dataset.moreText||"+ more topics",(s=window.lucide)==null||s.createIcons()})}async init(){b(async t=>{this.currentUser=t,await this.loadCourses()})}async loadCourses(){var t,l;if(this.coursesContainer){this.coursesContainer.innerHTML=`
      <div class="glass-card skeleton-glass"></div>
      <div class="glass-card skeleton-glass"></div>
      <div class="glass-card skeleton-glass"></div>
    `;try{const e=await k(),n=e.success&&"courses"in e&&e.courses?e.courses:[];if(n.length===0){this.coursesContainer.innerHTML=`
          <div class="alert-card info" style="grid-column:1/-1;">
            <div class="alert-icon"><i data-lucide="info"></i></div>
            <div class="alert-content">
              <h3>No Courses Available</h3>
              <p>Courses are being prepared. Check back soon!</p>
            </div>
          </div>
        `,window.lucide.createIcons();return}const a=this.currentUser?(()=>{try{return JSON.parse(localStorage.getItem(`jkssb_enrolled_${this.currentUser.uid}`)??"[]")}catch{return[]}})():[],c=n.map(s=>({id:s.id,title:s.title,description:s.description,syllabus:s.syllabus,price:s.price,duration:s.duration,paymentLink:s.paymentLink}));this.coursesContainer.innerHTML=c.map(s=>this.renderCourseCard(s,a.includes(s.id))).join(""),this.coursesContainer.querySelectorAll(".btn-enrolled").forEach(s=>{s.addEventListener("click",()=>{window.location.href="./my-courses.html"})}),this.coursesContainer.querySelectorAll(".btn-enroll").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.courseId,u=c.find(g=>g.id===i);u&&E(u)})}),(t=window.lucide)==null||t.createIcons()}catch(e){console.error("Error loading courses:",e),this.coursesContainer&&(this.coursesContainer.innerHTML=`
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
            <h3 class="glass-card-title">${d(t.title)}</h3>
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
          <h3 class="glass-card-title">${d(t.title)}</h3>
          <div class="glass-card-price">₹${t.price.toLocaleString()}</div>
          <button class="btn-enroll glass-enroll-btn" data-course-id="${t.id}">
            View Details &amp; Enroll
          </button>
        </div>
      </div>
    `}}document.querySelector(".course-cards")&&new L;

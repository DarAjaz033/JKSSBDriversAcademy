import{o as y,g as v}from"./auth-service-By807CDz.js";import{e as c}from"./escape-html-BUkjI-KV.js";import{g as f}from"./admin-service-BQGa3a-U.js";import{o as b}from"./payment-service-BnsnPGPW.js";function w(l){document.getElementById("course-detail-modal")?.remove();const e=(l.syllabus??"").split(`
`).map(a=>a.trim()).filter(Boolean),n=[],s=l.description?.trim()??"",r=s.split(/\s*\d+\.\s+/).map(a=>a.trim()).filter(Boolean);let d="";r.length>1?(d=r[0],n.push(...r.slice(1))):s&&n.push(s);const o=e.length?`<ul class="cdm-list">${e.map(a=>`<li>${c(a)}</li>`).join("")}</ul>`:'<p style="color:#888;font-style:italic;">No syllabus added yet.</p>',t=n.length?`${d?`<p class="cdm-desc-heading">${c(d)}</p>`:""}<ul class="cdm-list">${n.map(a=>`<li>${c(a)}</li>`).join("")}</ul>`:s?`<p style="color:#ccc;line-height:1.7;">${c(s)}</p>`:'<p style="color:#888;font-style:italic;">No description added yet.</p>',i=document.createElement("div");i.id="course-detail-modal",i.className="cdm-overlay",i.innerHTML=`
    <div class="cdm-panel" role="dialog" aria-modal="true">
      <div class="cdm-header">
        <button class="cdm-close" aria-label="Close">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <h2 class="cdm-title">${c(l.title)}</h2>
        <div class="cdm-price">
          ${l.oldPrice?`<del style="color:#DC2626; font-size:0.85em; margin-right:8px; text-decoration-thickness: 2px;">₹${l.oldPrice.toLocaleString()}</del>`:""}
          ₹${l.price.toLocaleString()}
        </div>
      </div>

      <div class="cdm-body">
        <!-- Syllabus toggle -->
        <div class="cdm-toggle-bar watery-tab" data-target="cdm-syllabus">
          <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg> Syllabus</span>
          <svg class="cdm-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="cdm-section" id="cdm-syllabus" style="display:none;">
          ${o}
        </div>

        <!-- Description toggle -->
        <div class="cdm-toggle-bar watery-tab" data-target="cdm-description">
          <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> Description</span>
          <svg class="cdm-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="cdm-section" id="cdm-description" style="display:none;">
          ${t}
        </div>
      </div>

      <div class="cdm-footer" style="display: flex; justify-content: space-between; align-items: center; gap: 16px;">
        <div class="cdm-footer-price" style="display: flex; flex-direction: column;">
          ${l.oldPrice?`<del style="color:var(--text-secondary); font-size:13px; text-decoration-thickness: 1.5px;">₹${l.oldPrice.toLocaleString()}</del>`:""}
          <span style="font-size:22px; font-weight:800; color:var(--text-primary); line-height: 1;">₹${l.price.toLocaleString()}</span>
        </div>
        <button class="${v()?"cdm-buy-btn":"cdm-buy-btn signin-mode"}" id="cdm-buy-btn-trigger" style="flex: 1; justify-content: center;">
          <span>${v()?"Buy Now":"Sign In to Enroll"}</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  `,i.querySelectorAll(".cdm-toggle-bar").forEach(a=>{a.addEventListener("click",()=>{const p=a.dataset.target,m=document.getElementById(p),h=a.querySelector(".cdm-arrow"),g=m.style.display!=="none";i.querySelectorAll(".cdm-section").forEach(u=>u.style.display="none"),i.querySelectorAll(".cdm-arrow").forEach(u=>u.style.transform=""),g||(m.style.display="block",h.style.transform="rotate(180deg)")})}),i.addEventListener("click",a=>{a.target===i&&i.remove()}),i.querySelector("#cdm-buy-btn-trigger")?.addEventListener("click",()=>{const a=v();if(!a){window.location.href=`./login.html?redirect=${encodeURIComponent(`index.html?buyCourse=${l.id}`)}`;return}l.paymentLink?b(l,a.uid):window.location.href=`./course-purchase.html?id=${l.id}`}),i.querySelector(".cdm-close")?.addEventListener("click",()=>i.remove()),document.body.appendChild(i)}class S{constructor(){this.currentUser=null,this.coursesContainer=document.querySelector(".course-cards"),this.init(),this.setupExpandTopicsDelegation()}setupExpandTopicsDelegation(){document.addEventListener("click",e=>{const n=e.target.closest(".expand-more-topics-btn");if(!n)return;e.preventDefault(),e.stopPropagation();const s=n,d=s.closest(".course-description-card")?.querySelector(".course-topics-extra");if(!d)return;const o=getComputedStyle(d).display==="none";d.style.display=o?"block":"none",s.textContent=o?s.dataset.lessText||"Show less":s.dataset.moreText||"+ more topics",window.lucide?.createIcons()})}async init(){y(async e=>{this.currentUser=e,await this.loadCourses()})}async loadCourses(){if(this.coursesContainer){this.coursesContainer.innerHTML=`
      <div class="glass-card skeleton-glass"></div>
      <div class="glass-card skeleton-glass"></div>
      <div class="glass-card skeleton-glass"></div>
    `;try{const e=await f(),n=e.success&&"courses"in e&&e.courses?e.courses:[];if(n.length===0){this.coursesContainer.innerHTML=`
          <div class="alert-card info" style="grid-column:1/-1;">
            <div class="alert-icon"><i data-lucide="info"></i></div>
            <div class="alert-content">
              <h3>No Courses Available</h3>
              <p>Courses are being prepared. Check back soon!</p>
            </div>
          </div>
        `,window.lucide.createIcons();return}const s=this.currentUser?(()=>{try{return JSON.parse(localStorage.getItem(`jkssb_enrolled_${this.currentUser.uid}`)??"[]")}catch{return[]}})():[],r=n.map(t=>({id:t.id,title:t.title,description:t.description,syllabus:t.syllabus,price:t.price,oldPrice:t.oldPrice,duration:t.duration,paymentLink:t.paymentLink})).sort((t,i)=>{const a=s.includes(t.id),p=s.includes(i.id);return a&&!p?-1:!a&&p?1:0});this.coursesContainer.innerHTML=r.map(t=>this.renderCourseCard(t,s.includes(t.id))).join(""),this.coursesContainer.querySelectorAll(".btn-enrolled").forEach(t=>{t.addEventListener("click",()=>{window.location.href="./my-courses.html"})}),this.coursesContainer.querySelectorAll(".btn-enroll").forEach(t=>{t.addEventListener("click",()=>{const i=t.dataset.courseId,a=r.find(p=>p.id===i);a&&w(a)})});const o=new URLSearchParams(window.location.search).get("buyCourse");if(o&&this.currentUser){const t=r.find(i=>i.id===o);t&&!s.includes(t.id)&&(t.paymentLink?b(t,this.currentUser.uid):window.location.href=`./course-purchase.html?id=${t.id}`,window.history.replaceState({},document.title,window.location.pathname))}window.lucide?.createIcons()}catch(e){console.error("Error loading courses:",e),this.coursesContainer&&(this.coursesContainer.innerHTML=`
          <div class="alert-card error" style="grid-column:1/-1;">
            <div class="alert-icon"><i data-lucide="alert-circle"></i></div>
            <div class="alert-content">
              <h3>Error Loading Courses</h3>
              <p>Unable to load courses. Please refresh the page.</p>
            </div>
          </div>
        `,window.lucide?.createIcons())}}}getThumbInfo(e){if(e.thumbCssClass){const r=e.thumbBadgeStyle||"badge-pop";let d="";e.thumbBadge&&(d=`<span class="thumb-badge ${r}">${c(e.thumbBadge)}</span>`);let o="";if(e.thumbPartTags){const t=e.thumbPartTags.split(",").map(i=>i.trim()).filter(Boolean);t.length>0&&(o=`<div class="fc-parts">${t.map(i=>`<span class="part-pill">${c(i)}</span>`).join("")}</div>`)}return{class:e.thumbCssClass,label:e.thumbTopLabel?c(e.thumbTopLabel):"",badge:d,content:`
          ${e.thumbMainHeading?`<div class="fc-title">${e.thumbMainHeading}</div>`:""}
          ${e.thumbSubHeading?`<div class="fc-sub">${e.thumbSubHeading}</div>`:""}
          ${o}
          ${e.thumbBottomCaption?`<div class="fc-includes">${e.thumbBottomCaption}</div>`:""}
        `}}const s=e.title.toLowerCase();return s.includes("full course")?{class:"thumb-fullcourse",label:"JKSSB Driver Full Course",badge:'<span class="thumb-badge badge-pop">Popular</span>',content:`
        <div class="fc-title">FULL<br>COURSE</div>
        <div class="fc-sub">All 3 Parts Included</div>
        <div class="fc-parts">
          <span class="part-pill">Part I</span>
          <span class="part-pill">Part II</span>
          <span class="part-pill">Part III</span>
        </div>
        <div class="fc-includes">
          Notes, Videos + 2500+ MCQ Book + <span class="blink-free">FREE</span> MV Act MCQ Book
        </div>
      `}:s.includes("part i")&&!s.includes("part ii")&&!s.includes("part iii")?{class:"thumb-part1",label:"JKSSB Driver Part I",badge:'<span class="thumb-badge badge-val">Best Value</span>',content:`
        <div class="p1-main">TRAFFIC<br>RULES &<br>SIGNALLING</div>
        <div class="p1-icons">🚦 🛑 ⚠️</div>
        <div class="p1-sub">Road Safety & Signals</div>
      `}:s.includes("part ii")&&!s.includes("part iii")?{class:"thumb-part2",label:"JKSSB Driver Part II",badge:'<span class="thumb-badge badge-val">Best Value</span>',content:`
        <div class="mv-italic">Objective Questions Answers</div>
        <div class="mv-title">MOTOR<br>VEHICLE<br>ACT</div>
        <div class="mv-sub">1988 & CMV Rules 1989</div>
        <div class="mv-line"></div>
        <div class="mv-by">By JKSSB Drivers Academy</div>
      `}:s.includes("part iii")?{class:"thumb-part3",label:"JKSSB Driver Part III",badge:'<span class="thumb-badge badge-val">Best Value</span>',content:`
        <div class="p3-title">MOTOR<br>PARTS &<br>REPAIR</div>
        <div class="p3-icons">🔧 ⚙️ 🔩 🛞</div>
        <div class="p3-sub">Mechanical Knowledge</div>
      `}:s.includes("mv act")&&s.includes("mcq")?{class:"thumb-mvact",label:"JKSSB Driver MV Act MCQ Book",badge:"",content:`
        <div class="mvb-italic">Objective Questions Answers</div>
        <div class="mvb-main">MOTOR<br>VEHICLE<br>ACT</div>
        <div class="mvb-mcq">MCQs book</div>
        <div class="mvb-line"></div>
        <div class="mvb-by">By JKSSB Drivers Academy</div>
      `}:s.includes("old driver papers")||s.includes("old papers")?{class:"thumb-oldpapers",label:"JKSSB Driver Old Papers",badge:'<span class="thumb-badge badge-new">New</span>',content:`
        <div class="op-title">OLD<br>DRIVER<br>PAPERS</div>
        <div class="op-sub">JKSSB & Other Boards</div>
        <div class="op-line"></div>
        <div class="op-detail">Previous Year Papers</div>
        <div class="op-by">By JKSSB Drivers Academy</div>
      `}:{class:"thumb-mcqbook",label:"JKSSB Driver MCQ Book",badge:'<span class="thumb-badge badge-new">New</span>',content:`
        <div class="mcq-count">2500+<br>MCQs</div>
        <div class="mcq-sub">Full Syllabus Covered</div>
        <div class="mcq-line"></div>
        <div class="mcq-detail">Topic Wise · With Answers</div>
        <div class="mcq-by">By JKSSB Drivers Academy</div>
      `}}renderCourseCard(e,n=!1){const s=this.getThumbInfo(e);let r="";return e.oldPrice&&e.oldPrice>e.price&&(r=`<span class="discount-tag">${Math.round((e.oldPrice-e.price)/e.oldPrice*100)}% OFF</span>`),n?`
        <div class="card" style="box-shadow: 0 4px 20px rgba(22, 163, 74, 0.15); border: 2px solid rgba(22, 163, 74, 0.3);">
          <div class="card-thumb ${s.class}">
            <div class="thumb-toplabel">${s.label}</div>
            ${s.badge}
            ${s.content}
          </div>
          <div class="card-body">
            <div class="card-title">${c(e.title)}</div>
            <button class="btn-enrolled enroll-btn" data-course-id="${e.id}" style="background: linear-gradient(90deg, #16A34A, #22C55E);">
              🎉 Enrolled - Go to Course
            </button>
          </div>
        </div>
      `:`
      <div class="card">
        <div class="card-thumb ${s.class}">
          <div class="thumb-toplabel">${s.label}</div>
          ${s.badge}
          ${s.content}
        </div>
        <div class="card-body">
          <div class="card-title">${c(e.title)}</div>
          <div class="price-row">
            ${e.oldPrice?`<span class="old-price">₹${e.oldPrice.toLocaleString()}</span>`:""}
            <span class="new-price">₹${e.price.toLocaleString()}</span>
            ${r}
          </div>
          <button class="btn-enroll enroll-btn" data-course-id="${e.id}">
            View Details &amp; Enroll
          </button>
        </div>
      </div>
    `}}document.querySelector(".course-cards")&&new S;

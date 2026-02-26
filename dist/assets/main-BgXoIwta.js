import"./firebase-config-CsUtaHqz.js";/* empty css               */import"./app-CI_mKbmi.js";import{o as c}from"./auth-service-DAVyyWu1.js";import{e as n}from"./escape-html-BUkjI-KV.js";import{g as p,a as g,b as u,c as x}from"./admin-service-Bysf_l-8.js";import"./global-pdf-viewer-HjeyeNNL.js";class h{constructor(){this.currentUser=null,this.coursesContainer=document.querySelector(".course-cards"),this.init(),this.setupExpandTopicsDelegation()}setupExpandTopicsDelegation(){document.addEventListener("click",e=>{var s;const t=e.target.closest(".expand-more-topics-btn");if(!t)return;e.preventDefault(),e.stopPropagation();const i=t,a=i.closest(".course-description-card"),r=a==null?void 0:a.querySelector(".course-topics-extra");if(!r)return;const o=getComputedStyle(r).display==="none";r.style.display=o?"block":"none",i.textContent=o?i.dataset.lessText||"Show less":i.dataset.moreText||"+ more topics",(s=window.lucide)==null||s.createIcons()})}async init(){c(async e=>{this.currentUser=e,await this.loadCourses()})}async loadCourses(){if(this.coursesContainer)try{let e="";if(this.currentUser){const r=await p(this.currentUser.uid);r.success&&"courses"in r&&r.courses&&r.courses.length>0&&(e+=await this.renderMyCoursesSection(r.courses))}const t=await g(),i=t.success&&"courses"in t&&t.courses?t.courses:[];if(i.length===0&&!e){this.coursesContainer.innerHTML=`
          <div class="alert-card info" style="grid-column: 1/-1;">
            <div class="alert-icon">
              <i data-lucide="info"></i>
            </div>
            <div class="alert-content">
              <h3>No Courses Available</h3>
              <p>Courses are being prepared. Check back soon!</p>
            </div>
          </div>
        `,window.lucide.createIcons();return}const a=i.map(r=>({id:r.id,title:r.title,description:r.description,price:r.price,duration:r.duration,category:r.category}));e&&(e+='<div style="grid-column: 1/-1; height: 1px; background: var(--border); margin: var(--spacing-lg) 0;"></div>',e+='<div style="grid-column: 1/-1; margin-bottom: var(--spacing-md);"><h3 style="font-size: 20px; font-weight: 700; color: var(--text-primary);">All Courses</h3><p style="color: var(--text-secondary); font-size: 14px; margin-top: 4px;">Browse our complete course catalog</p></div>'),e+=a.map((r,o)=>this.renderCourseCard(r,!e&&o===0)).join(""),this.coursesContainer.innerHTML=e,window.lucide.createIcons()}catch(e){console.error("Error loading courses:",e),this.coursesContainer&&(this.coursesContainer.innerHTML=`
          <div class="alert-card error" style="grid-column: 1/-1;">
            <div class="alert-icon">
              <i data-lucide="alert-circle"></i>
            </div>
            <div class="alert-content">
              <h3>Error Loading Courses</h3>
              <p>Unable to load courses. Please refresh the page.</p>
            </div>
          </div>
        `,window.lucide.createIcons())}}async renderMyCoursesSection(e){let t='<div style="grid-column: 1/-1; margin-bottom: var(--spacing-md);"><h3 style="font-size: 20px; font-weight: 700; color: var(--text-primary);">My Courses</h3><p style="color: var(--text-secondary); font-size: 14px; margin-top: 4px;">Continue your learning journey</p></div>';for(const i of e)t+=await this.renderPurchasedCourseCard(i);return t}async renderPurchasedCourseCard(e){const t=await u(),i=await x(),a=t.success&&t.pdfs?t.pdfs.filter(s=>e.pdfIds.includes(s.id)):[],r=i.success&&i.tests?i.tests.filter(s=>e.practiceTestIds.includes(s.id)):[];return`
      <div class="course-card purchased" style="background: linear-gradient(135deg, rgba(180, 83, 9, 0.05) 0%, rgba(217, 119, 6, 0.05) 100%); border: 2px solid var(--primary); position: relative; overflow: hidden;">
        <div style="position: absolute; top: 12px; right: 12px; background: var(--gradient-primary); color: white; padding: 6px 14px; border-radius: var(--radius-full); font-size: 12px; font-weight: 700; box-shadow: 0 2px 8px rgba(180, 83, 9, 0.3);">
          ENROLLED
        </div>
        <div class="course-header">
          <div class="course-icon" style="background: var(--gradient-primary); color: white;"><i data-lucide="${this.getCategoryIcon(e.category)}"></i></div>
          <h3>${n(e.title)}</h3>
        </div>
        <div class="course-description-wrapper" style="margin: var(--spacing-sm) 0;">
          ${this.renderDescriptionForCard(e.description)}
        </div>
        <div style="display: flex; gap: 12px; margin-top: var(--spacing-md); padding-top: var(--spacing-md); border-top: 1px solid rgba(180, 83, 9, 0.15);">
          <div style="flex: 1; display: flex; align-items: center; gap: 10px; padding: 12px 14px; background: linear-gradient(135deg, rgba(217, 119, 6, 0.08) 0%, rgba(251, 146, 60, 0.08) 100%); border-radius: var(--radius-md); border: 1px solid rgba(217, 119, 6, 0.2);">
            <div style="width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #d97706 0%, #f59e0b 100%); border-radius: var(--radius-sm); box-shadow: 0 2px 8px rgba(217, 119, 6, 0.25); flex-shrink: 0;">
              <i data-lucide="file-text" style="width: 18px; height: 18px; color: white;"></i>
            </div>
            <div style="flex: 1; min-width: 0;">
              <div style="font-size: 22px; font-weight: 700; color: var(--primary); line-height: 1; margin-bottom: 2px;">${a.length}</div>
              <div style="font-size: 12px; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">${a.length===1?"PDF":"PDFs"}</div>
            </div>
          </div>
          <div style="flex: 1; display: flex; align-items: center; gap: 10px; padding: 12px 14px; background: linear-gradient(135deg, rgba(217, 119, 6, 0.08) 0%, rgba(251, 146, 60, 0.08) 100%); border-radius: var(--radius-md); border: 1px solid rgba(217, 119, 6, 0.2);">
            <div style="width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #d97706 0%, #f59e0b 100%); border-radius: var(--radius-sm); box-shadow: 0 2px 8px rgba(217, 119, 6, 0.25); flex-shrink: 0;">
              <i data-lucide="clipboard-check" style="width: 18px; height: 18px; color: white;"></i>
            </div>
            <div style="flex: 1; min-width: 0;">
              <div style="font-size: 22px; font-weight: 700; color: var(--primary); line-height: 1; margin-bottom: 2px;">${r.length}</div>
              <div style="font-size: 12px; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">${r.length===1?"Test":"Tests"}</div>
            </div>
          </div>
        </div>
        <button class="btn-enroll" style="background: var(--gradient-primary); color: white; margin-top: var(--spacing-md);" onclick="window.location.href='./my-courses.html'">
          Continue Learning
        </button>
      </div>
    `}formatDescriptionForCard(e){const t=e.trim(),i=t.split(/\s*\d+\.\s+/).map(a=>a.trim()).filter(Boolean);return i.length>1?{title:i[0],points:i.slice(1),isList:!0}:{title:void 0,points:[t],isList:!1}}renderTopicItem(e){return`
      <li style="display: flex; align-items: flex-start; gap: 10px; min-height: 20px;">
        <span style="width: 18px; height: 18px; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; margin-top: 2px;">
          <i data-lucide="check" style="width: 14px; height: 14px; color: var(--primary); stroke-width: 3;"></i>
        </span>
        <span style="flex: 1; color: var(--text-secondary); line-height: 1.5; padding-top: 0;">${n(e)}</span>
      </li>
    `}renderDescriptionForCard(e){const{title:t,points:i,isList:a}=this.formatDescriptionForCard(e);if(a&&i.length>0){const o=i.slice(0,4),s=i.slice(4),d=s.length;return`
        <div class="course-description-card" style="font-size: 14px; color: var(--text-secondary);">
          ${t?`<div style="font-weight: 600; color: var(--text-primary); margin-bottom: 10px; font-size: 15px;">${n(t)}</div>`:""}
          <ul class="course-topics-visible" style="margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 8px;">
            ${o.map(l=>this.renderTopicItem(l)).join("")}
          </ul>
          ${d>0?`
            <div class="course-topics-extra" style="display: none; margin-top: 8px;">
              <ul style="margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 8px;">
                ${s.map(l=>this.renderTopicItem(l)).join("")}
              </ul>
            </div>
            <button type="button" class="expand-more-topics-btn" style="font-size: 13px; color: var(--primary); font-weight: 600; margin-top: 8px; padding: 6px 0; background: none; border: none; cursor: pointer; text-align: left; font-family: inherit; display: block; width: 100%; -webkit-tap-highlight-color: transparent; touch-action: manipulation;" data-more-text="+ ${d} more topics" data-less-text="Show less">
              + ${d} more topics
            </button>
          `:""}
        </div>
      `}return`<p class="course-description" style="font-size: 14px; color: var(--text-secondary); line-height: 1.6; margin: 0;">${n(e)}</p>`}renderCourseCard(e,t=!1){const i=this.getCategoryIcon(e.category);return`
      <div class="course-card ${t?"featured":""}" style="position: relative; overflow: hidden;">
        ${t?'<div class="course-badge">Best Value</div>':""}
        <div class="course-header">
          <div class="course-icon" style="background: var(--gradient-primary); color: white; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; border-radius: var(--radius-md); box-shadow: 0 4px 12px rgba(180, 83, 9, 0.25);"><i data-lucide="${i}" style="width: 24px; height: 24px;"></i></div>
          <h3>${n(e.title)}</h3>
        </div>
        <div style="display: inline-flex; align-items: center; gap: 6px; background: linear-gradient(135deg, rgba(217, 119, 6, 0.1) 0%, rgba(251, 146, 60, 0.1) 100%); padding: 8px 16px; border-radius: var(--radius-full); border: 1px solid rgba(217, 119, 6, 0.25); margin: var(--spacing-md) 0;">
          <i data-lucide="indian-rupee" style="width: 16px; height: 16px; color: var(--primary);"></i>
          <span style="font-size: 24px; font-weight: 700; color: var(--primary);">${e.price.toLocaleString()}</span>
        </div>
        <div class="course-description-wrapper" style="margin: var(--spacing-sm) 0;">
          ${this.renderDescriptionForCard(e.description)}
        </div>
        <div style="display: flex; gap: 12px; margin-top: var(--spacing-md); padding-top: var(--spacing-md); border-top: 1px solid var(--border);">
          <div style="flex: 1; display: flex; align-items: center; gap: 10px; padding: 12px 14px; background: linear-gradient(135deg, rgba(180, 83, 9, 0.08) 0%, rgba(217, 119, 6, 0.08) 100%); border-radius: var(--radius-md); border: 1px solid rgba(180, 83, 9, 0.2);">
            <div style="width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; background: var(--gradient-primary); border-radius: var(--radius-sm); box-shadow: 0 2px 8px rgba(180, 83, 9, 0.25); flex-shrink: 0;">
              <i data-lucide="clock" style="width: 18px; height: 18px; color: white;"></i>
            </div>
            <div style="flex: 1; min-width: 0;">
              <div style="font-size: 13px; font-weight: 700; background: var(--gradient-primary); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: transparent; line-height: 1.3; margin-bottom: 2px;">${n(e.duration)}</div>
              <div style="font-size: 11px; font-weight: 600; background: var(--gradient-primary); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: transparent; text-transform: uppercase; letter-spacing: 0.5px;">Duration</div>
            </div>
          </div>
          <div style="flex: 1; display: flex; align-items: center; gap: 10px; padding: 12px 14px; background: linear-gradient(135deg, rgba(180, 83, 9, 0.08) 0%, rgba(217, 119, 6, 0.08) 100%); border-radius: var(--radius-md); border: 1px solid rgba(180, 83, 9, 0.2);">
            <div style="width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; background: var(--gradient-primary); border-radius: var(--radius-sm); box-shadow: 0 2px 8px rgba(180, 83, 9, 0.25); flex-shrink: 0;">
              <i data-lucide="tag" style="width: 18px; height: 18px; color: white;"></i>
            </div>
            <div style="flex: 1; min-width: 0;">
              <div style="font-size: 13px; font-weight: 700; background: var(--gradient-primary); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: transparent; line-height: 1.3; margin-bottom: 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${n(e.category)}</div>
              <div style="font-size: 11px; font-weight: 600; background: var(--gradient-primary); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: transparent; text-transform: uppercase; letter-spacing: 0.5px;">Category</div>
            </div>
          </div>
        </div>
        <button class="btn-enroll" style="margin-top: var(--spacing-md);" onclick="window.location.href='./course-details.html?id=${e.id}'">
          View Details
        </button>
      </div>
    `}getCategoryIcon(e){return{"Traffic Rules":"traffic-cone","MV Act":"clipboard-list",Mechanical:"wrench","Complete Package":"graduation-cap","Full Course":"graduation-cap","Part I":"traffic-cone","Part II":"clipboard-list","Part III":"wrench"}[e]||"book-open"}}document.querySelector(".course-cards")&&new h;

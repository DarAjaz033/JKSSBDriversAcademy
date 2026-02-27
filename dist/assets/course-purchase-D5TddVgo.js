import"./firebase-config-CsUtaHqz.js";/* empty css               */import{o as c}from"./auth-service-BYs2Equ7.js";import{c as i,a as n,h as o}from"./admin-service-WdanE3z8.js";const u=async(r,e)=>{try{const s=`TEST_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,t=await i({userId:e,courseId:r.id,amount:r.price,paymentId:s,status:"completed"});return t.success?{success:!0}:{success:!1,error:t.error}}catch(s){return{success:!1,error:s.message||"Payment simulation failed"}}};class d{constructor(){this.course=null,this.userId=null,this.courseContent=document.getElementById("course-content"),this.init()}async init(){const s=new URLSearchParams(window.location.search).get("id");if(!s){this.courseContent.innerHTML='<div style="text-align: center; padding: var(--spacing-xl);">Course not found</div>';return}c(async t=>{t?(this.userId=t.uid,await this.loadCourse(s)):this.courseContent.innerHTML=`
          <div style="text-align: center; padding: var(--spacing-xl);">
            <p style="margin-bottom: var(--spacing-md);">Please sign in to purchase this course</p>
            <a href="./index.html" class="btn btn-primary">Go to Home</a>
          </div>
        `})}async loadCourse(e){const s=await n(e);if(s.success&&s.course){this.course=s.course;const t=await o(this.userId,e);if(this.courseContent.innerHTML=`
        <div class="course-header">
          <div class="course-title">${this.course.title}</div>
          <div class="course-meta">
            <span>${this.course.duration}</span>
            <span>•</span>
            <span>${this.course.category.replace("-"," ").toUpperCase()}</span>
          </div>
        </div>

        ${t.hasPurchased?`
          <div class="already-purchased">
            You already own this course! Go to My Courses to access it.
          </div>
          <a href="./my-courses.html" class="btn btn-primary" style="width: 100%; text-align: center; display: block; text-decoration: none;">
            Go to My Courses
          </a>
        `:`
          <div class="course-body">
            <div class="section-title">About This Course</div>
            <div class="course-description">${this.course.description}</div>
          </div>

          <div class="price-card">
            <div class="price-label">Course Price</div>
            <div class="price-amount">₹${this.course.price}</div>
          </div>

          <button class="purchase-btn" id="purchase-btn">
            Purchase Course
          </button>
          <p style="text-align: center; font-size: 12px; color: var(--text-tertiary); margin-top: var(--spacing-sm);">
            Secure payment powered by Cashfree
          </p>
        `}
      `,!t.hasPurchased){const a=document.getElementById("purchase-btn");a&&a.addEventListener("click",()=>this.handlePurchase())}window.lucide.createIcons()}else this.courseContent.innerHTML='<div style="text-align: center; padding: var(--spacing-xl);">Course not found</div>'}async handlePurchase(){if(!this.course||!this.userId)return;const e=document.getElementById("purchase-btn");e.disabled=!0,e.textContent="Processing...";const s=await u(this.course,this.userId);s.success?(alert("Purchase successful! You can now access this course."),window.location.href="./my-courses.html"):(alert("Payment failed: "+s.error),e.disabled=!1,e.textContent="Purchase Course")}}new d;

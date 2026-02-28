import{c as d}from"./admin-service-BQGa3a-U.js";const c=async(s,n)=>{try{const e=`TEST_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,i=await d({userId:n,courseId:s.id,amount:s.price,paymentId:e,status:"completed"});return i.success?{success:!0}:{success:!1,error:i.error}}catch(e){return{success:!1,error:e.message||"Payment simulation failed"}}},u=(s,n)=>{const e=document.createElement("div");e.className="cdm-overlay",e.style.zIndex="999999",e.innerHTML=`
    <div class="checkout-panel">
      <div class="cdm-header" style="display: flex; justify-content: space-between; align-items: center; padding: 16px 20px;">
        <h2 class="cdm-title" style="margin: 0; display: flex; align-items: center; gap: 8px;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: #10b981;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          Secure Checkout
        </h2>
        <button class="cdm-close" style="position: static;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"></path></svg>
        </button>
      </div>
      
      <div class="checkout-iframe-container">
        <iframe src="${s.paymentLink}"></iframe>
      </div>
      
      <div class="cdm-footer" style="padding: 12px 20px; text-align: center; background: rgba(16, 185, 129, 0.05); border-top: 1px solid var(--border);">
        <p style="color: #10b981; font-size: 13px; font-weight: 500; margin: 0;">
          Do not close this window. You will be automatically redirected upon success.
        </p>
        <button id="verify-payment-btn" style="background: none; border: none; color: var(--text-tertiary); font-size: 12px; text-decoration: underline; margin-top: 6px; cursor: pointer; padding: 4px;">
          Click here if not redirected automatically
        </button>
      </div>
    </div>
  `,document.body.appendChild(e),e.querySelector(".cdm-close")?.addEventListener("click",()=>e.remove());const a=async()=>{e.remove(),await c(s,n);const t=window.showToast;t&&(t("Payment successful! 🎉","success"),setTimeout(()=>{t("You are now enrolled.","success")},1500),setTimeout(()=>{t("Learn and enjoy! 🚀","success")},3e3)),setTimeout(()=>{window.location.href="./my-courses.html"},4500)},r=t=>{t.data?.type==="CASHFREE_PAYMENT_SUCCESS"&&(window.removeEventListener("message",r),a())};window.addEventListener("message",r);const o=e.querySelector("#verify-payment-btn");o?.addEventListener("click",async()=>{o.disabled=!0,o.textContent="Verifying...",window.removeEventListener("message",r),(await c(s,n)).success?a():(alert("Verification failed. If you paid, please contact support."),o.disabled=!1,o.textContent="Click here if not redirected automatically",window.addEventListener("message",r))})};export{u as o,c as s};

const c="__admin_toast_css";if(!document.getElementById(c)){const e=document.createElement("style");e.id=c,e.textContent=`
    #toast-container {
      position: fixed;
      bottom: 1.5rem;
      right: 1.5rem;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 0.625rem;
      pointer-events: none;
    }

    .toast-item {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      padding: 0.875rem 1.125rem;
      border-radius: 0.75rem;
      box-shadow: 0 8px 24px rgba(0,0,0,0.14);
      font-size: 0.875rem;
      font-weight: 500;
      color: white;
      min-width: 280px;
      max-width: 380px;
      pointer-events: auto;
      cursor: pointer;
      transform: translateX(120%);
      opacity: 0;
      transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.25s ease;
      backdrop-filter: blur(8px);
      line-height: 1.4;
    }

    .toast-item.visible {
      transform: translateX(0);
      opacity: 1;
    }

    .toast-item.hiding {
      transform: translateX(120%);
      opacity: 0;
    }

    .toast-item.success { background: linear-gradient(135deg, #059669, #10B981); }
    .toast-item.error   { background: linear-gradient(135deg, #DC2626, #EF4444); }
    .toast-item.info    { background: linear-gradient(135deg, #2563EB, #3B82F6); }
    .toast-item.warning { background: linear-gradient(135deg, #D97706, #F59E0B); }

    .toast-icon { font-size: 1.125rem; flex-shrink: 0; margin-top: 0.0625rem; }
    .toast-text { flex: 1; }

    /* Progress bar at bottom of toast */
    .toast-progress {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 3px;
      border-radius: 0 0 0.75rem 0.75rem;
      background: rgba(255,255,255,0.5);
      transition: width linear;
    }

    /* ─── Confirm Dialog ─────────────────────────────────────────── */
    .confirm-overlay {
      position: fixed;
      inset: 0;
      background: rgba(15,23,42,0.55);
      backdrop-filter: blur(3px);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      opacity: 0;
      transition: opacity 0.2s ease;
    }

    .confirm-overlay.visible { opacity: 1; }

    .confirm-card {
      background: white;
      border-radius: 1rem;
      padding: 1.75rem;
      max-width: 380px;
      width: 100%;
      box-shadow: 0 20px 60px rgba(0,0,0,0.2);
      transform: scale(0.92);
      transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
    }

    .confirm-overlay.visible .confirm-card { transform: scale(1); }

    .confirm-icon {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;
      font-size: 1.5rem;
    }

    .confirm-icon.danger { background: #FEF2F2; color: #DC2626; }
    .confirm-icon.warning { background: #FFFBEB; color: #D97706; }

    .confirm-title {
      font-size: 1.0625rem;
      font-weight: 700;
      color: #0F172A;
      margin-bottom: 0.375rem;
    }

    .confirm-message {
      font-size: 0.875rem;
      color: #64748B;
      margin-bottom: 1.5rem;
      line-height: 1.5;
    }

    .confirm-actions {
      display: flex;
      gap: 0.625rem;
    }

    .confirm-btn {
      flex: 1;
      padding: 0.625rem;
      border-radius: 0.5rem;
      border: none;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.18s ease;
    }

    .confirm-btn.cancel {
      background: #F1F5F9;
      color: #374151;
      border: 1px solid #E2E8F0;
    }

    .confirm-btn.cancel:hover { background: #E2E8F0; }

    .confirm-btn.danger {
      background: linear-gradient(135deg, #DC2626, #EF4444);
      color: white;
    }

    .confirm-btn.danger:hover { box-shadow: 0 4px 12px rgba(220,38,38,0.3); transform: translateY(-1px); }
  `,document.head.appendChild(e)}function m(){let e=document.getElementById("toast-container");return e||(e=document.createElement("div"),e.id="toast-container",document.body.appendChild(e)),e}const l={success:"✓",error:"✕",info:"ℹ",warning:"⚠"};function f(e,o="info",a=3500){const r=m(),t=document.createElement("div");t.className=`toast-item ${o}`,t.style.position="relative",t.style.overflow="hidden",t.innerHTML=`
    <span class="toast-icon">${l[o]}</span>
    <span class="toast-text">${e}</span>
    <div class="toast-progress" style="width:100%;transition-duration:${a}ms;"></div>
  `,t.addEventListener("click",()=>d(t)),r.appendChild(t),requestAnimationFrame(()=>{t.classList.add("visible");const n=t.querySelector(".toast-progress");n&&requestAnimationFrame(()=>{n.style.width="0%"})});const i=setTimeout(()=>d(t),a);t.addEventListener("click",()=>clearTimeout(i))}function d(e){e.classList.add("hiding"),setTimeout(()=>e.remove(),350)}function g(e,o,a="Delete",r="danger"){return new Promise(t=>{const i=document.createElement("div");i.className="confirm-overlay",i.innerHTML=`
      <div class="confirm-card">
        <div class="confirm-icon ${r}">${r==="danger"?"🗑️":"⚠️"}</div>
        <div class="confirm-title">${e}</div>
        <div class="confirm-message">${o}</div>
        <div class="confirm-actions">
          <button class="confirm-btn cancel" id="confirm-cancel-btn">Cancel</button>
          <button class="confirm-btn ${r}" id="confirm-ok-btn">${a}</button>
        </div>
      </div>
    `,document.body.appendChild(i),requestAnimationFrame(()=>i.classList.add("visible"));const n=s=>{i.classList.remove("visible"),setTimeout(()=>i.remove(),250),t(s)};i.querySelector("#confirm-cancel-btn").addEventListener("click",()=>n(!1)),i.querySelector("#confirm-ok-btn").addEventListener("click",()=>n(!0)),i.addEventListener("click",s=>{s.target===i&&n(!1)})})}export{g as a,f as s};

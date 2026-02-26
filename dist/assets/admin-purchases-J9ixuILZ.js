import"./firebase-config-CsUtaHqz.js";/* empty css               */import{o as i}from"./auth-service-BYs2Equ7.js";import{i as d,j as c,e as u}from"./admin-service-CQyGqwJl.js";import{s as l}from"./admin-toast-8NJD7knF.js";class m{constructor(){this.purchasesContainer=document.getElementById("purchases-container"),this.init()}async init(){i(async s=>{if(!s){window.location.href="./admin-login.html";return}if(!await d(s)){window.location.href="./admin-login.html";return}await this.loadPurchases()},!0)}async loadPurchases(){const s=await c();if(s.success&&s.purchases){const n=await Promise.all(s.purchases.map(async t=>{const e=await u(t.courseId);return{...t,courseName:e.success&&e.course?e.course.title:"Unknown Course"}}));this.purchasesContainer.innerHTML=n.sort((t,e)=>{var a,o;const r=((a=t.purchasedAt)==null?void 0:a.seconds)||0;return(((o=e.purchasedAt)==null?void 0:o.seconds)||0)-r}).map(t=>this.renderPurchaseRow(t)).join("")}else this.purchasesContainer.innerHTML='<tr><td colspan="6" style="text-align: center; color: #64748B; padding: 2rem;">No purchases found.</td></tr>',l("No purchases to display.","info",2500)}renderPurchaseRow(s){var e;const n=(e=s.purchasedAt)!=null&&e.seconds?new Date(s.purchasedAt.seconds*1e3).toLocaleDateString():"N/A",t=s.status==="completed"?"completed":s.status==="pending"?"pending":"failed";return`
      <tr>
        <td>
            <div class="user-info">
                <span>${s.userId.substring(0,10)}...</span>
                <span class="user-email">UID: ${s.userId}</span>
            </div>
        </td>
        <td style="font-weight: 600;">${s.courseName}</td>
        <td style="font-weight: 700;">₹${s.amount}</td>
        <td style="font-family: monospace; font-size: 0.75rem; color: #64748B;">${s.paymentId}</td>
        <td><span class="status-badge ${t}">${s.status.toUpperCase()}</span></td>
        <td>${n}</td>
      </tr>
    `}}new m;

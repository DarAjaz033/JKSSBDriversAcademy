import{e as P,f as S,r as D,h as R,i as I}from"./firebase-config-CsUtaHqz.js";document.addEventListener("click",async e=>{const t=e.target;if(t.closest(".secure-download-btn")||t.closest(".dl-btn-container"))return;const o=t.closest("a");if(!o)return;const i=o.getAttribute("href")||o.href||"";if(!i)return;const w=i.toLowerCase().includes(".pdf")||i.includes("firebasestorage.googleapis.com"),l=i.includes("pdf-viewer.html");if(w||l){e.preventDefault(),e.stopPropagation();let s=i;if(l){const p=new URLSearchParams(i.substring(i.indexOf("?")));s=decodeURIComponent(p.get("url")||i)}window.history.pushState({pdfOpen:!0},"",window.location.pathname),await E(s)}},!0);function O(e){try{const t=e;t.requestFullscreen?t.requestFullscreen():t.webkitRequestFullscreen?t.webkitRequestFullscreen():t.mozRequestFullScreen?t.mozRequestFullScreen():t.msRequestFullscreen&&t.msRequestFullscreen();let o=document.getElementById("ios-fullscreen-hack");o||(o=document.createElement("video"),o.id="ios-fullscreen-hack",o.style.cssText="position: absolute; width: 1px; height: 1px; opacity: 0; pointer-events: none;",o.playsInline=!0,document.body.appendChild(o)),o.webkitEnterFullscreen&&o.webkitEnterFullscreen()}catch(t){console.warn("Fullscreen API failed",t)}}window.FirebaseCacheManager={async getFileSize(e){let t=e;if(e.includes("pdf-viewer.html")){const o=new URLSearchParams(e.substring(e.indexOf("?")));t=decodeURIComponent(o.get("url")||e)}if(!t.includes("firebasestorage.googleapis.com"))return null;try{const i=new URL(t).pathname.split("/o/");if(i.length>1){const w=decodeURIComponent(i[1]),l=P(S),s=D(l,w),f=(await I(s)).size;return f>=1024*1024?(f/(1024*1024)).toFixed(1)+"MB":Math.round(f/1024)+"KB"}}catch(o){console.warn("Failed to get Firebase metadata for size",o)}return null},async downloadPdfSafely(e,t,o){var w;if(!t)return;const i=e.innerHTML;try{e.disabled=!0,e.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>',e.style.animation="spin 1s linear infinite",e.style.background="rgba(148, 163, 184, 0.15)",e.style.color="#94a3b8";let l=t;if(t.includes("pdf-viewer.html")){const v=new URLSearchParams(t.substring(t.indexOf("?")));l=decodeURIComponent(v.get("url")||t)}if(l.includes("firebasestorage.googleapis.com")){const b=new URL(l).pathname.split("/o/");if(b.length>1){const C=decodeURIComponent(b[1]),M=P(S),z=D(M,C);l=await R(z)}}window.showToast&&window.showToast(`Downloading ${o}...`,"info");const s=await fetch(l,{mode:"cors"});if(!s.ok)throw new Error(`Network response was not ok (${s.status})`);const p=s.headers.get("content-length"),f=p?parseInt(p,10):0;let r=0;const a=(w=s.body)==null?void 0:w.getReader();if(!a)throw new Error("Could not read response body");const u=[];for(;;){const{done:v,value:b}=await a.read();if(v)break;if(b)if(u.push(b),r+=b.length,f>0){const C=Math.round(r/f*100);e.innerHTML=`<span style="font-size:11px; font-weight:700;">${C}%</span>`,e.style.background="rgba(180, 83, 9, 0.2)",e.style.color="#fff",e.style.border="1px solid rgba(180, 83, 9, 0.4)"}else e.style.animation="spin 1.5s linear infinite"}const c=new Blob(u,{type:"application/pdf"}),d=new Response(c),m=await caches.open("jkssb-pdf-cache-v1"),g=l.split("?"),n=g[0].includes("firebasestorage")?g.join("?"):g[0];await m.put(n,d);const h=30*24*60*60*1e3,x=Date.now()+h,y=localStorage.getItem("jkssb_downloads"),k=y?JSON.parse(y):{};k[n]={name:o,expiresAt:x},localStorage.setItem("jkssb_downloads",JSON.stringify(k)),e.style.animation="none",e.style.border="none",e.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',e.style.background="rgba(16, 185, 129, 0.15)",e.style.color="#10b981",e.style.cursor="default",e.disabled=!0,window.showToast&&window.showToast("Downloaded successfully ✓","success")}catch(l){console.error("Download failed",l),window.showToast&&window.showToast("Download failed. Try again.","error"),e.style.animation="none",e.style.border="none",e.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',e.style.background="rgba(239, 68, 68, 0.15)",e.style.color="#ef4444",setTimeout(()=>{e.disabled=!1,e.innerHTML=i,e.style.background="var(--gradient-primary, #e07b2a)",e.style.color="#fff"},3e3)}}};async function E(e){if(document.getElementById("secure-pdf-master"))return;const t=document.createElement("div");t.id="secure-pdf-master",t.style.cssText=`
        position: fixed;
        inset: 0;
        z-index: 2147483647;
        background: #111;
        overflow-y: auto;
        overflow-x: auto; /* Allow horizontal pan */
        -webkit-overflow-scrolling: touch;
        user-select: none;
        -webkit-user-select: none;
        -webkit-touch-callout: none;
    `,t.className="strict-security-blur";const o=document.createElement("div");o.id="pdf-canvas-container",o.style.cssText=`
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 8px 0;
    `,t.appendChild(o);const i=document.createElement("button");i.innerHTML="Exit Viewer",i.style.cssText=`
        position: fixed;
        top: 16px;
        right: 16px;
        z-index: 2147483648;
        background: rgba(15, 23, 42, 0.85);
        color: white;
        border: 1px solid rgba(255,255,255,0.2);
        padding: 8px 16px;
        border-radius: 20px;
        font-family: 'Poppins', sans-serif;
        font-weight: 600;
        font-size: 13px;
        cursor: pointer;
        transition: opacity 0.3s ease;
        backdrop-filter: blur(4px);
    `,t.appendChild(i);let w;const l=()=>{i.style.opacity="1",clearTimeout(w),w=setTimeout(()=>{i.style.opacity="0"},3e3)};t.addEventListener("pointerdown",l),t.addEventListener("touchstart",l),l(),document.body.appendChild(t);let s=1;const p=1,f=3,r=document.createElement("div");r.style.cssText=`
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 2147483648;
        display: flex;
        gap: 8px;
        background: rgba(15, 23, 42, 0.85);
        padding: 6px 10px;
        border-radius: 20px;
        border: 1px solid rgba(255,255,255,0.2);
        backdrop-filter: blur(4px);
    `;const a=document.createElement("button");a.innerHTML="−",a.style.cssText=`
        background: transparent;
        color: white;
        border: none;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        border-radius: 50%;
    `;const u=document.createElement("button");u.innerHTML="+",u.style.cssText=a.style.cssText,a.disabled=!0,a.style.opacity="0.5",r.appendChild(a),r.appendChild(u),t.appendChild(r);const c=()=>{s<p&&(s=p),s>f&&(s=f),o.querySelectorAll(".pdf-page-wrap").forEach(h=>{const x=h.dataset.baseWidth,y=h.dataset.baseHeight;if(x&&y){const k=parseFloat(x)*s,v=parseFloat(y)*s;h.style.width=`${k}px`,h.style.height=`${v}px`;const b=h.querySelector("canvas");b&&(b.style.width=`${k}px`,b.style.height=`${v}px`)}}),a.disabled=s<=p,a.style.opacity=s<=p?"0.5":"1",u.disabled=s>=f,u.style.opacity=s>=f?"0.5":"1"};a.addEventListener("click",n=>{n.preventDefault(),n.stopPropagation(),s-=.5,c()}),u.addEventListener("click",n=>{n.preventDefault(),n.stopPropagation(),s+=.5,c()}),t.addEventListener("wheel",n=>{if(n.ctrlKey||n.metaKey){n.preventDefault();const h=n.deltaY*-.01;s+=h,c()}},{passive:!1}),t.addEventListener("dblclick",()=>{s=1,c()});let d=-1,m=1,g=0;t.addEventListener("touchstart",n=>{n.touches.length===2&&(d=Math.hypot(n.touches[0].clientX-n.touches[1].clientX,n.touches[0].clientY-n.touches[1].clientY),m=s)}),t.addEventListener("touchmove",n=>{if(n.touches.length===2){n.preventDefault();const h=Math.hypot(n.touches[0].clientX-n.touches[1].clientX,n.touches[0].clientY-n.touches[1].clientY);if(d>0){const x=h/d;let y=m*x;y<p?(y=p,d=h,m=p):y>f&&(y=f,d=h,m=f),s=y,c()}}},{passive:!1}),t.addEventListener("touchend",n=>{if(n.touches.length<2&&(d=-1),n.changedTouches.length===1){const h=new Date().getTime(),x=h-g;x<500&&x>0&&(s=1,c(),n.preventDefault()),g=h}}),O(t),i.addEventListener("click",n=>{n.preventDefault(),n.stopPropagation(),j()}),U(),await H(),await A(e,o)}function j(){var t;const e=document.getElementById("secure-pdf-master");e&&(e.innerHTML="",e.remove());try{document.fullscreenElement?document.exitFullscreen():document.webkitExitFullscreen?document.webkitExitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.msExitFullscreen&&document.msExitFullscreen()}catch{}(t=window.history.state)!=null&&t.pdfOpen&&window.history.back(),B()}window.addEventListener("popstate",e=>{document.getElementById("secure-pdf-master")&&j()});document.addEventListener("fullscreenchange",T);document.addEventListener("webkitfullscreenchange",T);document.addEventListener("mozfullscreenchange",T);document.addEventListener("MSFullscreenChange",T);function T(){const e=document;!(e.fullscreenElement||e.webkitIsFullScreen||e.mozFullScreen||e.msFullscreenElement)&&document.getElementById("secure-pdf-master")&&j()}const L=e=>{if(e.type==="contextmenu")return e.preventDefault(),!1;if(e.type==="keydown"){const t=e;if(t.key==="PrintScreen"||t.code==="PrintScreen"||t.ctrlKey&&["p","s","c","a"].includes(t.key.toLowerCase())||t.metaKey&&["p","s","c","a"].includes(t.key.toLowerCase())||t.key==="F12"||t.ctrlKey&&t.shiftKey&&t.key.toLowerCase()==="i")return e.preventDefault(),e.stopPropagation(),!1}},F=e=>e.preventDefault();function U(){window.addEventListener("contextmenu",L,{capture:!0}),window.addEventListener("keydown",L,{capture:!0}),window.addEventListener("dragstart",F,{capture:!0}),window.addEventListener("drop",F,{capture:!0})}function B(){window.removeEventListener("contextmenu",L,{capture:!0}),window.removeEventListener("keydown",L,{capture:!0}),window.removeEventListener("dragstart",F,{capture:!0}),window.removeEventListener("drop",F,{capture:!0})}async function H(){if(!window.pdfjsLib)return new Promise((e,t)=>{const o=document.createElement("script");o.src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",o.onload=()=>{const i=window.pdfjsLib;i.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js",e()},o.onerror=t,document.body.appendChild(o)})}async function A(e,t){try{const o=document.createElement("div");t.appendChild(o);const i=window.pdfjsLib;let w=null,l=e;if(e.includes("firebasestorage.googleapis.com"))try{const a=new URL(e).pathname.split("/o/");if(a.length>1){const u=decodeURIComponent(a[1]),c=P(S),d=D(c,u);l=await R(d),console.log("[PDF Viewer] Fetched fresh Firebase token automatically.")}}catch(r){console.warn("[PDF Viewer] Could not refresh Firebase token, falling back to original URL.",r)}if("caches"in window)try{const r=e.split("?"),a=r[0].includes("firebasestorage")?r.join("?"):r[0],c=await(await caches.open("jkssb-pdf-cache-v1")).match(a,{ignoreSearch:!0});if(c){const d=await c.arrayBuffer();w=new Uint8Array(d)}}catch{}if(!w)try{const r=await fetch(l,{mode:"cors"});if(!r.ok)throw new Error(`Network response was not ok(${r.status})`);const a=await r.arrayBuffer();w=new Uint8Array(a)}catch(r){console.warn("Fetch failed, falling back to PDF.js native loader:",r)}const p=await(w?i.getDocument({data:w}):i.getDocument({url:l,withCredentials:!1})).promise;o.remove();const f=p.numPages;for(let r=1;r<=f;r++){const a=await p.getPage(r),u=window.devicePixelRatio||1;let c=a.getViewport({scale:1}),d=(window.innerWidth-12)/c.width;d>1.8&&(d=1.8),d<.5&&(d=.5),c=a.getViewport({scale:d});const m=document.createElement("div");m.className="pdf-page-wrap",m.dataset.baseWidth=c.width.toString(),m.dataset.baseHeight=c.height.toString(),m.style.cssText=`
                position: relative;
                margin - bottom: 8px;
                background: white;
                box - shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
                border - radius: 4px;
                overflow: hidden;
                `;const g=document.createElement("canvas"),n=g.getContext("2d");g.width=c.width*u,g.height=c.height*u,g.style.width=`${c.width} px`,g.style.height=`${c.height} px`,g.style.display="block",n.scale(u,u),m.appendChild(g),t.appendChild(m),await a.render({canvasContext:n,viewport:c}).promise}}catch(o){console.error("PDF Render Error",o);const i=(o==null?void 0:o.message)||(o==null?void 0:o.name)||String(o);t.innerHTML=`
                    < div style = "color:#ef4444; margin-top:30vh; font-family:Poppins; text-align:center; padding: 0 20px;" >
                        <h3>Failed to load document </h3>
                            < p style = "font-size: 13px; opacity: 0.8; word-break: break-all;" > Error Details: ${i} </p>
                                < p style = "font-size: 12px; margin-top:20px;" > (If this says "Network response was not ok" or "Failed to fetch", your Firebase Storage bucket is actively blocking this website.You must apply the CORS rules in Google Cloud Shell).</p>
            </div>
                `}}if(window.location.pathname.includes("pdf-viewer.html")){const t=new URLSearchParams(window.location.search).get("url");t&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>E(t)):E(t))}

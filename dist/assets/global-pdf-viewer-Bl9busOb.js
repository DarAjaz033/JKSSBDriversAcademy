import{e as C,f as P,r as S,h as j,i as z}from"./firebase-config-D0UifA0H.js";document.addEventListener("click",async e=>{const t=e.target;if(t.closest(".secure-download-btn")||t.closest(".dl-btn-container"))return;const o=t.closest("a");if(!o)return;const s=o.getAttribute("href")||o.href||"";if(!s)return;const l=s.toLowerCase().includes(".pdf")||s.includes("firebasestorage.googleapis.com"),u=s.includes("pdf-viewer.html");if(l||u){e.preventDefault(),e.stopPropagation();let i=s;if(u){const p=new URLSearchParams(s.substring(s.indexOf("?")));i=decodeURIComponent(p.get("url")||s)}window.history.pushState({pdfOpen:!0},"",window.location.pathname),await D(i)}},!0);function I(e){try{const t=e;t.requestFullscreen?t.requestFullscreen():t.webkitRequestFullscreen?t.webkitRequestFullscreen():t.mozRequestFullScreen?t.mozRequestFullScreen():t.msRequestFullscreen&&t.msRequestFullscreen();let o=document.getElementById("ios-fullscreen-hack");o||(o=document.createElement("video"),o.id="ios-fullscreen-hack",o.style.cssText="position: absolute; width: 1px; height: 1px; opacity: 0; pointer-events: none;",o.playsInline=!0,document.body.appendChild(o)),o.webkitEnterFullscreen&&o.webkitEnterFullscreen()}catch(t){console.warn("Fullscreen API failed",t)}}window.FirebaseCacheManager={async getFileSize(e){let t=e;if(e.includes("pdf-viewer.html")){const o=new URLSearchParams(e.substring(e.indexOf("?")));t=decodeURIComponent(o.get("url")||e)}if(!t.includes("firebasestorage.googleapis.com"))return null;try{const s=new URL(t).pathname.split("/o/");if(s.length>1){const l=decodeURIComponent(s[1]),u=C(P),i=S(u,l),f=(await z(i)).size;return f>=1024*1024?(f/(1024*1024)).toFixed(1)+"MB":Math.round(f/1024)+"KB"}}catch(o){console.warn("Failed to get Firebase metadata for size",o)}return null},async downloadPdfSafely(e,t,o){if(!t)return;const s=e.innerHTML;try{e.disabled=!0,e.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>',e.style.animation="spin 1s linear infinite",e.style.background="rgba(148, 163, 184, 0.15)",e.style.color="#94a3b8";let l=t;if(t.includes("pdf-viewer.html")){const v=new URLSearchParams(t.substring(t.indexOf("?")));l=decodeURIComponent(v.get("url")||t)}if(l.includes("firebasestorage.googleapis.com")){const x=new URL(l).pathname.split("/o/");if(x.length>1){const k=decodeURIComponent(x[1]),R=C(P),M=S(R,k);l=await j(M)}}window.showToast&&window.showToast(`Downloading ${o}...`,"info");const u=await fetch(l,{mode:"cors"});if(!u.ok)throw new Error(`Network response was not ok (${u.status})`);const i=u.headers.get("content-length"),p=i?parseInt(i,10):0;let f=0;const r=u.body?.getReader();if(!r)throw new Error("Could not read response body");const a=[];for(;;){const{done:v,value:x}=await r.read();if(v)break;if(x)if(a.push(x),f+=x.length,p>0){const k=Math.round(f/p*100);e.innerHTML=`<span style="font-size:11px; font-weight:700;">${k}%</span>`,e.style.background="rgba(180, 83, 9, 0.2)",e.style.color="#fff",e.style.border="1px solid rgba(180, 83, 9, 0.4)"}else e.style.animation="spin 1.5s linear infinite"}const h=new Blob(a,{type:"application/pdf"}),c=new Response(h),d=await caches.open("jkssb-pdf-cache-v1"),g=l.split("?"),m=g[0].includes("firebasestorage")?g.join("?"):g[0];await d.put(m,c);const n=720*60*60*1e3,w=Date.now()+n,b=localStorage.getItem("jkssb_downloads"),y=b?JSON.parse(b):{};y[m]={name:o,expiresAt:w},localStorage.setItem("jkssb_downloads",JSON.stringify(y)),e.style.animation="none",e.style.border="none",e.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',e.style.background="rgba(16, 185, 129, 0.15)",e.style.color="#10b981",e.style.cursor="default",e.disabled=!0,window.showToast&&window.showToast("Downloaded successfully ✓","success")}catch(l){console.error("Download failed",l),window.showToast&&window.showToast("Download failed. Try again.","error"),e.style.animation="none",e.style.border="none",e.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',e.style.background="rgba(239, 68, 68, 0.15)",e.style.color="#ef4444",setTimeout(()=>{e.disabled=!1,e.innerHTML=s,e.style.background="var(--gradient-primary, #e07b2a)",e.style.color="#fff"},3e3)}}};async function D(e){if(document.getElementById("secure-pdf-master"))return;const t=document.createElement("div");t.id="secure-pdf-master",t.style.cssText=`
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
    `,t.appendChild(o);const s=document.createElement("button");s.innerHTML="Exit Viewer",s.style.cssText=`
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
    `,t.appendChild(s);let l;const u=()=>{s.style.opacity="1",clearTimeout(l),l=setTimeout(()=>{s.style.opacity="0"},3e3)};t.addEventListener("pointerdown",u),t.addEventListener("touchstart",u),u(),document.body.appendChild(t);let i=1;const p=1,f=3,r=document.createElement("div");r.style.cssText=`
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
    `;const h=document.createElement("button");h.innerHTML="+",h.style.cssText=a.style.cssText,a.disabled=!0,a.style.opacity="0.5",r.appendChild(a),r.appendChild(h),t.appendChild(r);const c=()=>{i<p&&(i=p),i>f&&(i=f),o.querySelectorAll(".pdf-page-wrap").forEach(w=>{const b=w.dataset.baseWidth,y=w.dataset.baseHeight;if(b&&y){const v=parseFloat(b)*i,x=parseFloat(y)*i;w.style.width=`${v}px`,w.style.height=`${x}px`;const k=w.querySelector("canvas");k&&(k.style.width=`${v}px`,k.style.height=`${x}px`)}}),a.disabled=i<=p,a.style.opacity=i<=p?"0.5":"1",h.disabled=i>=f,h.style.opacity=i>=f?"0.5":"1"};a.addEventListener("click",n=>{n.preventDefault(),n.stopPropagation(),i-=.5,c()}),h.addEventListener("click",n=>{n.preventDefault(),n.stopPropagation(),i+=.5,c()}),t.addEventListener("wheel",n=>{if(n.ctrlKey||n.metaKey){n.preventDefault();const w=n.deltaY*-.01;i+=w,c()}},{passive:!1}),t.addEventListener("dblclick",()=>{i=1,c()});let d=-1,g=1,m=0;t.addEventListener("touchstart",n=>{n.touches.length===2&&(d=Math.hypot(n.touches[0].clientX-n.touches[1].clientX,n.touches[0].clientY-n.touches[1].clientY),g=i)}),t.addEventListener("touchmove",n=>{if(n.touches.length===2){n.preventDefault();const w=Math.hypot(n.touches[0].clientX-n.touches[1].clientX,n.touches[0].clientY-n.touches[1].clientY);if(d>0){const b=w/d;let y=g*b;y<p?(y=p,d=w,g=p):y>f&&(y=f,d=w,g=f),i=y,c()}}},{passive:!1}),t.addEventListener("touchend",n=>{if(n.touches.length<2&&(d=-1),n.changedTouches.length===1){const w=new Date().getTime(),b=w-m;b<500&&b>0&&(i=1,c(),n.preventDefault()),m=w}}),I(t),s.addEventListener("click",n=>{n.preventDefault(),n.stopPropagation(),E()}),O(),await B(),await H(e,o)}function E(){const e=document.getElementById("secure-pdf-master");e&&(e.innerHTML="",e.remove());try{document.fullscreenElement?document.exitFullscreen():document.webkitExitFullscreen?document.webkitExitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.msExitFullscreen&&document.msExitFullscreen()}catch{}window.history.state?.pdfOpen&&window.history.back(),U()}window.addEventListener("popstate",e=>{document.getElementById("secure-pdf-master")&&E()});document.addEventListener("fullscreenchange",T);document.addEventListener("webkitfullscreenchange",T);document.addEventListener("mozfullscreenchange",T);document.addEventListener("MSFullscreenChange",T);function T(){const e=document;!(e.fullscreenElement||e.webkitIsFullScreen||e.mozFullScreen||e.msFullscreenElement)&&document.getElementById("secure-pdf-master")&&E()}const L=e=>{if(e.type==="contextmenu")return e.preventDefault(),!1;if(e.type==="keydown"){const t=e;if(t.key==="PrintScreen"||t.code==="PrintScreen"||t.ctrlKey&&["p","s","c","a"].includes(t.key.toLowerCase())||t.metaKey&&["p","s","c","a"].includes(t.key.toLowerCase())||t.key==="F12"||t.ctrlKey&&t.shiftKey&&t.key.toLowerCase()==="i")return e.preventDefault(),e.stopPropagation(),!1}},F=e=>e.preventDefault();function O(){window.addEventListener("contextmenu",L,{capture:!0}),window.addEventListener("keydown",L,{capture:!0}),window.addEventListener("dragstart",F,{capture:!0}),window.addEventListener("drop",F,{capture:!0})}function U(){window.removeEventListener("contextmenu",L,{capture:!0}),window.removeEventListener("keydown",L,{capture:!0}),window.removeEventListener("dragstart",F,{capture:!0}),window.removeEventListener("drop",F,{capture:!0})}async function B(){if(!window.pdfjsLib)return new Promise((e,t)=>{const o=document.createElement("script");o.src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",o.onload=()=>{const s=window.pdfjsLib;s.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js",e()},o.onerror=t,document.body.appendChild(o)})}async function H(e,t){try{const o=document.createElement("div");t.appendChild(o);const s=window.pdfjsLib;let l=null,u=e;if(e.includes("firebasestorage.googleapis.com"))try{const a=new URL(e).pathname.split("/o/");if(a.length>1){const h=decodeURIComponent(a[1]),c=C(P),d=S(c,h);u=await j(d),console.log("[PDF Viewer] Fetched fresh Firebase token automatically.")}}catch(r){console.warn("[PDF Viewer] Could not refresh Firebase token, falling back to original URL.",r)}if("caches"in window)try{const r=e.split("?"),a=r[0].includes("firebasestorage")?r.join("?"):r[0],c=await(await caches.open("jkssb-pdf-cache-v1")).match(a,{ignoreSearch:!0});if(c){const d=await c.arrayBuffer();l=new Uint8Array(d)}}catch{}if(!l)try{const r=await fetch(u,{mode:"cors"});if(!r.ok)throw new Error(`Network response was not ok(${r.status})`);const a=await r.arrayBuffer();l=new Uint8Array(a)}catch(r){console.warn("Fetch failed, falling back to PDF.js native loader:",r)}const p=await(l?s.getDocument({data:l}):s.getDocument({url:u,withCredentials:!1})).promise;o.remove();const f=p.numPages;for(let r=1;r<=f;r++){const a=await p.getPage(r),h=window.devicePixelRatio||1;let c=a.getViewport({scale:1}),d=(window.innerWidth-12)/c.width;d>1.8&&(d=1.8),d<.5&&(d=.5),c=a.getViewport({scale:d});const g=document.createElement("div");g.className="pdf-page-wrap",g.dataset.baseWidth=c.width.toString(),g.dataset.baseHeight=c.height.toString(),g.style.cssText=`
                position: relative;
                margin - bottom: 8px;
                background: white;
                box - shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
                border - radius: 4px;
                overflow: hidden;
                `;const m=document.createElement("canvas"),n=m.getContext("2d");m.width=c.width*h,m.height=c.height*h,m.style.width=`${c.width} px`,m.style.height=`${c.height} px`,m.style.display="block",n.scale(h,h),g.appendChild(m),t.appendChild(g),await a.render({canvasContext:n,viewport:c}).promise}}catch(o){console.error("PDF Render Error",o);const s=o?.message||o?.name||String(o);t.innerHTML=`
                    < div style = "color:#ef4444; margin-top:30vh; font-family:Poppins; text-align:center; padding: 0 20px;" >
                        <h3>Failed to load document </h3>
                            < p style = "font-size: 13px; opacity: 0.8; word-break: break-all;" > Error Details: ${s} </p>
                                < p style = "font-size: 12px; margin-top:20px;" > (If this says "Network response was not ok" or "Failed to fetch", your Firebase Storage bucket is actively blocking this website.You must apply the CORS rules in Google Cloud Shell).</p>
            </div>
                `}}if(window.location.pathname.includes("pdf-viewer.html")){const t=new URLSearchParams(window.location.search).get("url");t&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>D(t)):D(t))}

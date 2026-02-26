import"./firebase-config-CsUtaHqz.js";/* empty css               */import"./global-pdf-viewer-PBUvBJhC.js";import{o as P}from"./auth-service-BYs2Equ7.js";import{i as C,a as D,b as A,f as Q,n as $,o as F,p as S,q as x}from"./admin-service-CQyGqwJl.js";import{d as L,p as k}from"./excel-parser-DjJFnkkE.js";import{a as y,s as r}from"./admin-toast-8NJD7knF.js";const B=async g=>new Promise((e,i)=>{const t=new FileReader;t.onload=s=>{var n;try{const a=(n=s.target)==null?void 0:n.result,l=JSON.parse(a),o=I(l);o.length===0?i(new Error("No valid questions found in the JSON file.")):e(o)}catch{i(new Error("Failed to parse JSON file. Please ensure it is a valid Google Form export."))}},t.onerror=()=>i(new Error("Failed to read file")),t.readAsText(g)});function I(g){var i;return Array.isArray(g)?g.map(t=>{const s=t.question||t.Question||"",n=Array.isArray(t.options)?t.options.map(String):[t.option1||"",t.option2||"",t.option3||"",t.option4||""],a=typeof t.correctAnswer=="number"?t.correctAnswer:parseInt(t.correctAnswer??"1")-1,l=t.explanation||t.Explanation||"";return!s||n.filter(Boolean).length<2?null:{question:s,options:n,correctAnswer:a,explanation:l}}).filter(Boolean):((g==null?void 0:g.items)??((i=g==null?void 0:g.form)==null?void 0:i.items)??[]).map(t=>{var q,d,c,p,v,m;const s=t==null?void 0:t.questionItem;if(!s)return null;const n=t.title||"",a=(q=s==null?void 0:s.question)==null?void 0:q.choiceQuestion;if(!a)return null;const l=(a.options??[]).map(h=>typeof h=="string"?h:h.value??h.label??""),o=(d=s==null?void 0:s.question)==null?void 0:d.grading,u=((p=(c=o==null?void 0:o.correctAnswers)==null?void 0:c.answers)==null?void 0:p.map(h=>h.value??h.answer??""))??[];let b=0;if(u.length>0){const h=l.findIndex(w=>u.includes(w));b=h>=0?h:0}const f=((v=o==null?void 0:o.generalFeedback)==null?void 0:v.text)??((m=o==null?void 0:o.whenRight)==null?void 0:m.text)??"";return!n||l.filter(Boolean).length<2?null:{question:n,options:l,correctAnswer:b,explanation:f}}).filter(Boolean)}const T=()=>{const g=[{question:"What is the capital of India?",options:["Mumbai","Delhi","Kolkata","Chennai"],correctAnswer:1,explanation:"Delhi (New Delhi) has been the capital since 1911."},{question:"How many cylinders does a standard 4-stroke engine have?",options:["2","4","6","8"],correctAnswer:1,explanation:"Most standard cars use a 4-cylinder 4-stroke engine."}],e=new Blob([JSON.stringify(g,null,2)],{type:"application/json"}),i=URL.createObjectURL(e),t=document.createElement("a");t.href=i,t.download="quiz_template.json",t.click(),URL.revokeObjectURL(i)};class M{constructor(){this.allCourses=[],this.allPDFs=[],this.activePdfCourseId="",this.activeQuizCourseId="",this.activePdfProgressEl=null,this.pendingQuizQuestions={},this.courseFoldersContainer=document.getElementById("course-folders-container"),this.refreshBtn=document.getElementById("refresh-btn"),this.globalPdfInput=document.getElementById("global-pdf-input"),this.globalQuizInput=document.getElementById("global-quiz-input"),this.init()}async init(){P(async e=>{if(!e){window.location.href="./admin-login.html";return}if(!await C(e)){window.location.href="./admin-login.html";return}this.bindGlobalInputs(),this.refreshBtn.addEventListener("click",()=>this.loadData()),await this.loadData()},!0)}async loadData(){this.courseFoldersContainer.innerHTML=`
      <div class="skeleton-card" style="margin-bottom: var(--spacing-sm); padding: var(--spacing-md);"><div class="skeleton skeleton-title" style="margin-bottom:0;"></div></div>
      <div class="skeleton-card" style="margin-bottom: var(--spacing-sm); padding: var(--spacing-md);"><div class="skeleton skeleton-title" style="margin-bottom:0;"></div></div>
      <div class="skeleton-card" style="margin-bottom: var(--spacing-sm); padding: var(--spacing-md);"><div class="skeleton skeleton-title" style="margin-bottom:0;"></div></div>
    `;const[e,i]=await Promise.all([D(),A()]);this.allCourses=e.courses??[],this.allPDFs=i.pdfs??[],await this.renderAllFolders()}async renderAllFolders(){var t;if(this.allCourses.length===0){this.courseFoldersContainer.innerHTML='<p style="text-align:center;color:#64748B;padding:2rem;">No courses found. Create a course first.</p>';return}const e={};await Promise.all(this.allCourses.map(async s=>{if(!s.id)return;const n=await Q(s.id);e[s.id]=n.tests??[]}));let i="";this.allCourses.forEach(s=>{if(!s.id)return;const n=this.allPDFs.filter(o=>{var u;return(u=s.pdfIds)==null?void 0:u.includes(o.id??"")}),a=e[s.id]??[],l=n.length+a.length;i+=this.buildCourseFolder(s,n,a,l)}),this.courseFoldersContainer.innerHTML=i,this.attachFolderEventListeners(),(t=window.lucide)==null||t.createIcons()}buildCourseFolder(e,i,t,s){return`
      <div class="course-folder" data-course-id="${e.id}">
        <div class="folder-header" data-course-id="${e.id}">
          <i data-lucide="folder-open" class="folder-icon" width="20" height="20"></i>
          <span class="folder-title">${e.title}</span>
          <span class="folder-count">${s} items</span>
          <i data-lucide="chevron-down" class="chevron-icon" width="18" height="18"></i>
        </div>

        <div class="subfolders-container hidden" id="folder-content-${e.id}">
          <!-- PDFs Subfolder -->
          <div class="subfolder">
            <div class="subfolder-header">
              <i data-lucide="file-text" class="subfolder-icon pdf-icon" width="16" height="16"></i>
              <span class="subfolder-title">📄 PDFs</span>
              <span class="subfolder-count" id="pdf-count-${e.id}">${i.length} files</span>
              <button
                class="subfolder-upload-btn pdf-upload trigger-pdf-upload"
                data-course-id="${e.id}"
                title="Select one or more PDFs to upload">
                <i data-lucide="upload" width="12" height="12"></i> Upload PDFs
              </button>
            </div>

            <div class="subfolder-content" id="pdf-list-${e.id}">
              ${i.length>0?i.map(n=>this.buildPDFCard(n,e.id)).join(""):'<p class="empty-state">No PDFs uploaded yet.</p>'}
            </div>
          </div>

          <!-- Quiz/MCQ Subfolder -->
          <div class="subfolder">
            <div class="subfolder-header">
              <i data-lucide="pencil-line" class="subfolder-icon quiz-icon" width="16" height="16"></i>
              <span class="subfolder-title">🧪 Quiz / MCQs</span>
              <span class="subfolder-count" id="quiz-count-${e.id}">${t.length} quizzes</span>
              <button
                class="subfolder-upload-btn quiz-upload toggle-quiz-form"
                data-course-id="${e.id}"
                title="Add quiz to this course">
                <i data-lucide="plus" width="12" height="12"></i> Add Quiz
              </button>
            </div>

            <!-- Inline quiz creation form (hidden by default) -->
            <div class="quiz-inline-form hidden" id="quiz-form-${e.id}">
              <h4>
                <i data-lucide="brain" width="14" height="14"></i>
                New Quiz for "${e.title}"
              </h4>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Quiz Title *</label>
                  <input type="text" class="form-input quiz-title-input" placeholder="e.g. Traffic Signs MCQ" required>
                </div>
                <div class="form-group">
                  <label class="form-label">Duration (minutes) *</label>
                  <input type="number" class="form-input quiz-duration-input" placeholder="30" min="1" required>
                </div>
              </div>

              <div class="form-group" style="margin-bottom:0.75rem;">
                <label class="form-label">Description (optional)</label>
                <input type="text" class="form-input quiz-desc-input" placeholder="Brief description">
              </div>

              <!-- File upload zone -->
              <div class="file-drop-zone quiz-drop-zone" data-course-id="${e.id}">
                <input type="file" class="quiz-file-input" accept=".xlsx,.xls,.json">
                <p><strong>Click or drag</strong> an Excel (.xlsx) or Google Form JSON (.json) file here</p>
                <p style="margin-top:0.25rem;font-size:0.75rem;">Max 10 MB</p>
              </div>

              <div class="file-name-label hidden quiz-file-label"></div>

              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
                <div>
                  <button class="btn-download-template dl-excel-template">
                    <i data-lucide="download" width="12" height="12"></i> Excel template
                  </button>
                  &nbsp;·&nbsp;
                  <button class="btn-download-template dl-json-template">
                    <i data-lucide="download" width="12" height="12"></i> JSON template
                  </button>
                </div>
              </div>

              <div class="quiz-form-actions">
                <button class="btn-quiz-submit submit-quiz-btn" data-course-id="${e.id}">
                  <i data-lucide="save" width="14" height="14"></i> Save Quiz
                </button>
                <button class="btn-quiz-cancel cancel-quiz-form" data-course-id="${e.id}">Cancel</button>
              </div>
            </div>

            <div class="subfolder-content" id="quiz-list-${e.id}">
              ${t.length>0?t.map(n=>this.buildQuizCard(n)).join(""):'<p class="empty-state">No quizzes yet.</p>'}
            </div>
          </div>
        </div>
      </div>`}buildPDFCard(e,i){const t=(e.size/1048576).toFixed(2);return`
      <div class="pdf-card" data-id="${e.id}">
        <div class="pdf-icon-wrapper">
          <i data-lucide="file-text" width="16" height="16"></i>
        </div>
        <div class="pdf-info">
          <div class="pdf-name" title="${e.name}">${e.name}</div>
          <div class="pdf-meta">${t} MB</div>
        </div>
        <div class="pdf-actions">
          <a href="./pdf-viewer.html?name=${encodeURIComponent(e.name)}&url=${encodeURIComponent(e.url)}" class="btn-icon" title="Preview">
            <i data-lucide="eye" width="16" height="16"></i>
          </a>
          <button class="btn-icon delete delete-pdf-btn" data-id="${e.id}" data-url="${e.url}" data-course-id="${i}" title="Delete">
            <i data-lucide="trash-2" width="16" height="16"></i>
          </button>
        </div>
      </div>`}buildQuizCard(e){var i;return`
      <div class="quiz-card" data-id="${e.id}">
        <div class="quiz-icon-wrapper">
          <i data-lucide="brain" width="16" height="16"></i>
        </div>
        <div class="pdf-info">
          <div class="pdf-name">${e.title}</div>
          <div class="quiz-meta-row">
            <span class="quiz-meta"><i data-lucide="help-circle" width="12" height="12"></i> ${((i=e.questions)==null?void 0:i.length)??0} questions</span>
            <span class="quiz-meta"><i data-lucide="clock" width="12" height="12"></i> ${e.duration} min</span>
          </div>
        </div>
        <div class="pdf-actions">
          <button class="btn-icon delete delete-quiz-btn" data-id="${e.id}" title="Delete quiz">
            <i data-lucide="trash-2" width="16" height="16"></i>
          </button>
        </div>
      </div>`}attachFolderEventListeners(){document.querySelectorAll(".folder-header").forEach(e=>{e.addEventListener("click",()=>{const i=e.getAttribute("data-course-id"),t=document.getElementById(`folder-content-${i}`),s=e.querySelector(".chevron-icon");t==null||t.classList.toggle("hidden"),s==null||s.classList.toggle("rotate-180")})}),document.querySelectorAll(".trigger-pdf-upload").forEach(e=>{e.addEventListener("click",i=>{i.stopPropagation();const t=e.getAttribute("data-course-id"),s=e.getAttribute("data-progress-id");this.activePdfCourseId=t,this.activePdfProgressEl=document.getElementById(s),this.globalPdfInput.value="",this.globalPdfInput.click()})}),document.querySelectorAll(".toggle-quiz-form").forEach(e=>{e.addEventListener("click",i=>{var n;i.stopPropagation();const t=e.getAttribute("data-course-id"),s=document.getElementById(`quiz-form-${t}`);s.classList.toggle("hidden"),e.textContent=s.classList.contains("hidden")?"+ Add Quiz":"✕ Close",(n=window.lucide)==null||n.createIcons()})}),document.querySelectorAll(".cancel-quiz-form").forEach(e=>{e.addEventListener("click",()=>{const i=e.getAttribute("data-course-id");this.resetQuizForm(i)})}),document.querySelectorAll(".quiz-drop-zone").forEach(e=>{const i=e.querySelector(".quiz-file-input"),t=e.getAttribute("data-course-id");e.addEventListener("click",()=>i.click()),e.addEventListener("dragover",s=>{s.preventDefault(),e.classList.add("dragover")}),e.addEventListener("dragleave",()=>e.classList.remove("dragover")),e.addEventListener("drop",s=>{var n;s.preventDefault(),e.classList.remove("dragover"),(n=s.dataTransfer)!=null&&n.files[0]&&this.onQuizFileSelected(s.dataTransfer.files[0],t)}),i.addEventListener("change",()=>{var s;(s=i.files)!=null&&s[0]&&this.onQuizFileSelected(i.files[0],t)})}),document.querySelectorAll(".submit-quiz-btn").forEach(e=>{e.addEventListener("click",()=>{const i=e.getAttribute("data-course-id");this.onSubmitQuiz(i,e)})}),document.querySelectorAll(".dl-excel-template").forEach(e=>{e.addEventListener("click",()=>L())}),document.querySelectorAll(".dl-json-template").forEach(e=>{e.addEventListener("click",()=>T())}),document.querySelectorAll(".delete-pdf-btn").forEach(e=>{e.addEventListener("click",async()=>{var l;const i=e.getAttribute("data-id"),t=e.getAttribute("data-url"),s=e.getAttribute("data-course-id");if(!await y("Delete PDF?","This will remove the PDF from the course.","Delete PDF"))return;e.disabled=!0;const a=await $(i,t,s);a.success?((l=e.closest(".pdf-card"))==null||l.remove(),this.updatePDFCount(s),r("PDF deleted.","success")):(r("Error: "+a.error,"error"),e.disabled=!1)})}),document.querySelectorAll(".delete-quiz-btn").forEach(e=>{e.addEventListener("click",async()=>{var n;const i=e.getAttribute("data-id");if(!await y("Delete Quiz?","This will permanently delete the quiz and all its questions.","Delete Quiz"))return;e.disabled=!0;const s=await F(i);s.success?((n=e.closest(".quiz-card"))==null||n.remove(),r("Quiz deleted.","success")):(r("Error: "+s.error,"error"),e.disabled=!1)})})}bindGlobalInputs(){this.globalPdfInput.addEventListener("change",async()=>{var q;const e=Array.from(this.globalPdfInput.files??[]);if(this.globalPdfInput.value="",!e.length||!this.activePdfCourseId)return;const i=this.activePdfCourseId,t=document.getElementById(`pdf-list-${i}`),s=new Set(Array.from((t==null?void 0:t.querySelectorAll(".pdf-name"))??[]).map(d=>{var c;return((c=d.textContent)==null?void 0:c.trim())??""})),n=[];for(const d of e)s.has(d.name)?r(`"${d.name}" is already in this folder — skipped.`,"warning",4e3):n.push(d);if(n.length===0)return;const a=`upload-queue-${i}`;let l=document.getElementById(a);l||(l=document.createElement("div"),l.id=a,l.className="upload-queue",(q=t==null?void 0:t.parentElement)==null||q.insertBefore(l,t));const o=n.map((d,c)=>{const p=`uq-${i}-${Date.now()}-${c}`,v=d.name.length>32?d.name.substring(0,30)+"…":d.name,m=document.createElement("div");return m.id=p,m.className="upload-queue-item",m.innerHTML=`
          <div class="uq-meta">
            <span class="uq-icon">📄</span>
            <span class="uq-name" title="${d.name}">${v}</span>
            <span class="uq-pct" id="${p}-pct">0%</span>
          </div>
          <div class="uq-bar-bg"><div class="uq-bar-fill" id="${p}-fill" style="width:0%"></div></div>
        `,l.appendChild(m),p}),u=await Promise.all(n.map((d,c)=>this.uploadOnePDF(d,i,p=>{const v=document.getElementById(`${o[c]}-fill`),m=document.getElementById(`${o[c]}-pct`);v&&(v.style.width=`${p}%`),m&&(m.textContent=`${p}%`)}).finally(()=>{setTimeout(()=>{const p=document.getElementById(o[c]);p&&(p.style.opacity="0",p.style.transition="opacity 0.4s"),setTimeout(()=>{var v;return(v=document.getElementById(o[c]))==null?void 0:v.remove()},450)},700)})));setTimeout(()=>{l!=null&&l.children.length||l==null||l.remove()},1200);const b=u.filter(Boolean).length,f=u.length-b;u.length>1&&(f===0?r(`All ${u.length} PDFs uploaded!`,"success"):r(`${b} uploaded, ${f} failed.`,f===u.length?"error":"warning"))})}async onQuizFileSelected(e,i){const t=document.querySelector(`#quiz-form-${i} .quiz-file-label`);t&&(t.textContent="Parsing file…",t.classList.remove("hidden"));try{let s;e.name.endsWith(".json")?s=await B(e):s=await k(e),this.pendingQuizQuestions[i]={questions:s,fileName:e.name},t&&(t.textContent=`✓ ${s.length} questions loaded from "${e.name}"`),r(`${s.length} questions loaded!`,"success",2500)}catch(s){r("Error parsing file: "+s.message,"error"),t&&(t.textContent=""),delete this.pendingQuizQuestions[i]}}async onSubmitQuiz(e,i){var u,b,f,q,d;const t=document.getElementById(`quiz-form-${e}`),s=((u=t.querySelector(".quiz-title-input"))==null?void 0:u.value.trim())??"",n=parseInt(((b=t.querySelector(".quiz-duration-input"))==null?void 0:b.value)??"0"),a=((f=t.querySelector(".quiz-desc-input"))==null?void 0:f.value.trim())??"",l=this.pendingQuizQuestions[e];if(!s){r("Please enter a quiz title.","warning");return}if(!n||n<1){r("Please enter a valid duration (minutes).","warning");return}if(!l||l.questions.length===0){r("Please upload an Excel or Google Form JSON file with questions.","warning");return}i.disabled=!0,i.textContent="Saving…";const o=await S({title:s,description:a,questions:l.questions,duration:n,courseId:e});if(o.success){const c=document.getElementById(`quiz-list-${e}`),p=c.querySelector(".empty-state");p==null||p.remove();const v={id:o.id,title:s,description:a,questions:l.questions,duration:n,courseId:e,createdAt:null};c.insertAdjacentHTML("beforeend",this.buildQuizCard(v));const m=c.querySelector(`.delete-quiz-btn[data-id="${o.id}"]`);m&&m.addEventListener("click",async()=>{var E;if(!await y("Delete Quiz?","This will permanently delete the quiz.","Delete Quiz"))return;m.disabled=!0;const z=await F(o.id);z.success?((E=m.closest(".quiz-card"))==null||E.remove(),r("Quiz deleted.","success")):(r("Error: "+z.error,"error"),m.disabled=!1)});const h=document.getElementById(`quiz-count-${e}`);if(h){const w=parseInt(h.textContent??"0");h.textContent=`${w+1} quizzes`}r("Quiz saved successfully!","success"),delete this.pendingQuizQuestions[e],this.resetQuizForm(e),(q=window.lucide)==null||q.createIcons()}else r("Error saving quiz: "+o.error,"error");i.disabled=!1,i.innerHTML='<i data-lucide="save" width="14" height="14"></i> Save Quiz',(d=window.lucide)==null||d.createIcons()}resetQuizForm(e){var n;const i=document.getElementById(`quiz-form-${e}`);if(!i)return;i.querySelector(".quiz-title-input").value="",i.querySelector(".quiz-duration-input").value="",i.querySelector(".quiz-desc-input").value="",i.querySelector(".quiz-file-input").value="";const t=i.querySelector(".quiz-file-label");t&&(t.textContent="",t.classList.add("hidden")),i.classList.add("hidden"),delete this.pendingQuizQuestions[e];const s=document.querySelector(`.toggle-quiz-form[data-course-id="${e}"]`);s&&(s.innerHTML='<i data-lucide="plus" width="12" height="12"></i> Add Quiz'),(n=window.lucide)==null||n.createIcons()}async uploadOnePDF(e,i,t){var n,a,l,o;const s=await x(e,i,t);if(s.success){const u=document.getElementById(`pdf-list-${i}`);(n=u.querySelector(".empty-state"))==null||n.remove();const b={id:s.id,name:e.name,url:s.url,size:e.size,uploadedAt:null};u.insertAdjacentHTML("beforeend",this.buildPDFCard(b,i));const f=u.querySelector(`.delete-pdf-btn[data-id="${s.id}"]`);return f&&f.addEventListener("click",async()=>{var c;if(!await y("Delete PDF?","This will remove the PDF from this course.","Delete PDF"))return;f.disabled=!0;const d=await $(s.id,s.url,i);d.success?((c=f.closest(".pdf-card"))==null||c.remove(),this.updatePDFCount(i),r("PDF deleted.","success")):(r("Error: "+d.error,"error"),f.disabled=!1)}),this.updatePDFCount(i),(a=window.lucide)==null||a.createIcons(),e===(((l=this.globalPdfInput.files)==null?void 0:l[0])??e)&&(((o=this.globalPdfInput.files)==null?void 0:o.length)??0)<=1&&r(`"${e.name}" uploaded!`,"success"),!0}else return r(`Failed "${e.name}": `+s.error,"error"),!1}async uploadPDF(e,i){return this.uploadOnePDF(e,i,()=>{})}updatePDFCount(e){const i=document.getElementById(`pdf-list-${e}`),t=document.getElementById(`pdf-count-${e}`);if(!i||!t)return;const s=i.querySelectorAll(".pdf-card").length;t.textContent=`${s} files`}}new M;

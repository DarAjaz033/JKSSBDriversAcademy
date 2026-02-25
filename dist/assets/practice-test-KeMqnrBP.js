import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css               */import{d as o,a,g as d}from"./firebase-config-DyDltD9C.js";import{e as r}from"./escape-html-BUkjI-KV.js";class c{constructor(){this.test=null,this.currentQuestionIndex=0,this.userAnswers=[],this.showingResults=!1,this.testContent=document.getElementById("test-content"),this.init()}async init(){const s=new URLSearchParams(window.location.search).get("id");if(!s){this.testContent.innerHTML='<div style="text-align: center; padding: var(--spacing-xl);">Test not found</div>';return}await this.loadTest(s)}async loadTest(t){try{const s=o(a,"practiceTests",t),e=await d(s);e.exists()?(this.test={id:e.id,...e.data()},this.userAnswers=new Array(this.test.questions.length).fill(null),this.renderTest()):this.testContent.innerHTML='<div style="text-align: center; padding: var(--spacing-xl);">Test not found</div>'}catch{this.testContent.innerHTML='<div style="text-align: center; padding: var(--spacing-xl);">Error loading test</div>'}}renderTest(){this.test&&(this.testContent.innerHTML=`
      <div class="test-header">
        <div class="test-title">${this.test.title}</div>
        <div class="test-meta">
          <span>${this.test.questions.length} Questions</span>
          <span>•</span>
          <span>${this.test.duration} Minutes</span>
        </div>
      </div>
      ${this.renderQuestion()}
    `,this.attachEventListeners(),window.lucide.createIcons())}renderQuestion(){if(!this.test)return"";const t=this.test.questions[this.currentQuestionIndex],s=this.currentQuestionIndex===this.test.questions.length-1,e=this.userAnswers[this.currentQuestionIndex];return`
      <div class="question-card">
        <div class="question-number">Question ${this.currentQuestionIndex+1} of ${this.test.questions.length}</div>
        <div class="question-text">${r(t.question)}</div>
        <div class="options-list">
          ${t.options.map((i,n)=>`
            <div class="option-item ${e===n?"selected":""}" data-index="${n}">
              <div class="option-radio ${e===n?"selected":""}"></div>
              <div class="option-text">${r(i)}</div>
            </div>
          `).join("")}
        </div>
      </div>

      <div class="test-nav">
        <button class="btn btn-secondary" id="prev-btn" ${this.currentQuestionIndex===0?"disabled":""}>
          Previous
        </button>
        <button class="btn btn-primary" id="next-btn">
          ${s?"Submit Test":"Next Question"}
        </button>
      </div>
    `}attachEventListeners(){document.querySelectorAll(".option-item").forEach(e=>{e.addEventListener("click",i=>{const n=parseInt(i.currentTarget.getAttribute("data-index"));this.selectAnswer(n)})});const t=document.getElementById("prev-btn"),s=document.getElementById("next-btn");t&&t.addEventListener("click",()=>this.previousQuestion()),s&&s.addEventListener("click",()=>this.nextQuestion())}selectAnswer(t){this.userAnswers[this.currentQuestionIndex]=t,this.renderTest()}previousQuestion(){this.currentQuestionIndex>0&&(this.currentQuestionIndex--,this.renderTest())}nextQuestion(){this.currentQuestionIndex===this.test.questions.length-1?this.showResults():(this.currentQuestionIndex++,this.renderTest())}showResults(){if(!this.test)return;let t=0;this.test.questions.forEach((e,i)=>{this.userAnswers[i]===e.correctAnswer&&t++});const s=Math.round(t/this.test.questions.length*100);this.testContent.innerHTML=`
      <div class="results-card">
        <div class="test-title">Test Completed!</div>
        <div class="results-score">${s}%</div>
        <div class="results-stats">
          <div class="stat-item">
            <div class="stat-value" style="color: #16A34A;">${t}</div>
            <div class="stat-label">Correct</div>
          </div>
          <div class="stat-item">
            <div class="stat-value" style="color: #DC2626;">${this.test.questions.length-t}</div>
            <div class="stat-label">Wrong</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">${this.test.questions.length}</div>
            <div class="stat-label">Total</div>
          </div>
        </div>
        <div style="display: flex; gap: var(--spacing-sm); justify-content: center; margin-top: var(--spacing-lg);">
          <button class="btn btn-primary" onclick="location.reload()">Retake Test</button>
          <button class="btn btn-secondary" onclick="window.history.back()">Back to Courses</button>
        </div>
      </div>
    `,window.lucide.createIcons()}}new c;

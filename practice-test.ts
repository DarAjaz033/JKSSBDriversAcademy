import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase-config';
import { PracticeTest, Question } from './admin-service';
import { escapeHtml } from './utils/escape-html';

type TestState = 'LOBBY' | 'IN_PROGRESS' | 'RESULTS' | 'REVIEW';

class PracticeTestPage {
  private testContent: HTMLElement;
  private test: PracticeTest | null = null;
  private currentQuestionIndex = 0;
  private userAnswers: (number | null)[] = [];

  private currentState: TestState = 'LOBBY';
  private timerInterval: number | null = null;
  private timeRemaining = 0; // in seconds

  constructor() {
    this.testContent = document.getElementById('test-content') as HTMLElement;
    this.init();
  }

  private async init(): Promise<void> {
    const urlParams = new URLSearchParams(window.location.search);
    const testId = urlParams.get('id');

    if (!testId) {
      this.testContent.innerHTML = '<div style="text-align: center; padding: var(--spacing-xl);">Test not found</div>';
      return;
    }

    await this.loadTest(testId);
  }

  private async loadTest(testId: string): Promise<void> {
    try {
      const docRef = doc(db, 'practiceTests', testId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        this.test = { id: docSnap.id, ...docSnap.data() } as PracticeTest;
        this.userAnswers = new Array(this.test.questions.length).fill(null);
        const totalMins = this.test.questions.length;
        this.timeRemaining = totalMins * 60;

        this.render();
      } else {
        this.testContent.innerHTML = '<div style="text-align: center; padding: var(--spacing-xl);">Test not found</div>';
      }
    } catch (error) {
      this.testContent.innerHTML = '<div style="text-align: center; padding: var(--spacing-xl);">Error loading test</div>';
    }
  }

  private render(): void {
    if (!this.test) return;

    if (this.currentState === 'IN_PROGRESS') {
      document.body.classList.add('is-testing');
    } else {
      document.body.classList.remove('is-testing');
    }

    switch (this.currentState) {
      case 'LOBBY': this.renderLobby(); break;
      case 'IN_PROGRESS': this.renderActiveTest(); break;
      case 'REVIEW': this.renderActiveTest(true); break;
      case 'RESULTS': this.renderResults(); break;
    }
  }

  private renderLobby(): void {
    if (!this.test) return;

    const totalQuestions = this.test.questions.length;
    const totalMarks = totalQuestions * 1;

    this.testContent.innerHTML = `
      <div class="lobby-card">
        <h1 class="lobby-title">${this.test.title}</h1>
        
        <div class="lobby-instructions">
          <h3><i data-lucide="info" width="20"></i> Important Instructions</h3>
          <ul>
            <li><i data-lucide="check-circle-2" width="16" color="#16A34A"></i> <strong>Total Questions:</strong> ${totalQuestions}</li>
            <li><i data-lucide="award" width="16" color="#EAB308"></i> <strong>Total Marks:</strong> ${totalMarks}</li>
            <li><i data-lucide="clock" width="16" color="#3B82F6"></i> <strong>Time limit:</strong> 1 Minute per Question (${totalQuestions} mins total)</li>
            <li><i data-lucide="alert-triangle" width="16" color="#DC2626"></i> <strong>Negative Marking:</strong> 0.25 marks deducted per wrong answer.</li>
            <li><i data-lucide="maximize" width="16" color="#7C3AED"></i> <strong>Fullscreen:</strong> Test will enforce fullscreen mode. Exiting may pause or flag the attempt.</li>
          </ul>
        </div>

        <button class="btn btn-primary" id="start-test-btn" style="width: 100%; font-size: 16px; padding: 14px;">
          Start Test Now
        </button>
      </div>
    `;

    document.getElementById('start-test-btn')?.addEventListener('click', () => this.startTest());
    (window as any).lucide.createIcons();
  }

  private async startTest() {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
    } catch (e) {
      console.warn("Fullscreen API block:", e);
    }

    document.addEventListener('fullscreenchange', this.handleFullscreenChange);

    this.currentState = 'IN_PROGRESS';
    this.startTimer();
    this.render();
  }

  private handleFullscreenChange = () => {
    if (!document.fullscreenElement && this.currentState === 'IN_PROGRESS') {
      this.pauseTimer();
      this.showAntiCheatWarning();
    }
  }

  private showAntiCheatWarning() {
    let overlay = document.getElementById('warn-modal');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'warn-modal';
      overlay.className = 'modal-overlay';
      overlay.innerHTML = `
        <div class="modal-content">
          <i data-lucide="alert-octagon" width="48" height="48" color="#DC2626" style="margin: 0 auto 16px;"></i>
          <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 12px;">Test Paused</h2>
          <p style="color: #475569; font-size: 14px; margin-bottom: 24px; line-height: 1.5;">
            You have exited full-screen mode. This is prohibited during an active test to prevent cheating. 
            Please resume the test to continue your attempt.
          </p>
          <div style="display: flex; gap: 12px; justify-content: center;">
            <button class="btn btn-secondary" id="warn-submit-btn">Submit Early</button>
            <button class="btn btn-primary" id="warn-resume-btn">Resume Test</button>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);
      (window as any).lucide.createIcons();

      document.getElementById('warn-submit-btn')?.addEventListener('click', () => {
        overlay?.remove();
        this.submitTest();
      });

      document.getElementById('warn-resume-btn')?.addEventListener('click', async () => {
        try {
          if (document.documentElement.requestFullscreen) {
            await document.documentElement.requestFullscreen();
          }
        } catch (e) { }
        overlay?.classList.remove('active');
        setTimeout(() => overlay?.remove(), 300);
        this.startTimer();
      });
    }

    requestAnimationFrame(() => {
      overlay?.classList.add('active');
    });
  }

  private startTimer() {
    if (this.timerInterval !== null) window.clearInterval(this.timerInterval);

    this.timerInterval = window.setInterval(() => {
      this.timeRemaining--;
      this.updateTimerUI();

      if (this.timeRemaining <= 0) {
        if (this.timerInterval !== null) window.clearInterval(this.timerInterval);
        this.submitTest();
      }
    }, 1000);
  }

  private pauseTimer() {
    if (this.timerInterval !== null) window.clearInterval(this.timerInterval);
  }

  private updateTimerUI() {
    const mm = Math.floor(this.timeRemaining / 60).toString().padStart(2, '0');
    const ss = (this.timeRemaining % 60).toString().padStart(2, '0');
    const timerEl = document.getElementById('dash-timer-txt');
    if (timerEl) {
      timerEl.textContent = `${mm}:${ss}`;
      const wrapper = document.getElementById('dash-timer-wrap');
      if (this.timeRemaining <= 60 && wrapper) {
        wrapper.classList.add('dash-time-warn');
      }
    }
  }

  private renderActiveTest(isReviewMode: boolean = false): void {
    if (!this.test) return;

    const question = this.test.questions[this.currentQuestionIndex];
    const isFirstQuestion = this.currentQuestionIndex === 0;
    const isLastQuestion = this.currentQuestionIndex === this.test.questions.length - 1;
    const selectedAnswer = this.userAnswers[this.currentQuestionIndex];
    const correctAns = question.correctAnswer;

    let headerHTML = '';
    if (!isReviewMode) {
      const mm = Math.floor(this.timeRemaining / 60).toString().padStart(2, '0');
      const ss = (this.timeRemaining % 60).toString().padStart(2, '0');
      const warnClass = this.timeRemaining <= 60 ? 'dash-time-warn' : '';
      headerHTML = `
        <div class="test-dash-header">
          <button class="btn btn-secondary" id="leave-test-btn" style="padding: 6px 12px; font-size: 12px;">
            <i data-lucide="x" width="14" style="margin-right:4px; vertical-align:middle;"></i>Leave
          </button>
          <div class="dash-timer ${warnClass}" id="dash-timer-wrap">
            <i data-lucide="timer" width="18"></i> <span id="dash-timer-txt">${mm}:${ss}</span>
          </div>
        </div>
      `;
    } else {
      headerHTML = `
        <div class="test-dash-header" style="background: #FOFDFA">
          <button class="btn btn-secondary" id="exit-review-btn" style="padding: 6px 12px; font-size: 12px;">
            <i data-lucide="arrow-left" width="14" style="margin-right:4px; vertical-align:middle;"></i>Back to Results
          </button>
          <div style="font-weight:700; color:#0D9488;">Review Mode</div>
        </div>
      `;
    }

    const optionsHTML = question.options.map((option, index) => {
      let cssClass = '';
      if (isReviewMode) {
        if (index === correctAns) cssClass = 'correct';
        else if (index === selectedAnswer && index !== correctAns) cssClass = 'wrong';

        let indicator = '';
        if (index === correctAns) indicator = '<span style="margin-left:auto; color:#16A34A; font-weight:700; font-size:12px;">Correct Answer</span>';
        else if (index === selectedAnswer) indicator = '<span style="margin-left:auto; color:#DC2626; font-weight:700; font-size:12px;">Your Answer</span>';

        return `
          <div class="option-item ${cssClass}" style="cursor: default;">
            <div class="option-radio ${selectedAnswer === index ? 'selected' : ''}"></div>
            <div class="option-text">${escapeHtml(option)}</div>
            ${indicator}
          </div>
        `;
      } else {
        cssClass = selectedAnswer === index ? 'selected' : '';
        return `
          <div class="option-item selectable-option ${cssClass}" data-index="${index}">
            <div class="option-radio ${selectedAnswer === index ? 'selected' : ''}"></div>
            <div class="option-text">${escapeHtml(option)}</div>
          </div>
        `;
      }
    }).join('');

    const prevBtnHTML = `
      <button class="btn btn-secondary" id="prev-btn" ${isFirstQuestion ? 'disabled' : ''}>
        Back
      </button>
    `;

    let nextBtnHTML = '';
    if (!isReviewMode && isLastQuestion) {
      nextBtnHTML = `
        <button class="btn btn-primary" id="submit-test-btn" style="background:#16A34A;">
          Submit Test
        </button>
      `;
    } else {
      nextBtnHTML = `
        <button class="btn btn-primary" id="next-btn" ${isLastQuestion ? 'disabled' : ''}>
          Next
        </button>
      `;
    }

    this.testContent.innerHTML = `
      ${headerHTML}
      <div class="question-card">
        <div class="question-number">Question ${this.currentQuestionIndex + 1} of ${this.test.questions.length}</div>
        <div class="question-text">${escapeHtml(question.question)}</div>
        <div class="options-list">
          ${optionsHTML}
        </div>
      </div>

      <div class="test-nav">
        ${prevBtnHTML}
        ${nextBtnHTML}
      </div>
    `;

    this.attachActiveTestListeners(isReviewMode);
    (window as any).lucide.createIcons();
  }

  private attachActiveTestListeners(isReviewMode: boolean): void {
    if (!isReviewMode) {
      document.querySelectorAll('.selectable-option').forEach(item => {
        item.addEventListener('click', (e) => {
          const index = parseInt((e.currentTarget as HTMLElement).getAttribute('data-index')!);
          this.userAnswers[this.currentQuestionIndex] = index;
          this.render();
        });
      });
    }

    document.getElementById('prev-btn')?.addEventListener('click', () => {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--;
        this.render();
      }
    });

    document.getElementById('next-btn')?.addEventListener('click', () => {
      if (this.currentQuestionIndex < this.test!.questions.length - 1) {
        this.currentQuestionIndex++;
        this.render();
      }
    });

    document.getElementById('leave-test-btn')?.addEventListener('click', () => this.confirmLeave());
    document.getElementById('exit-review-btn')?.addEventListener('click', () => {
      this.currentState = 'RESULTS';
      this.render();
    });

    document.getElementById('submit-test-btn')?.addEventListener('click', () => this.confirmSubmit());
  }

  private confirmLeave() {
    this.pauseTimer();
    const isSure = confirm("Are you sure you want to completely leave this test? Your progress will be lost.");
    if (isSure) {
      if (document.fullscreenElement) document.exitFullscreen().catch(e => console.warn(e));
      window.history.back();
    } else {
      this.startTimer();
    }
  }

  private confirmSubmit() {
    this.pauseTimer();

    let unanswered = this.userAnswers.filter(a => a === null).length;

    let overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal-content">
        <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 12px;">Submit Test?</h2>
        <p style="color: #475569; font-size: 14px; margin-bottom: 24px; line-height: 1.5;">
          You are about to submit your test. <br>
          <strong style="color: #DC2626">Unanswered Questions: ${unanswered}</strong><br>
          Are you sure you want to proceed?
        </p>
        <div style="display: flex; gap: 12px; justify-content: center;">
          <button class="btn btn-secondary" id="conf-cancel-btn">Back to Test</button>
          <button class="btn btn-primary" id="conf-submit-btn" style="background:#16A34A;">Yes, Submit</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    requestAnimationFrame(() => overlay.classList.add('active'));

    document.getElementById('conf-cancel-btn')?.addEventListener('click', () => {
      overlay.classList.remove('active');
      setTimeout(() => overlay.remove(), 300);
      this.startTimer();
    });

    document.getElementById('conf-submit-btn')?.addEventListener('click', () => {
      overlay.classList.remove('active');
      setTimeout(() => overlay.remove(), 300);
      this.submitTest();
    });
  }

  private submitTest() {
    if (this.timerInterval !== null) window.clearInterval(this.timerInterval);
    document.removeEventListener('fullscreenchange', this.handleFullscreenChange);

    this.currentState = 'RESULTS';
    this.render();
  }

  private renderResults(): void {
    if (!this.test) return;

    let correctCount = 0;
    let wrongCount = 0;
    let unattemptedCount = 0;

    this.test.questions.forEach((question, index) => {
      const uAns = this.userAnswers[index];
      if (uAns === null) {
        unattemptedCount++;
      } else if (uAns === question.correctAnswer) {
        correctCount++;
      } else {
        wrongCount++;
      }
    });

    const totalMarks = (correctCount * 1) - (wrongCount * 0.25);
    const maxMarks = this.test.questions.length;

    this.testContent.innerHTML = `
      <div class="results-card">
        <i data-lucide="check-circle" width="48" height="48" color="#16A34A" style="margin: 0 auto 16px;"></i>
        <div class="test-title">Test Submitted Successfully!</div>
        
        <div style="margin: var(--spacing-xl) 0; padding: var(--spacing-xl); background: #F8FAFC; border-radius: var(--radius-lg); border: 2px solid #E2E8F0;">
          <div style="font-size: 14px; color: #64748B; text-transform: uppercase; font-weight: 700; letter-spacing: 1px; margin-bottom: 8px;">Total Score</div>
          <div class="results-score" style="margin: 0;">${totalMarks.toFixed(2)} <span style="font-size: 20px; color:#94A3B8;">/ ${maxMarks}</span></div>
        </div>

        <div class="results-grid">
          <div class="stat-item" style="background: #DCFCE7; border: 1px solid #BBF7D0;">
            <div class="stat-value" style="color: #16A34A;">${correctCount}</div>
            <div class="stat-label">Correct (+1)</div>
          </div>
          <div class="stat-item" style="background: #FEE2E2; border: 1px solid #FECACA;">
            <div class="stat-value" style="color: #DC2626;">${wrongCount}</div>
            <div class="stat-label">Wrong (-0.25)</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">${unattemptedCount}</div>
            <div class="stat-label">Unattempted (0)</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">${maxMarks}</div>
            <div class="stat-label">Total Questions</div>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 12px; margin-top: var(--spacing-xl);">
          <button class="btn btn-primary" id="review-btn" style="padding: 14px; font-size: 16px;">
            <i data-lucide="eye" width="18" style="margin-right:8px; vertical-align:middle;"></i>See Correct Answers
          </button>
          
          <div style="display: flex; gap: 12px;">
            <button class="btn btn-secondary" onclick="location.reload()" style="flex:1;">Reattempt</button>
            <button class="btn btn-secondary" id="results-leave-btn" style="flex:1;">Leave Test</button>
          </div>
        </div>
      </div>
    `;

    document.getElementById('review-btn')?.addEventListener('click', () => {
      this.currentState = 'REVIEW';
      this.currentQuestionIndex = 0;
      this.render();
    });

    document.getElementById('results-leave-btn')?.addEventListener('click', () => {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(e => console.warn(e));
      }
      window.history.back();
    });
    (window as any).lucide.createIcons();
  }
}

new PracticeTestPage();

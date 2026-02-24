import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase-config';
import { PracticeTest, Question } from './admin-service';
import { escapeHtml } from './utils/escape-html';

class PracticeTestPage {
  private testContent: HTMLElement;
  private test: PracticeTest | null = null;
  private currentQuestionIndex = 0;
  private userAnswers: (number | null)[] = [];
  private showingResults = false;

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
        this.renderTest();
      } else {
        this.testContent.innerHTML = '<div style="text-align: center; padding: var(--spacing-xl);">Test not found</div>';
      }
    } catch (error) {
      this.testContent.innerHTML = '<div style="text-align: center; padding: var(--spacing-xl);">Error loading test</div>';
    }
  }

  private renderTest(): void {
    if (!this.test) return;

    this.testContent.innerHTML = `
      <div class="test-header">
        <div class="test-title">${this.test.title}</div>
        <div class="test-meta">
          <span>${this.test.questions.length} Questions</span>
          <span>•</span>
          <span>${this.test.duration} Minutes</span>
        </div>
      </div>
      ${this.renderQuestion()}
    `;

    this.attachEventListeners();
    (window as any).lucide.createIcons();
  }

  private renderQuestion(): string {
    if (!this.test) return '';

    const question = this.test.questions[this.currentQuestionIndex];
    const isLastQuestion = this.currentQuestionIndex === this.test.questions.length - 1;
    const selectedAnswer = this.userAnswers[this.currentQuestionIndex];

    return `
      <div class="question-card">
        <div class="question-number">Question ${this.currentQuestionIndex + 1} of ${this.test.questions.length}</div>
        <div class="question-text">${escapeHtml(question.question)}</div>
        <div class="options-list">
          ${question.options.map((option, index) => `
            <div class="option-item ${selectedAnswer === index ? 'selected' : ''}" data-index="${index}">
              <div class="option-radio ${selectedAnswer === index ? 'selected' : ''}"></div>
              <div class="option-text">${escapeHtml(option)}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="test-nav">
        <button class="btn btn-secondary" id="prev-btn" ${this.currentQuestionIndex === 0 ? 'disabled' : ''}>
          Previous
        </button>
        <button class="btn btn-primary" id="next-btn">
          ${isLastQuestion ? 'Submit Test' : 'Next Question'}
        </button>
      </div>
    `;
  }

  private attachEventListeners(): void {
    document.querySelectorAll('.option-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const index = parseInt((e.currentTarget as HTMLElement).getAttribute('data-index')!);
        this.selectAnswer(index);
      });
    });

    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.previousQuestion());
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.nextQuestion());
    }
  }

  private selectAnswer(index: number): void {
    this.userAnswers[this.currentQuestionIndex] = index;
    this.renderTest();
  }

  private previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.renderTest();
    }
  }

  private nextQuestion(): void {
    if (this.currentQuestionIndex === this.test!.questions.length - 1) {
      this.showResults();
    } else {
      this.currentQuestionIndex++;
      this.renderTest();
    }
  }

  private showResults(): void {
    if (!this.test) return;

    let correctAnswers = 0;
    this.test.questions.forEach((question, index) => {
      if (this.userAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const percentage = Math.round((correctAnswers / this.test.questions.length) * 100);

    this.testContent.innerHTML = `
      <div class="results-card">
        <div class="test-title">Test Completed!</div>
        <div class="results-score">${percentage}%</div>
        <div class="results-stats">
          <div class="stat-item">
            <div class="stat-value" style="color: #16A34A;">${correctAnswers}</div>
            <div class="stat-label">Correct</div>
          </div>
          <div class="stat-item">
            <div class="stat-value" style="color: #DC2626;">${this.test.questions.length - correctAnswers}</div>
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
    `;

    (window as any).lucide.createIcons();
  }
}

new PracticeTestPage();

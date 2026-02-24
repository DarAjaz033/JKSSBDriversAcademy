import { db } from './firebase-config';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

interface PracticeTest {
  id: string;
  title: string;
  description: string;
  questions: any[];
  duration: number;
  courseId?: string;
}

class MockTestsPage {
  private testsContainer: HTMLElement | null;

  constructor() {
    this.testsContainer = document.querySelector('.menu-list');
    this.init();
  }

  private async init(): Promise<void> {
    await this.loadTests();
  }

  private async loadTests(): Promise<void> {
    if (!this.testsContainer) return;

    try {
      const testsQuery = query(collection(db, 'practiceTests'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(testsQuery);

      if (querySnapshot.empty) {
        this.testsContainer.innerHTML = `
          <div class="alert-card info">
            <div class="alert-icon">
              <i data-lucide="info"></i>
            </div>
            <div class="alert-content">
              <h3>No Tests Available</h3>
              <p>Practice tests are being prepared. Check back soon!</p>
            </div>
          </div>
        `;
        (window as any).lucide.createIcons();
        return;
      }

      const tests: PracticeTest[] = [];
      querySnapshot.forEach((doc) => {
        tests.push({ id: doc.id, ...doc.data() } as PracticeTest);
      });

      this.testsContainer.innerHTML = tests.map(test => this.renderTestItem(test)).join('');
      (window as any).lucide.createIcons();
    } catch (error) {
      console.error('Error loading tests:', error);
      if (this.testsContainer) {
        this.testsContainer.innerHTML = `
          <div class="alert-card error">
            <div class="alert-icon">
              <i data-lucide="alert-circle"></i>
            </div>
            <div class="alert-content">
              <h3>Error Loading Tests</h3>
              <p>Unable to load practice tests. Please refresh the page.</p>
            </div>
          </div>
        `;
        (window as any).lucide.createIcons();
      }
    }
  }

  private renderTestItem(test: PracticeTest): string {
    return `
      <a href="./practice-test.html?id=${test.id}" class="menu-item">
        <div class="menu-icon">
          <i data-lucide="clipboard-check"></i>
        </div>
        <div style="flex: 1;">
          <div style="font-weight: 500;">${test.title}</div>
          <div style="font-size: 14px; color: var(--text-secondary); margin-top: 4px;">
            ${test.questions.length} questions • ${test.duration} minutes
          </div>
        </div>
        <i data-lucide="chevron-right" width="20" height="20"></i>
      </a>
    `;
  }
}

// Initialize only if we're on the mock tests page
if (document.querySelector('.menu-list') && window.location.pathname.includes('mock-tests')) {
  new MockTestsPage();
}

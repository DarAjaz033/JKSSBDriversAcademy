import { getCurrentUser, onAuthChange } from './auth-service';
import { getUserCoursesWithDetails, getCourse, getPDFs, getPracticeTests, Course, PDF, PracticeTest } from './admin-service';

class MyCoursesPage {
  private coursesContainer: HTMLElement;

  constructor() {
    this.coursesContainer = document.querySelector('#courses-content') as HTMLElement;
    this.init();
  }

  private async init(): Promise<void> {
    onAuthChange(async (user) => {
      if (user) {
        await this.loadUserCourses(user.uid);
      } else {
        this.showEmptyState(
          'Please Sign In',
          'You need to sign in to view your courses and access study materials.',
          'Go to Home',
          './index.html'
        );
      }
    });
  }

  private async loadUserCourses(userId: string): Promise<void> {
    this.coursesContainer.innerHTML = `
      <div class="info-card" style="text-align: center;">
        <div class="loading-spinner" style="margin: 0 auto;"></div>
        <p style="margin-top: var(--spacing-md); color: var(--text-secondary); font-size: 15px;">Loading your courses...</p>
      </div>
    `;

    const result = await getUserCoursesWithDetails(userId);

    if (result.success && result.courses && result.courses.length > 0) {
      const coursesHTML = await Promise.all(
        result.courses.map((course, index) => this.renderCourseCard(course, index))
      );
      this.coursesContainer.innerHTML = coursesHTML.join('');
    } else {
      this.showEmptyState(
        'No Courses Yet',
        'You haven\'t enrolled in any courses. Browse our courses and start your learning journey today!',
        'Browse Courses',
        './index.html'
      );
    }

    (window as any).lucide.createIcons();
  }

  private showEmptyState(title: string, message: string, buttonText: string, buttonLink: string): void {
    this.coursesContainer.innerHTML = `
      <div class="info-card" style="text-align: center;">
        <div class="info-icon" style="margin: 0 auto var(--spacing-lg);">
          <i data-lucide="book-open" style="width: 48px; height: 48px;"></i>
        </div>

        <h2 style="font-size: 24px; font-weight: 700; color: var(--text-primary); margin-bottom: var(--spacing-md);">
          ${title}
        </h2>

        <p style="font-size: 15px; color: var(--text-secondary); margin-bottom: var(--spacing-lg); line-height: 1.6;">
          ${message}
        </p>

        <a
          href="${buttonLink}"
          class="btn-primary"
          style="display: inline-flex; width: auto; max-width: 300px; padding: 16px 32px; font-size: 16px; font-weight: 600; text-decoration: none;"
        >
          <span>${buttonText}</span>
          <i data-lucide="arrow-right" style="width: 20px; height: 20px;"></i>
        </a>
      </div>
    `;

    (window as any).lucide.createIcons();
  }

  private async renderCourseCard(course: Course, index: number): Promise<string> {
    const pdfsResult = await getPDFs();
    const testsResult = await getPracticeTests();

    const coursePDFs = pdfsResult.success && pdfsResult.pdfs
      ? pdfsResult.pdfs.filter(pdf => course.pdfIds.includes(pdf.id!))
      : [];

    const courseTests = testsResult.success && testsResult.tests
      ? testsResult.tests.filter(test => course.practiceTestIds.includes(test.id!))
      : [];

    const icon = this.getCourseIcon(course.category);

    return `
      <div class="info-card" style="animation-delay: ${index * 0.1}s;">
        <div style="text-align: left;">
          <!-- Course Header -->
          <div style="display: flex; align-items: start; gap: var(--spacing-md); margin-bottom: var(--spacing-lg);">
            <div style="width: 56px; height: 56px; border-radius: var(--radius-lg); background: var(--gradient-primary); display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0; box-shadow: 0 4px 15px rgba(180, 83, 9, 0.3);">
              <i data-lucide="${icon}" style="width: 28px; height: 28px;"></i>
            </div>
            <div style="flex: 1; min-width: 0;">
              <h3 style="font-size: 20px; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; line-height: 1.3;">
                ${course.title}
              </h3>
              <p style="font-size: 14px; color: var(--text-secondary); margin: 0;">
                ${course.duration}
              </p>
            </div>
          </div>

          <!-- Course Description -->
          <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.6; margin-bottom: var(--spacing-lg);">
            ${course.description}
          </p>

          <!-- Study Materials Section -->
          ${coursePDFs.length > 0 ? `
            <div style="margin-bottom: var(--spacing-lg);">
              <h4 style="font-size: 15px; font-weight: 600; color: var(--text-primary); margin-bottom: var(--spacing-sm); display: flex; align-items: center; gap: 8px;">
                <i data-lucide="file-text" style="width: 18px; height: 18px; color: var(--primary);"></i>
                Study Materials
              </h4>
              <div style="display: grid; gap: var(--spacing-xs);">
                ${coursePDFs.map(pdf => `
                  <a
                    href="${pdf.url}"
                    target="_blank"
                    style="display: flex; align-items: center; gap: var(--spacing-sm); padding: var(--spacing-sm); background: rgba(255, 255, 255, 0.4); border-radius: var(--radius-md); text-decoration: none; color: var(--text-primary); font-size: 14px; backdrop-filter: blur(5px); transition: all 0.2s ease; border: 1px solid rgba(180, 83, 9, 0.1);"
                    onmouseover="this.style.background='rgba(255, 255, 255, 0.7)'; this.style.borderColor='var(--primary)'; this.style.transform='translateX(4px)';"
                    onmouseout="this.style.background='rgba(255, 255, 255, 0.4)'; this.style.borderColor='rgba(180, 83, 9, 0.1)'; this.style.transform='translateX(0)';"
                  >
                    <div style="width: 32px; height: 32px; border-radius: var(--radius-sm); background: var(--gradient-primary); display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0;">
                      <i data-lucide="file" style="width: 16px; height: 16px;"></i>
                    </div>
                    <span style="flex: 1; font-weight: 500;">${pdf.name}</span>
                    <i data-lucide="external-link" style="width: 16px; height: 16px; color: var(--primary); flex-shrink: 0;"></i>
                  </a>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Practice Tests Section -->
          ${courseTests.length > 0 ? `
            <div style="margin-bottom: var(--spacing-md);">
              <h4 style="font-size: 15px; font-weight: 600; color: var(--text-primary); margin-bottom: var(--spacing-sm); display: flex; align-items: center; gap: 8px;">
                <i data-lucide="clipboard-check" style="width: 18px; height: 18px; color: var(--primary);"></i>
                Practice Tests
              </h4>
              <div style="display: grid; gap: var(--spacing-xs);">
                ${courseTests.map(test => `
                  <a
                    href="./practice-test.html?id=${test.id}"
                    style="display: flex; align-items: center; gap: var(--spacing-sm); padding: var(--spacing-sm); background: rgba(255, 255, 255, 0.4); border-radius: var(--radius-md); text-decoration: none; color: var(--text-primary); font-size: 14px; backdrop-filter: blur(5px); transition: all 0.2s ease; border: 1px solid rgba(180, 83, 9, 0.1);"
                    onmouseover="this.style.background='rgba(255, 255, 255, 0.7)'; this.style.borderColor='var(--primary)'; this.style.transform='translateX(4px)';"
                    onmouseout="this.style.background='rgba(255, 255, 255, 0.4)'; this.style.borderColor='rgba(180, 83, 9, 0.1)'; this.style.transform='translateX(0)';"
                  >
                    <div style="width: 32px; height: 32px; border-radius: var(--radius-sm); background: var(--gradient-primary); display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0;">
                      <i data-lucide="list-checks" style="width: 16px; height: 16px;"></i>
                    </div>
                    <span style="flex: 1; font-weight: 500;">${test.title}</span>
                    <span style="font-size: 12px; color: var(--text-tertiary); background: rgba(180, 83, 9, 0.1); padding: 4px 10px; border-radius: var(--radius-full); font-weight: 600;">${test.questions.length} Qs</span>
                    <i data-lucide="chevron-right" style="width: 16px; height: 16px; color: var(--primary); flex-shrink: 0;"></i>
                  </a>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  private getCourseIcon(category: string): string {
    const iconMap: { [key: string]: string } = {
      'Complete Package': 'package',
      'Traffic Rules': 'traffic-cone',
      'MV Act': 'file-text',
      'Mechanical': 'settings'
    };

    return iconMap[category] || 'book-open';
  }
}

new MyCoursesPage();

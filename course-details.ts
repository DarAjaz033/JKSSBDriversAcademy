import { db } from './firebase-config';
import { escapeHtml } from './utils/escape-html';
import { doc, getDoc } from 'firebase/firestore';

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  category: string;
}

class CourseDetailsPage {
  private mainContent: HTMLElement | null;
  private courseId: string | null;

  constructor() {
    this.mainContent = document.querySelector('.page-content');
    this.courseId = this.getCourseIdFromURL();
    this.init();
  }

  private getCourseIdFromURL(): string | null {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
  }

  private async init(): Promise<void> {
    if (!this.courseId) {
      this.showError('Course not found');
      return;
    }

    await this.loadCourseDetails();
  }

  private async loadCourseDetails(): Promise<void> {
    if (!this.mainContent || !this.courseId) return;

    this.mainContent.innerHTML = `
      <div style="max-width: 1200px; margin: 0 auto;">
        <div class="info-card" style="text-align: center;">
          <div class="loading-spinner" style="margin: 0 auto;"></div>
          <p style="margin-top: var(--spacing-md); color: var(--text-secondary); font-size: 15px;">Loading course details...</p>
        </div>
      </div>
    `;

    try {
      const courseDoc = await getDoc(doc(db, 'courses', this.courseId));

      if (!courseDoc.exists()) {
        this.showError('Course not found');
        return;
      }

      const course = { id: courseDoc.id, ...courseDoc.data() } as Course;
      this.renderCourseDetails(course);
    } catch (error) {
      console.error('Error loading course:', error);
      this.showError('Error loading course details');
    }
  }

  private formatCourseDescription(description: string): { title?: string; points: string[]; isList: boolean } {
    const trimmed = description.trim();
    const segments = trimmed.split(/\s*\d+\.\s+/).map((s) => s.trim()).filter(Boolean);
    if (segments.length > 1) {
      return {
        title: segments[0],
        points: segments.slice(1),
        isList: true,
      };
    }
    return { title: undefined, points: [trimmed], isList: false };
  }

  private renderDescriptionSection(description: string): string {
    const { title, points, isList } = this.formatCourseDescription(description);
    if (isList && points.length > 0) {
      return `
        <div style="margin-bottom: 0;">
          ${title ? `
            <h3 style="font-size: 17px; font-weight: 600; color: var(--primary); margin-bottom: var(--spacing-md); display: flex; align-items: center; gap: 8px;">
              <i data-lucide="list" style="width: 18px; height: 18px;"></i>
              ${escapeHtml(title)}
            </h3>
          ` : ''}
          <div style="display: grid; gap: var(--spacing-sm);">
            ${points
              .map(
                (point) => `
              <div style="display: flex; align-items: start; gap: var(--spacing-sm); padding: var(--spacing-sm) var(--spacing-md); background: rgba(255, 255, 255, 0.5); border-radius: var(--radius-md); border-left: 4px solid var(--primary); backdrop-filter: blur(5px);">
                <div style="flex-shrink: 0; width: 24px; height: 24px; border-radius: var(--radius-sm); background: var(--gradient-primary); display: flex; align-items: center; justify-content: center; margin-top: 2px;">
                  <i data-lucide="check" style="width: 14px; height: 14px; color: white; stroke-width: 3;"></i>
                </div>
                <span style="color: var(--text-secondary); font-size: 15px; line-height: 1.7;">${escapeHtml(point)}</span>
              </div>
            `
              )
              .join('')}
          </div>
        </div>
      `;
    }
    return `
      <p style="font-size: 15px; color: var(--text-secondary); line-height: 1.7; margin: 0;">
        ${escapeHtml(description)}
      </p>
    `;
  }

  private renderCourseDetails(course: Course): void {
    if (!this.mainContent) return;

    this.mainContent.innerHTML = `
      <div style="max-width: 1200px; margin: 0 auto;">
        <!-- Back Button -->
        <button
          onclick="window.history.back()"
          class="icon-btn"
          style="display: flex; align-items: center; gap: 8px; margin-bottom: var(--spacing-lg); padding: 10px 18px; width: auto;"
        >
          <i data-lucide="arrow-left" style="width: 18px; height: 18px;"></i>
          <span style="font-size: 15px; font-weight: 500;">Back</span>
        </button>

        <!-- Course Header Card -->
        <div class="info-card" style="animation-delay: 0.1s;">
          <div style="display: flex; flex-direction: column; gap: var(--spacing-md); text-align: left;">
            <h1 style="font-size: clamp(24px, 5vw, 32px); font-weight: 700; color: var(--text-primary); line-height: 1.2; margin: 0;">
              ${escapeHtml(course.title)}
            </h1>

            <div class="course-description-styled" style="margin: 0;">
              ${this.renderDescriptionSection(course.description)}
            </div>

            <!-- Price and Meta Info -->
            <div style="display: flex; flex-wrap: wrap; gap: var(--spacing-md); align-items: center; margin-top: var(--spacing-sm);">
              <div style="background: var(--gradient-primary); padding: 12px 20px; border-radius: var(--radius-lg); box-shadow: 0 4px 15px rgba(180, 83, 9, 0.3);">
                <div style="font-size: 28px; font-weight: 700; color: white;">₹${course.price.toLocaleString()}</div>
              </div>

              <div style="display: flex; flex-wrap: wrap; gap: var(--spacing-md); color: var(--text-secondary); font-size: 14px;">
                <div style="display: flex; align-items: center; gap: 6px; background: rgba(255, 255, 255, 0.6); padding: 8px 14px; border-radius: var(--radius-md); backdrop-filter: blur(10px);">
                  <i data-lucide="clock" style="width: 16px; height: 16px;"></i>
                  <span>${escapeHtml(course.duration)}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 6px; background: rgba(255, 255, 255, 0.6); padding: 8px 14px; border-radius: var(--radius-md); backdrop-filter: blur(10px);">
                  <i data-lucide="tag" style="width: 16px; height: 16px;"></i>
                  <span>${escapeHtml(course.category)}</span>
                </div>
              </div>
            </div>

            <!-- Enroll Button -->
            <button
              onclick="window.location.href='./course-purchase.html?id=${course.id}'"
              class="btn-primary"
              style="width: 100%; margin-top: var(--spacing-md); padding: 16px; font-size: 16px; font-weight: 600;"
            >
              <span>Enroll Now</span>
              <i data-lucide="arrow-right" style="width: 20px; height: 20px;"></i>
            </button>
          </div>
        </div>

        <!-- What You'll Learn Card -->
        <div class="info-card" style="animation-delay: 0.2s;">
          <div style="text-align: left;">
            <h2 style="font-size: 22px; font-weight: 700; color: var(--text-primary); margin-bottom: var(--spacing-lg); display: flex; align-items: center; gap: var(--spacing-sm);">
              <div style="width: 40px; height: 40px; border-radius: var(--radius-md); background: var(--gradient-primary); display: flex; align-items: center; justify-content: center; color: white;">
                <i data-lucide="star" style="width: 20px; height: 20px;"></i>
              </div>
              <span>What You'll Learn</span>
            </h2>

            <div style="display: grid; gap: var(--spacing-sm);">
              ${this.getFeaturesList(course.category).map(feature => `
                <div style="display: flex; align-items: start; gap: var(--spacing-sm); padding: var(--spacing-sm); background: rgba(255, 255, 255, 0.4); border-radius: var(--radius-md); backdrop-filter: blur(5px);">
                  <div style="flex-shrink: 0; width: 24px; height: 24px; border-radius: var(--radius-sm); background: var(--gradient-primary); display: flex; align-items: center; justify-content: center; margin-top: 2px;">
                    <i data-lucide="check" style="width: 14px; height: 14px; color: white; stroke-width: 3;"></i>
                  </div>
                  <span style="color: var(--text-secondary); font-size: 15px; line-height: 1.6;">${feature}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Course Content Card -->
        ${this.getCategorySpecificContent(course.category)}
      </div>
    `;

    (window as any).lucide?.createIcons();
  }

  private getFeaturesList(category: string): string[] {
    return [
      `Comprehensive coverage of ${category}`,
      'Practice tests and quizzes',
      'Study materials and PDFs',
      'Expert guidance and support',
      'Lifetime access to content',
      'Mobile-friendly learning experience'
    ];
  }

  private getCategorySpecificContent(category: string): string {
    const contentMap: { [key: string]: string } = {
      'Complete Package': `
        <div class="info-card" style="animation-delay: 0.3s;">
          <div style="text-align: left;">
            <h2 style="font-size: 22px; font-weight: 700; color: var(--text-primary); margin-bottom: var(--spacing-lg); display: flex; align-items: center; gap: var(--spacing-sm);">
              <div style="width: 40px; height: 40px; border-radius: var(--radius-md); background: var(--gradient-primary); display: flex; align-items: center; justify-content: center; color: white;">
                <i data-lucide="package" style="width: 20px; height: 20px;"></i>
              </div>
              <span>Complete Package Includes</span>
            </h2>

            <div style="display: grid; gap: var(--spacing-md);">
              <div style="padding: var(--spacing-md); background: rgba(255, 255, 255, 0.4); border-radius: var(--radius-lg); backdrop-filter: blur(5px); border-left: 4px solid var(--primary);">
                <h4 style="font-size: 16px; font-weight: 600; color: var(--text-primary); margin-bottom: var(--spacing-xs); display: flex; align-items: center; gap: 8px;">
                  <i data-lucide="traffic-cone" style="width: 18px; height: 18px; color: var(--primary);"></i>
                  Part I - Traffic Rules
                </h4>
                <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.5;">Traffic signals, road safety, and regulations</p>
              </div>

              <div style="padding: var(--spacing-md); background: rgba(255, 255, 255, 0.4); border-radius: var(--radius-lg); backdrop-filter: blur(5px); border-left: 4px solid var(--primary);">
                <h4 style="font-size: 16px; font-weight: 600; color: var(--text-primary); margin-bottom: var(--spacing-xs); display: flex; align-items: center; gap: 8px;">
                  <i data-lucide="file-text" style="width: 18px; height: 18px; color: var(--primary);"></i>
                  Part II - MV Act
                </h4>
                <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.5;">Motor Vehicle Act and CMV Rules</p>
              </div>

              <div style="padding: var(--spacing-md); background: rgba(255, 255, 255, 0.4); border-radius: var(--radius-lg); backdrop-filter: blur(5px); border-left: 4px solid var(--primary);">
                <h4 style="font-size: 16px; font-weight: 600; color: var(--text-primary); margin-bottom: var(--spacing-xs); display: flex; align-items: center; gap: 8px;">
                  <i data-lucide="settings" style="width: 18px; height: 18px; color: var(--primary);"></i>
                  Part III - Mechanical
                </h4>
                <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.5;">Vehicle parts and maintenance</p>
              </div>
            </div>
          </div>
        </div>
      `,
      'Traffic Rules': `
        <div class="info-card" style="animation-delay: 0.3s;">
          <div style="text-align: left;">
            <h2 style="font-size: 22px; font-weight: 700; color: var(--text-primary); margin-bottom: var(--spacing-lg); display: flex; align-items: center; gap: var(--spacing-sm);">
              <div style="width: 40px; height: 40px; border-radius: var(--radius-md); background: var(--gradient-primary); display: flex; align-items: center; justify-content: center; color: white;">
                <i data-lucide="book-open" style="width: 20px; height: 20px;"></i>
              </div>
              <span>Topics Covered</span>
            </h2>

            <div style="display: grid; gap: var(--spacing-sm);">
              ${['Traffic Police hand signals', 'Basic Road Rules and speed limits', 'Traffic light signals', 'Road safety knowledge', 'First aid basics'].map(topic => `
                <div style="display: flex; align-items: center; gap: var(--spacing-sm); padding: var(--spacing-sm); background: rgba(255, 255, 255, 0.4); border-radius: var(--radius-md); backdrop-filter: blur(5px);">
                  <i data-lucide="circle-dot" style="width: 16px; height: 16px; color: var(--primary); flex-shrink: 0;"></i>
                  <span style="color: var(--text-secondary); font-size: 14px;">${topic}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `,
      'MV Act': `
        <div class="info-card" style="animation-delay: 0.3s;">
          <div style="text-align: left;">
            <h2 style="font-size: 22px; font-weight: 700; color: var(--text-primary); margin-bottom: var(--spacing-lg); display: flex; align-items: center; gap: var(--spacing-sm);">
              <div style="width: 40px; height: 40px; border-radius: var(--radius-md); background: var(--gradient-primary); display: flex; align-items: center; justify-content: center; color: white;">
                <i data-lucide="book-open" style="width: 20px; height: 20px;"></i>
              </div>
              <span>Topics Covered</span>
            </h2>

            <div style="display: grid; gap: var(--spacing-sm);">
              ${['Motor Vehicle Act, 1988', 'CMV Rules, 1989', 'Registration procedures', 'Licensing requirements', 'Insurance essentials'].map(topic => `
                <div style="display: flex; align-items: center; gap: var(--spacing-sm); padding: var(--spacing-sm); background: rgba(255, 255, 255, 0.4); border-radius: var(--radius-md); backdrop-filter: blur(5px);">
                  <i data-lucide="circle-dot" style="width: 16px; height: 16px; color: var(--primary); flex-shrink: 0;"></i>
                  <span style="color: var(--text-secondary); font-size: 14px;">${topic}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `,
      'Mechanical': `
        <div class="info-card" style="animation-delay: 0.3s;">
          <div style="text-align: left;">
            <h2 style="font-size: 22px; font-weight: 700; color: var(--text-primary); margin-bottom: var(--spacing-lg); display: flex; align-items: center; gap: var(--spacing-sm);">
              <div style="width: 40px; height: 40px; border-radius: var(--radius-md); background: var(--gradient-primary); display: flex; align-items: center; justify-content: center; color: white;">
                <i data-lucide="book-open" style="width: 20px; height: 20px;"></i>
              </div>
              <span>Topics Covered</span>
            </h2>

            <div style="display: grid; gap: var(--spacing-sm);">
              ${['Vehicle major assemblies', 'Daily and periodic inspection', 'Fault diagnosis and repair', 'Lubrication and servicing', 'Dashboard symbols'].map(topic => `
                <div style="display: flex; align-items: center; gap: var(--spacing-sm); padding: var(--spacing-sm); background: rgba(255, 255, 255, 0.4); border-radius: var(--radius-md); backdrop-filter: blur(5px);">
                  <i data-lucide="circle-dot" style="width: 16px; height: 16px; color: var(--primary); flex-shrink: 0;"></i>
                  <span style="color: var(--text-secondary); font-size: 14px;">${topic}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `
    };

    return contentMap[category] || '';
  }

  private showError(message: string): void {
    if (!this.mainContent) return;

    this.mainContent.innerHTML = `
      <div style="max-width: 1200px; margin: 0 auto;">
        <button
          onclick="window.history.back()"
          class="icon-btn"
          style="display: flex; align-items: center; gap: 8px; margin-bottom: var(--spacing-lg); padding: 10px 18px; width: auto;"
        >
          <i data-lucide="arrow-left" style="width: 18px; height: 18px;"></i>
          <span style="font-size: 15px; font-weight: 500;">Back</span>
        </button>

        <div class="info-card" style="text-align: center;">
          <div class="info-icon" style="margin: 0 auto var(--spacing-lg);">
            <i data-lucide="alert-circle" style="width: 48px; height: 48px;"></i>
          </div>

          <h2 style="font-size: 24px; font-weight: 700; color: var(--text-primary); margin-bottom: var(--spacing-md);">
            ${message}
          </h2>

          <p style="font-size: 15px; color: var(--text-secondary); margin-bottom: var(--spacing-lg);">
            The course you're looking for could not be found or may have been removed.
          </p>

          <button
            onclick="window.location.href='./index.html'"
            class="btn-primary"
            style="width: 100%; max-width: 300px; padding: 16px; font-size: 16px; font-weight: 600;"
          >
            <i data-lucide="home" style="width: 20px; height: 20px;"></i>
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    `;

    (window as any).lucide?.createIcons();
  }
}

// Initialize only if we're on the course details page
if (document.querySelector('.page-content') && window.location.pathname.includes('course-details')) {
  new CourseDetailsPage();
}

import { getCurrentUser, onAuthChange } from './auth-service';
import { escapeHtml } from './utils/escape-html';
import { getUserCoursesWithDetails, getCourses, getPDFs, getPracticeTests, Course as AdminCourse } from './admin-service';

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  category: string;
}

class HomePage {
  private coursesContainer: HTMLElement | null;
  private currentUser: any = null;

  constructor() {
    this.coursesContainer = document.querySelector('.course-cards');
    this.init();
    this.setupExpandTopicsDelegation();
  }

  private setupExpandTopicsDelegation(): void {
    document.addEventListener('click', (e) => {
      const btn = (e.target as HTMLElement).closest('.expand-more-topics-btn');
      if (!btn) return;

      e.preventDefault();
      e.stopPropagation();

      const button = btn as HTMLButtonElement;
      const card = button.closest('.course-description-card');
      const extra = card?.querySelector('.course-topics-extra');
      if (!extra) return;

      const isHidden = getComputedStyle(extra as HTMLElement).display === 'none';
      (extra as HTMLElement).style.display = isHidden ? 'block' : 'none';
      button.textContent = isHidden
        ? (button.dataset.lessText || 'Show less')
        : (button.dataset.moreText || '+ more topics');

      (window as any).lucide?.createIcons();
    });
  }

  private async init(): Promise<void> {
    onAuthChange(async (user) => {
      this.currentUser = user;
      await this.loadCourses();
    });
  }

  private async loadCourses(): Promise<void> {
    if (!this.coursesContainer) return;

    try {
      let html = '';

      if (this.currentUser) {
        const userCoursesResult = await getUserCoursesWithDetails(this.currentUser.uid);
        if (userCoursesResult.success && userCoursesResult.courses && userCoursesResult.courses.length > 0) {
          html += await this.renderMyCoursesSection(userCoursesResult.courses);
        }
      }

      const coursesResult = await getCourses();
      const allCourses = coursesResult.success && coursesResult.courses ? coursesResult.courses : [];

      if (allCourses.length === 0 && !html) {
        this.coursesContainer.innerHTML = `
          <div class="alert-card info" style="grid-column: 1/-1;">
            <div class="alert-icon">
              <i data-lucide="info"></i>
            </div>
            <div class="alert-content">
              <h3>No Courses Available</h3>
              <p>Courses are being prepared. Check back soon!</p>
            </div>
          </div>
        `;
        (window as any).lucide.createIcons();
        return;
      }

      const courses: Course[] = allCourses.map(c => ({
        id: c.id!,
        title: c.title,
        description: c.description,
        price: c.price,
        duration: c.duration,
        category: c.category
      }));

      if (html) {
        html += '<div style="grid-column: 1/-1; height: 1px; background: var(--border); margin: var(--spacing-lg) 0;"></div>';
        html += `<div style="grid-column: 1/-1; margin-bottom: var(--spacing-md);"><h3 style="font-size: 20px; font-weight: 700; color: var(--text-primary);">All Courses</h3><p style="color: var(--text-secondary); font-size: 14px; margin-top: 4px;">Browse our complete course catalog</p></div>`;
      }

      html += courses.map((course, index) =>
        this.renderCourseCard(course, !html && index === 0)
      ).join('');

      this.coursesContainer.innerHTML = html;

      (window as any).lucide.createIcons();
    } catch (error) {
      console.error('Error loading courses:', error);
      if (this.coursesContainer) {
        this.coursesContainer.innerHTML = `
          <div class="alert-card error" style="grid-column: 1/-1;">
            <div class="alert-icon">
              <i data-lucide="alert-circle"></i>
            </div>
            <div class="alert-content">
              <h3>Error Loading Courses</h3>
              <p>Unable to load courses. Please refresh the page.</p>
            </div>
          </div>
        `;
        (window as any).lucide.createIcons();
      }
    }
  }

  private async renderMyCoursesSection(courses: AdminCourse[]): Promise<string> {
    let html = `<div style="grid-column: 1/-1; margin-bottom: var(--spacing-md);"><h3 style="font-size: 20px; font-weight: 700; color: var(--text-primary);">My Courses</h3><p style="color: var(--text-secondary); font-size: 14px; margin-top: 4px;">Continue your learning journey</p></div>`;

    for (const course of courses) {
      html += await this.renderPurchasedCourseCard(course);
    }

    return html;
  }

  private async renderPurchasedCourseCard(course: AdminCourse): Promise<string> {
    const pdfsResult = await getPDFs();
    const testsResult = await getPracticeTests();

    const coursePDFs = pdfsResult.success && pdfsResult.pdfs
      ? pdfsResult.pdfs.filter(pdf => course.pdfIds.includes(pdf.id!))
      : [];

    const courseTests = testsResult.success && testsResult.tests
      ? testsResult.tests.filter(test => course.practiceTestIds.includes(test.id!))
      : [];

    const categoryIcon = this.getCategoryIcon(course.category);

    return `
      <div class="course-card purchased" style="background: linear-gradient(135deg, rgba(180, 83, 9, 0.05) 0%, rgba(217, 119, 6, 0.05) 100%); border: 2px solid var(--primary); position: relative; overflow: hidden;">
        <div style="position: absolute; top: 12px; right: 12px; background: var(--gradient-primary); color: white; padding: 6px 14px; border-radius: var(--radius-full); font-size: 12px; font-weight: 700; box-shadow: 0 2px 8px rgba(180, 83, 9, 0.3);">
          ENROLLED
        </div>
        <div class="course-header">
          <div class="course-icon" style="background: var(--gradient-primary); color: white;"><i data-lucide="${categoryIcon}"></i></div>
          <h3>${escapeHtml(course.title)}</h3>
        </div>
        <div class="course-description-wrapper" style="margin: var(--spacing-sm) 0;">
          ${this.renderDescriptionForCard(course.description)}
        </div>
        <div style="display: flex; gap: 12px; margin-top: var(--spacing-md); padding-top: var(--spacing-md); border-top: 1px solid rgba(180, 83, 9, 0.15);">
          <div style="flex: 1; display: flex; align-items: center; gap: 10px; padding: 12px 14px; background: linear-gradient(135deg, rgba(217, 119, 6, 0.08) 0%, rgba(251, 146, 60, 0.08) 100%); border-radius: var(--radius-md); border: 1px solid rgba(217, 119, 6, 0.2);">
            <div style="width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #d97706 0%, #f59e0b 100%); border-radius: var(--radius-sm); box-shadow: 0 2px 8px rgba(217, 119, 6, 0.25); flex-shrink: 0;">
              <i data-lucide="file-text" style="width: 18px; height: 18px; color: white;"></i>
            </div>
            <div style="flex: 1; min-width: 0;">
              <div style="font-size: 22px; font-weight: 700; color: var(--primary); line-height: 1; margin-bottom: 2px;">${coursePDFs.length}</div>
              <div style="font-size: 12px; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">${coursePDFs.length === 1 ? 'PDF' : 'PDFs'}</div>
            </div>
          </div>
          <div style="flex: 1; display: flex; align-items: center; gap: 10px; padding: 12px 14px; background: linear-gradient(135deg, rgba(217, 119, 6, 0.08) 0%, rgba(251, 146, 60, 0.08) 100%); border-radius: var(--radius-md); border: 1px solid rgba(217, 119, 6, 0.2);">
            <div style="width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #d97706 0%, #f59e0b 100%); border-radius: var(--radius-sm); box-shadow: 0 2px 8px rgba(217, 119, 6, 0.25); flex-shrink: 0;">
              <i data-lucide="clipboard-check" style="width: 18px; height: 18px; color: white;"></i>
            </div>
            <div style="flex: 1; min-width: 0;">
              <div style="font-size: 22px; font-weight: 700; color: var(--primary); line-height: 1; margin-bottom: 2px;">${courseTests.length}</div>
              <div style="font-size: 12px; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">${courseTests.length === 1 ? 'Test' : 'Tests'}</div>
            </div>
          </div>
        </div>
        <button class="btn-enroll" style="background: var(--gradient-primary); color: white; margin-top: var(--spacing-md);" onclick="window.location.href='./my-courses.html'">
          Continue Learning
        </button>
      </div>
    `;
  }

  private formatDescriptionForCard(description: string): { title?: string; points: string[]; isList: boolean } {
    const trimmed = description.trim();
    const segments = trimmed.split(/\s*\d+\.\s+/).map((s) => s.trim()).filter(Boolean);
    if (segments.length > 1) {
      return { title: segments[0], points: segments.slice(1), isList: true };
    }
    return { title: undefined, points: [trimmed], isList: false };
  }

  private renderTopicItem(point: string): string {
    return `
      <li style="display: flex; align-items: flex-start; gap: 10px; min-height: 20px;">
        <span style="width: 18px; height: 18px; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; margin-top: 2px;">
          <i data-lucide="check" style="width: 14px; height: 14px; color: var(--primary); stroke-width: 3;"></i>
        </span>
        <span style="flex: 1; color: var(--text-secondary); line-height: 1.5; padding-top: 0;">${escapeHtml(point)}</span>
      </li>
    `;
  }

  private renderDescriptionForCard(description: string): string {
    const { title, points, isList } = this.formatDescriptionForCard(description);
    if (isList && points.length > 0) {
      const maxPreview = 4;
      const previewPoints = points.slice(0, maxPreview);
      const extraPoints = points.slice(maxPreview);
      const remaining = extraPoints.length;
      return `
        <div class="course-description-card" style="font-size: 14px; color: var(--text-secondary);">
          ${title ? `<div style="font-weight: 600; color: var(--text-primary); margin-bottom: 10px; font-size: 15px;">${escapeHtml(title)}</div>` : ''}
          <ul class="course-topics-visible" style="margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 8px;">
            ${previewPoints.map((p) => this.renderTopicItem(p)).join('')}
          </ul>
          ${remaining > 0 ? `
            <div class="course-topics-extra" style="display: none; margin-top: 8px;">
              <ul style="margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 8px;">
                ${extraPoints.map((p) => this.renderTopicItem(p)).join('')}
              </ul>
            </div>
            <button type="button" class="expand-more-topics-btn" style="font-size: 13px; color: var(--primary); font-weight: 600; margin-top: 8px; padding: 6px 0; background: none; border: none; cursor: pointer; text-align: left; font-family: inherit; display: block; width: 100%; -webkit-tap-highlight-color: transparent; touch-action: manipulation;" data-more-text="+ ${remaining} more topics" data-less-text="Show less">
              + ${remaining} more topics
            </button>
          ` : ''}
        </div>
      `;
    }
    return `<p class="course-description" style="font-size: 14px; color: var(--text-secondary); line-height: 1.6; margin: 0;">${escapeHtml(description)}</p>`;
  }

  private renderCourseCard(course: Course, isFeatured: boolean = false): string {
    const categoryIcon = this.getCategoryIcon(course.category);

    return `
      <div class="course-card ${isFeatured ? 'featured' : ''}" style="position: relative; overflow: hidden;">
        ${isFeatured ? '<div class="course-badge">Best Value</div>' : ''}
        <div class="course-header">
          <div class="course-icon" style="background: var(--gradient-primary); color: white; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; border-radius: var(--radius-md); box-shadow: 0 4px 12px rgba(180, 83, 9, 0.25);"><i data-lucide="${categoryIcon}" style="width: 24px; height: 24px;"></i></div>
          <h3>${escapeHtml(course.title)}</h3>
        </div>
        <div style="display: inline-flex; align-items: center; gap: 6px; background: linear-gradient(135deg, rgba(217, 119, 6, 0.1) 0%, rgba(251, 146, 60, 0.1) 100%); padding: 8px 16px; border-radius: var(--radius-full); border: 1px solid rgba(217, 119, 6, 0.25); margin: var(--spacing-md) 0;">
          <i data-lucide="indian-rupee" style="width: 16px; height: 16px; color: var(--primary);"></i>
          <span style="font-size: 24px; font-weight: 700; color: var(--primary);">${course.price.toLocaleString()}</span>
        </div>
        <div class="course-description-wrapper" style="margin: var(--spacing-sm) 0;">
          ${this.renderDescriptionForCard(course.description)}
        </div>
        <div style="display: flex; gap: 12px; margin-top: var(--spacing-md); padding-top: var(--spacing-md); border-top: 1px solid var(--border);">
          <div style="flex: 1; display: flex; align-items: center; gap: 10px; padding: 12px 14px; background: linear-gradient(135deg, rgba(180, 83, 9, 0.08) 0%, rgba(217, 119, 6, 0.08) 100%); border-radius: var(--radius-md); border: 1px solid rgba(180, 83, 9, 0.2);">
            <div style="width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; background: var(--gradient-primary); border-radius: var(--radius-sm); box-shadow: 0 2px 8px rgba(180, 83, 9, 0.25); flex-shrink: 0;">
              <i data-lucide="clock" style="width: 18px; height: 18px; color: white;"></i>
            </div>
            <div style="flex: 1; min-width: 0;">
              <div style="font-size: 13px; font-weight: 700; background: var(--gradient-primary); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: transparent; line-height: 1.3; margin-bottom: 2px;">${escapeHtml(course.duration)}</div>
              <div style="font-size: 11px; font-weight: 600; background: var(--gradient-primary); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: transparent; text-transform: uppercase; letter-spacing: 0.5px;">Duration</div>
            </div>
          </div>
          <div style="flex: 1; display: flex; align-items: center; gap: 10px; padding: 12px 14px; background: linear-gradient(135deg, rgba(180, 83, 9, 0.08) 0%, rgba(217, 119, 6, 0.08) 100%); border-radius: var(--radius-md); border: 1px solid rgba(180, 83, 9, 0.2);">
            <div style="width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; background: var(--gradient-primary); border-radius: var(--radius-sm); box-shadow: 0 2px 8px rgba(180, 83, 9, 0.25); flex-shrink: 0;">
              <i data-lucide="tag" style="width: 18px; height: 18px; color: white;"></i>
            </div>
            <div style="flex: 1; min-width: 0;">
              <div style="font-size: 13px; font-weight: 700; background: var(--gradient-primary); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: transparent; line-height: 1.3; margin-bottom: 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${escapeHtml(course.category)}</div>
              <div style="font-size: 11px; font-weight: 600; background: var(--gradient-primary); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: transparent; text-transform: uppercase; letter-spacing: 0.5px;">Category</div>
            </div>
          </div>
        </div>
        <button class="btn-enroll" style="margin-top: var(--spacing-md);" onclick="window.location.href='./course-details.html?id=${course.id}'">
          View Details
        </button>
      </div>
    `;
  }

  private getCategoryIcon(category: string): string {
    const iconMap: { [key: string]: string } = {
      'Traffic Rules': 'traffic-cone',
      'MV Act': 'clipboard-list',
      'Mechanical': 'wrench',
      'Complete Package': 'graduation-cap',
      'Full Course': 'graduation-cap',
      'Part I': 'traffic-cone',
      'Part II': 'clipboard-list',
      'Part III': 'wrench'
    };
    return iconMap[category] || 'book-open';
  }
}

// Initialize only if we're on the home page
if (document.querySelector('.course-cards')) {
  new HomePage();
}

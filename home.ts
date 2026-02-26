import { getCurrentUser, onAuthChange } from './auth-service';
import { escapeHtml } from './utils/escape-html';
import { getCourses } from './admin-service';

interface Course {
  id: string;
  title: string;
  description: string;
  syllabus?: string;
  price: number;
  duration: string;
  paymentLink?: string;
}

// ─── Per-user enrolment key ──────────────────────────────────────────────────
function enrolledKey(userId: string): string {
  return `jkssb_enrolled_${userId}`;
}

// ─── Payment Success Handler ───────────────────────────────────────────────
// 🔁 Replace this body with a real payment gateway call later.
// The function signature (courseId, userId) must remain the same.
export function handlePaymentSuccess(courseId: string, userId: string): void {
  const key = enrolledKey(userId);
  const existing: string[] = JSON.parse(localStorage.getItem(key) ?? '[]');
  if (!existing.includes(courseId)) {
    existing.push(courseId);
    localStorage.setItem(key, JSON.stringify(existing));
  }
  window.location.href = './my-courses.html';
}

// ─── Modal ───────────────────────────────────────────────────────────────────

function openCourseModal(course: Course): void {
  // Remove existing modal
  document.getElementById('course-detail-modal')?.remove();

  const syllabusLines = (course.syllabus ?? '')
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean);

  const descLines: string[] = [];
  const rawDesc = course.description?.trim() ?? '';
  const descSegments = rawDesc.split(/\s*\d+\.\s+/).map(s => s.trim()).filter(Boolean);
  let descHeading = '';
  if (descSegments.length > 1) {
    descHeading = descSegments[0];
    descLines.push(...descSegments.slice(1));
  } else if (rawDesc) {
    descLines.push(rawDesc);
  }

  const syllabusHtml = syllabusLines.length
    ? `<ul class="cdm-list">${syllabusLines.map(l => `<li>${escapeHtml(l)}</li>`).join('')}</ul>`
    : '<p style="color:#888;font-style:italic;">No syllabus added yet.</p>';

  const descHtml = descLines.length
    ? `${descHeading ? `<p class="cdm-desc-heading">${escapeHtml(descHeading)}</p>` : ''}<ul class="cdm-list">${descLines.map(l => `<li>${escapeHtml(l)}</li>`).join('')}</ul>`
    : rawDesc
      ? `<p style="color:#ccc;line-height:1.7;">${escapeHtml(rawDesc)}</p>`
      : '<p style="color:#888;font-style:italic;">No description added yet.</p>';

  const overlay = document.createElement('div');
  overlay.id = 'course-detail-modal';
  overlay.className = 'cdm-overlay';
  overlay.innerHTML = `
    <div class="cdm-panel" role="dialog" aria-modal="true">
      <div class="cdm-header">
        <button class="cdm-close" aria-label="Close">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <h2 class="cdm-title">${escapeHtml(course.title)}</h2>
        <div class="cdm-price">₹${course.price.toLocaleString()}</div>
      </div>

      <div class="cdm-body">
        <!-- Syllabus toggle -->
        <div class="cdm-toggle-bar" data-target="cdm-syllabus">
          <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg> Syllabus</span>
          <svg class="cdm-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="cdm-section" id="cdm-syllabus" style="display:none;">
          ${syllabusHtml}
        </div>

        <!-- Description toggle -->
        <div class="cdm-toggle-bar" data-target="cdm-description">
          <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> Description</span>
          <svg class="cdm-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="cdm-section" id="cdm-description" style="display:none;">
          ${descHtml}
        </div>
      </div>

      <div class="cdm-footer">
        <button class="cdm-buy-btn" id="cdm-buy-btn-trigger">
          <span>Buy Now</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  `;

  // Toggle logic — only one open at a time
  overlay.querySelectorAll<HTMLElement>('.cdm-toggle-bar').forEach(bar => {
    bar.addEventListener('click', () => {
      const targetId = bar.dataset.target!;
      const section = document.getElementById(targetId)!;
      const arrow = bar.querySelector<SVGElement>('.cdm-arrow')!;
      const isOpen = section.style.display !== 'none';

      // Close all
      overlay.querySelectorAll<HTMLElement>('.cdm-section').forEach(s => (s.style.display = 'none'));
      overlay.querySelectorAll<SVGElement>('.cdm-arrow').forEach(a => a.style.transform = '');

      // Open this one if it was closed
      if (!isOpen) {
        section.style.display = 'block';
        arrow.style.transform = 'rotate(180deg)';
      }
    });
  });

  // Close on overlay click
  overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.remove();
  });

  // Buy Now: dummy payment flow — requires user to be logged in
  overlay.querySelector('#cdm-buy-btn-trigger')?.addEventListener('click', () => {
    const user = getCurrentUser();
    if (!user) {
      alert('Please sign in to purchase a course.');
      return;
    }
    const confirmed = window.confirm(
      `Enroll in "${course.title}" for \u20b9${course.price.toLocaleString()}?\n\n(Demo payment \u2014 no real charge)\n\nClick OK to confirm.`
    );
    if (confirmed) {
      overlay.remove();
      handlePaymentSuccess(course.id, user.uid);
    }
  });

  overlay.querySelector('.cdm-close')?.addEventListener('click', () => overlay.remove());

  document.body.appendChild(overlay);
}

// ─── HomePage ────────────────────────────────────────────────────────────────

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

    this.coursesContainer.innerHTML = `
      <div class="glass-card skeleton-glass"></div>
      <div class="glass-card skeleton-glass"></div>
      <div class="glass-card skeleton-glass"></div>
    `;

    try {
      const coursesResult = await getCourses();
      const allCourses = coursesResult.success && 'courses' in coursesResult && coursesResult.courses ? coursesResult.courses : [];

      if (allCourses.length === 0) {
        this.coursesContainer.innerHTML = `
          <div class="alert-card info" style="grid-column:1/-1;">
            <div class="alert-icon"><i data-lucide="info"></i></div>
            <div class="alert-content">
              <h3>No Courses Available</h3>
              <p>Courses are being prepared. Check back soon!</p>
            </div>
          </div>
        `;
        (window as any).lucide.createIcons();
        return;
      }

      const enrolledIds: string[] = this.currentUser
        ? ((): string[] => {
          try { return JSON.parse(localStorage.getItem(`jkssb_enrolled_${this.currentUser.uid}`) ?? '[]'); }
          catch { return []; }
        })()
        : [];

      const courses: Course[] = allCourses.map(c => ({
        id: c.id!,
        title: c.title,
        description: c.description,
        syllabus: c.syllabus,
        price: c.price,
        duration: c.duration,
        paymentLink: c.paymentLink
      }));

      this.coursesContainer.innerHTML = courses.map(course =>
        this.renderCourseCard(course, enrolledIds.includes(course.id))
      ).join('');

      // Enrolled cards → redirect directly to My Courses
      this.coursesContainer.querySelectorAll<HTMLButtonElement>('.btn-enrolled').forEach(btn => {
        btn.addEventListener('click', () => {
          window.location.href = './my-courses.html';
        });
      });

      // Unenrolled cards → open modal
      this.coursesContainer.querySelectorAll<HTMLButtonElement>('.btn-enroll').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.courseId!;
          const course = courses.find(c => c.id === id);
          if (course) openCourseModal(course);
        });
      });

      (window as any).lucide?.createIcons();
    } catch (error) {
      console.error('Error loading courses:', error);
      if (this.coursesContainer) {
        this.coursesContainer.innerHTML = `
          <div class="alert-card error" style="grid-column:1/-1;">
            <div class="alert-icon"><i data-lucide="alert-circle"></i></div>
            <div class="alert-content">
              <h3>Error Loading Courses</h3>
              <p>Unable to load courses. Please refresh the page.</p>
            </div>
          </div>
        `;
        (window as any).lucide?.createIcons();
      }
    }
  }

  private renderCourseCard(course: Course, isEnrolled = false): string {
    if (isEnrolled) {
      return `
        <div class="glass-card glass-card--enrolled">
          <div class="glass-card-glow glass-card-glow--enrolled"></div>
          <div class="glass-card-inner">
            <div class="glass-card-icon glass-card-icon--enrolled">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h3 class="glass-card-title">${escapeHtml(course.title)}</h3>
            <button class="btn-enrolled glass-enrolled-btn" data-course-id="${course.id}">
              🎉 Enrolled
            </button>
            <span class="glass-card-hint">Click to view your course</span>
          </div>
        </div>
      `;
    }

    return `
      <div class="glass-card">
        <div class="glass-card-glow"></div>
        <div class="glass-card-inner">
          <div class="glass-card-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
            </svg>
          </div>
          <h3 class="glass-card-title">${escapeHtml(course.title)}</h3>
          <div class="glass-card-price">\u20B9${course.price.toLocaleString()}</div>
          <button class="btn-enroll glass-enroll-btn" data-course-id="${course.id}">
            View Details &amp; Enroll
          </button>
        </div>
      </div>
    `;
  }
}

// Initialize only if we're on a page with course-cards
if (document.querySelector('.course-cards')) {
  new HomePage();
}

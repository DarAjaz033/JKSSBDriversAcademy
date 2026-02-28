import { db } from './firebase-config';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { onAuthChange } from './auth-service';
import { getUserCoursesWithDetails, getCourses, Course } from './admin-service';

/* ─────────────────────────────────────────────────────────────────────────── */
/*  CourseDetailsPage                                                           */
/*  Drives both enrolled-courses section + available-courses section +          */
/*  dynamic real practice tests appended under the static mock cards.           */
/* ─────────────────────────────────────────────────────────────────────────── */
class CourseDetailsPage {
  private enrolledGrid = document.getElementById('cd-enrolled-grid')!;
  private availList = document.getElementById('cd-avail-list')!;
  private dynamicTests = document.getElementById('cd-dynamic-tests')!;

  constructor() {
    this.init();
  }

  /* ── Bootstrap ──────────────────────────────────────────────────────────── */
  private async init(): Promise<void> {
    // Run enrolled, available, and tests in parallel after auth
    onAuthChange(async (user) => {
      const [_, availRes] = await Promise.all([
        user
          ? this.loadEnrolled(user.uid)
          : this.showEnrolledGuest(),
        this.loadAvailableCourses(),
        this.loadDynamicTests(),
      ]);
    });
  }

  /* ── Enrolled Courses ───────────────────────────────────────────────────── */
  private async loadEnrolled(userId: string): Promise<void> {
    const result = await getUserCoursesWithDetails(userId) as any;
    const courses: Course[] = result.success && result.courses ? result.courses as Course[] : [];

    if (courses.length === 0) {
      this.enrolledGrid.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:18px 12px;">
          <p style="font-size:13px;color:#9ca3af;margin:0 0 10px;">You haven't enrolled in any course yet.</p>
          <a href="./index.html" style="font-size:12.5px;font-weight:600;color:#b45309;text-decoration:none;">Browse Courses →</a>
        </div>`;
      return;
    }

    this.enrolledGrid.innerHTML = courses.map((c, i) => this.enrolledCard(c, i)).join('');
    (window as any).lucide?.createIcons();
  }

  private showEnrolledGuest(): void {
    this.enrolledGrid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:18px 12px;">
        <p style="font-size:13px;color:#9ca3af;margin:0 0 10px;">Sign in to see your enrolled courses.</p>
        <a href="./login.html" style="font-size:12.5px;font-weight:600;color:#b45309;text-decoration:none;">Sign In →</a>
      </div>`;
  }

  private enrolledCard(course: Course, idx: number): string {
    const icon = this.catIcon(course.category);
    return `
      <div class="cd-enrolled-card" style="animation-delay:${idx * 0.07}s;">
        <div class="cd-enrolled-face">
          <span class="cd-enrolled-badge">✓ Enrolled</span>
          <div>
            <div style="width:36px;height:36px;border-radius:11px;background:rgba(255,255,255,0.18);
                        border:1.5px solid rgba(255,255,255,0.28);display:flex;align-items:center;
                        justify-content:center;color:#fff;margin-bottom:9px;position:relative;z-index:1;">
              ${icon}
            </div>
            <div class="cd-enrolled-title">${course.title}</div>
          </div>
          <a href="./my-courses.html" class="cd-enrolled-btn">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            View Material
          </a>
        </div>
      </div>`;
  }

  /* ── Available Courses ──────────────────────────────────────────────────── */
  private async loadAvailableCourses(): Promise<void> {
    const res = await getCourses();
    const courses: Course[] = (res.success && res.courses) ? res.courses : [];

    if (courses.length === 0) {
      this.availList.innerHTML = `<p style="font-size:13px;color:#9ca3af;text-align:center;padding:12px 0;">No courses available yet.</p>`;
      return;
    }

    this.availList.innerHTML = courses.map((c, i) => this.availCard(c, i)).join('');
    (window as any).lucide?.createIcons();
  }

  private availCard(course: Course, idx: number): string {
    const icon = this.catIcon(course.category);
    return `
      <a href="./course-details.html?id=${course.id}" class="cd-avail-card" style="animation-delay:${idx * 0.07}s;">
        <div class="cd-avail-icon">${icon}</div>
        <div class="cd-avail-body">
          <div class="cd-avail-title">${course.title}</div>
          <div class="cd-avail-meta">${course.duration} · ${course.category}</div>
          <span class="cd-avail-price">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
            ₹${course.price.toLocaleString()}
          </span>
        </div>
        <svg class="cd-avail-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </a>`;
  }

  /* ── Dynamic practice tests (from Firestore) ────────────────────────────── */
  private async loadDynamicTests(): Promise<void> {
    try {
      const snap = await getDocs(query(collection(db, 'practiceTests'), orderBy('createdAt', 'desc')));
      if (snap.empty) return;

      const html = snap.docs.map(doc => {
        const t = { id: doc.id, ...doc.data() } as any;
        return `
          <div class="cd-mock-card">
            <div class="cd-mock-icon free">
              <i data-lucide="clipboard-check" width="20" height="20"></i>
            </div>
            <div class="cd-mock-body">
              <div class="cd-mock-title">${t.title}</div>
              <div class="cd-mock-meta">${t.questions?.length ?? 0} questions · ${t.duration} min</div>
            </div>
            <a href="./practice-test.html?id=${t.id}" class="cd-mock-action-free">Start</a>
          </div>`;
      }).join('');

      this.dynamicTests.innerHTML = html;
      (window as any).lucide?.createIcons();
    } catch (e) {
      console.warn('Tests load error', e);
    }
  }

  /* ── Category icon SVG helper ───────────────────────────────────────────── */
  private catIcon(category?: string): string {
    const map: Record<string, string> = {
      'Complete Package': `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
      'Traffic Rules': `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
      'MV Act': `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
      'Mechanical': `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M4.34 19.66l-1.41 1.41M20 12h2M2 12h2M19.07 19.07l-1.41-1.41M4.34 4.34L2.93 2.93M12 20v2M12 2v2"/></svg>`,
    };
    return map[category || ''] ?? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`;
  }
}

new CourseDetailsPage();

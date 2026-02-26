// JKSSB Drivers Academy - App Logic
// Modern TypeScript Implementation

import {
  signUpWithEmail,
  signInWithEmail,
  signInWithPhone,
  verifyPhoneCode,
  signOut,
  onAuthChange,
  getCurrentUser,
  initSessionVerifier,
  stopSessionVerifier
} from './auth-service';
import { purgeExpiredDownloads } from './offline-manager';
import './public/global-pdf-viewer'; // Global PDF Click Interceptor & Canvas Renderer

// ─── Global Toast Notification System ───────────────────────────────────
(window as any).showToast = function (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    Object.assign(container.style, {
      position: 'fixed',
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      zIndex: '999999',
      pointerEvents: 'none',
      width: 'max-content',
      maxWidth: '90vw'
    });
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');

  // Base styles for the toast
  Object.assign(toast.style, {
    padding: '12px 24px',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '14px',
    fontWeight: '500',
    fontFamily: "'Poppins', sans-serif",
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    opacity: '0',
    transform: 'translateY(20px)',
    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
  });

  // Color theming based on type
  if (type === 'success') {
    toast.style.background = '#10b981'; // Green
    toast.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> <span>${message}</span>`;
  } else if (type === 'error') {
    toast.style.background = '#ef4444'; // Red
    toast.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg> <span>${message}</span>`;
  } else if (type === 'warning') {
    toast.style.background = '#f59e0b'; // Orange
    toast.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg> <span>${message}</span>`;
  } else {
    toast.style.background = '#3b82f6'; // Blue
    toast.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg> <span>${message}</span>`;
  }

  container.appendChild(toast);

  // Trigger Entrance Animation
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });

  // Trigger Exit Animation and Removal after 3 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
};

interface PageState {
  currentPage: string;
  previousPage: string | null;
}

class App {
  private state: PageState = {
    currentPage: 'home',
    previousPage: null
  };

  private carouselInterval: number | null = null;
  private currentSlide: number = 0;
  private totalSlides: number = 4;

  private testimonialInterval: number | null = null;
  private currentTestimonial: number = 0;
  private totalTestimonials: number = 3;

  private isSignUpMode: boolean = false;
  private currentAuthMethod: string = 'email';

  constructor() {
    this.init();

    // Purge any offline PDF's that have passed their 30-day secure timebomb.
    // Done here so it executes on every app launch.
    setTimeout(() => purgeExpiredDownloads(), 1000); // slight delay to prioritize core paint
  }

  private init(): void {
    this.setupNavigation();
    this.setupPageTitle();
    this.addEventListeners();
    this.initCarousel();
    this.initTestimonialCarousel();
    this.setupFAQ();
    this.updateCopyrightYear();
    this.setupAuth();
    this.registerServiceWorker();
  }

  private registerServiceWorker(): void {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').then((registration) => {
          console.log('[Service Worker] Registered with scope:', registration.scope);
        }).catch((error) => {
          console.warn('[Service Worker] Registration failed:', error);
        });
      });
    }
  }


  private updateCopyrightYear(): void {
    const yearElement = document.getElementById('copyright-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear().toString();
    }
  }

  private initCarousel(): void {
    this.startCarousel();
    this.setupCarouselIndicators();
  }

  private startCarousel(): void {
    this.carouselInterval = window.setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  private stopCarousel(): void {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
      this.carouselInterval = null;
    }
  }

  private nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateSlides();
  }

  private goToSlide(index: number): void {
    this.currentSlide = index;
    this.updateSlides();
    this.stopCarousel();
    this.startCarousel();
  }

  private updateSlides(): void {
    const slides = document.querySelectorAll<HTMLElement>('.hero-slide');
    const indicators = document.querySelectorAll<HTMLElement>('.indicator');

    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === this.currentSlide);
    });

    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === this.currentSlide);
    });
  }

  private setupCarouselIndicators(): void {
    const indicators = document.querySelectorAll<HTMLElement>('.hero-carousel .indicator');

    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        this.goToSlide(index);
      });
    });
  }

  private initTestimonialCarousel(): void {
    this.startTestimonialCarousel();
    this.setupTestimonialIndicators();
  }

  private startTestimonialCarousel(): void {
    this.testimonialInterval = window.setInterval(() => {
      this.nextTestimonial();
    }, 4000);
  }

  private stopTestimonialCarousel(): void {
    if (this.testimonialInterval) {
      clearInterval(this.testimonialInterval);
      this.testimonialInterval = null;
    }
  }

  private nextTestimonial(): void {
    this.currentTestimonial = (this.currentTestimonial + 1) % this.totalTestimonials;
    this.updateTestimonials();
  }

  private goToTestimonial(index: number): void {
    this.currentTestimonial = index;
    this.updateTestimonials();
    this.stopTestimonialCarousel();
    this.startTestimonialCarousel();
  }

  private updateTestimonials(): void {
    const testimonials = document.querySelectorAll<HTMLElement>('.testimonial-card');
    const indicators = document.querySelectorAll<HTMLElement>('.testimonial-carousel .indicator');

    testimonials.forEach((testimonial, index) => {
      testimonial.classList.toggle('active', index === this.currentTestimonial);
    });

    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === this.currentTestimonial);
    });
  }

  private setupTestimonialIndicators(): void {
    const indicators = document.querySelectorAll<HTMLElement>('.testimonial-carousel .indicator');

    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        this.goToTestimonial(index);
      });
    });
  }

  private setupFAQ(): void {
    const faqItems = document.querySelectorAll<HTMLElement>('.faq-item');

    faqItems.forEach(item => {
      const question = item.querySelector<HTMLElement>('.faq-question');

      if (question) {
        question.addEventListener('click', () => {
          const isActive = item.classList.contains('active');

          if (isActive) {
            item.classList.remove('active');
          } else {
            item.classList.add('active');
          }
        });
      }
    });
  }

  private setupNavigation(): void {
    const navButtons = document.querySelectorAll<HTMLButtonElement>('.nav-btn');

    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const page = btn.dataset.page;
        if (page) {
          this.navigateToPage(page);
        }
      });
    });
  }

  private navigateToPage(pageName: string): void {
    if (pageName === this.state.currentPage) return;

    const currentPage = document.querySelector<HTMLElement>('.page.active');
    const nextPage = document.querySelector<HTMLElement>(`.page[data-page="${pageName}"]`);
    const navButtons = document.querySelectorAll<HTMLButtonElement>('.nav-btn');

    if (!nextPage) return;

    // Update state
    this.state.previousPage = this.state.currentPage;
    this.state.currentPage = pageName;

    // Update pages
    if (currentPage) {
      currentPage.classList.remove('active');
    }
    nextPage.classList.add('active');

    // Update navigation
    navButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.page === pageName);
    });

    // Update page title
    this.updatePageTitle(pageName);

    // Scroll to top
    nextPage.scrollTo(0, 0);
  }

  private updatePageTitle(pageName: string): void {
    const titleElement = document.getElementById('page-title');
    if (!titleElement) return;

    const titles: Record<string, string> = {
      home: 'JKSSB Drivers Academy',
      courses: 'Courses',
      learning: 'My Learning',
      more: 'More'
    };

    titleElement.textContent = titles[pageName] || 'JKSSB Drivers Academy';
  }

  private setupPageTitle(): void {
    this.updatePageTitle(this.state.currentPage);
  }

  private addEventListeners(): void {
    const navigateButtons = document.querySelectorAll<HTMLButtonElement>('[data-navigate]');

    navigateButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.navigate;
        if (target) {
          this.navigateToPage(target);
        }
      });
    });

    // Handle profile button
    const profileBtn = document.getElementById('profile-btn');
    if (profileBtn) {
      profileBtn.addEventListener('click', () => {
        this.showProfileMenu();
      });
    }

    // Add smooth scroll behavior
    this.setupSmoothScroll();
  }

  private showProfileMenu(): void {
    // Always go to profile.html — the profile page handles the not-logged-in state internally
    window.location.href = './profile.html';
  }

  private setupSmoothScroll(): void {
    const pages = document.querySelectorAll<HTMLElement>('.page');
    pages.forEach(page => {
      page.style.scrollBehavior = 'smooth';
    });
  }

  private setupAuth(): void {
    onAuthChange((user) => {
      const profileBtn = document.getElementById('profile-btn');
      if (!profileBtn) return;
      if (user) {
        // Start watching for single-device session overlaps globally
        initSessionVerifier(user.uid);

        if (user.photoURL) {
          // Show mini circular photo in header
          const existing = profileBtn.querySelector('img');
          if (!existing) {
            profileBtn.innerHTML = `<img src="${user.photoURL}" alt="Profile" style="width:28px;height:28px;border-radius:50%;object-fit:cover;border:2px solid #B45309;" loading="lazy">`;
          }
        }
      } else {
        stopSessionVerifier();
      }
    });
  }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new App();
  });
} else {
  new App();
}

// Export for potential reuse
export { App };

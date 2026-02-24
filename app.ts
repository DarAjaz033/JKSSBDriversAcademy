// JKSSB Drivers Academy - App Logic
// Modern TypeScript Implementation

import {
  signUpWithEmail,
  signInWithEmail,
  signInWithPhone,
  verifyPhoneCode,
  signOut,
  onAuthChange,
  getCurrentUser
} from './auth-service';

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
      home: 'JKSSB Academy',
      courses: 'Courses',
      learning: 'My Learning',
      more: 'More'
    };

    titleElement.textContent = titles[pageName] || 'JKSSB Academy';
  }

  private setupPageTitle(): void {
    this.updatePageTitle(this.state.currentPage);
  }

  private addEventListeners(): void {
    // Handle navigate buttons in content
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
      if (user && user.photoURL) {
        // Show mini circular photo in header
        const existing = profileBtn.querySelector('img');
        if (!existing) {
          profileBtn.innerHTML = `<img src="${user.photoURL}" alt="Profile" style="width:28px;height:28px;border-radius:50%;object-fit:cover;border:2px solid #B45309;">`;
        }
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

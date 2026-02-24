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
    const user = getCurrentUser();
    if (user) {
      window.location.href = './profile.html';
    } else {
      this.openAuthModal();
    }
  }

  private setupSmoothScroll(): void {
    const pages = document.querySelectorAll<HTMLElement>('.page');
    pages.forEach(page => {
      page.style.scrollBehavior = 'smooth';
    });
  }

  private setupAuth(): void {
    onAuthChange((user) => {
    });

    this.setupAuthModal();
  }

  private setupAuthModal(): void {
    const modal = document.getElementById('auth-modal');
    const closeBtn = document.getElementById('close-auth-modal');
    const authTabs = document.querySelectorAll<HTMLButtonElement>('.auth-tab');
    const toggleAuthMode = document.getElementById('toggle-auth-mode');
    const emailForm = document.getElementById('email-auth-form') as HTMLFormElement;
    const phoneForm = document.getElementById('phone-auth-form') as HTMLFormElement;
    const verifyOtpBtn = document.getElementById('verify-otp-btn');

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeAuthModal());
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeAuthModal();
        }
      });
    }

    authTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const method = tab.dataset.method;
        if (method) {
          this.switchAuthMethod(method);
        }
      });
    });

    if (toggleAuthMode) {
      toggleAuthMode.addEventListener('click', () => {
        this.toggleAuthMode();
      });
    }

    if (emailForm) {
      emailForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleEmailAuth();
      });
    }

    if (phoneForm) {
      phoneForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handlePhoneAuth();
      });
    }

    if (verifyOtpBtn) {
      verifyOtpBtn.addEventListener('click', () => {
        this.handleOtpVerification();
      });
    }
  }

  private openAuthModal(): void {
    const modal = document.getElementById('auth-modal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  private closeAuthModal(): void {
    const modal = document.getElementById('auth-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      this.clearAuthErrors();
    }
  }

  private switchAuthMethod(method: string): void {
    this.currentAuthMethod = method;
    const authTabs = document.querySelectorAll<HTMLButtonElement>('.auth-tab');
    const emailForm = document.getElementById('email-auth-form');
    const phoneForm = document.getElementById('phone-auth-form');

    authTabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.method === method);
    });

    if (emailForm && phoneForm) {
      if (method === 'email') {
        emailForm.style.display = 'flex';
        phoneForm.style.display = 'none';
      } else {
        emailForm.style.display = 'none';
        phoneForm.style.display = 'flex';
      }
    }

    this.clearAuthErrors();
  }

  private toggleAuthMode(): void {
    this.isSignUpMode = !this.isSignUpMode;
    const title = document.getElementById('auth-title');
    const subtitle = document.getElementById('auth-subtitle');
    const submitBtn = document.getElementById('email-submit-btn');
    const toggleText = document.getElementById('auth-mode-text');
    const toggleBtn = document.getElementById('toggle-auth-mode');

    if (title) {
      title.textContent = this.isSignUpMode ? 'Sign Up' : 'Sign In';
    }

    if (subtitle) {
      subtitle.textContent = this.isSignUpMode
        ? 'Create your account to get started'
        : 'Access your courses and progress';
    }

    if (submitBtn) {
      const span = submitBtn.querySelector('span');
      if (span) {
        span.textContent = this.isSignUpMode ? 'Sign Up' : 'Sign In';
      }
    }

    if (toggleText) {
      toggleText.textContent = this.isSignUpMode
        ? 'Already have an account?'
        : "Don't have an account?";
    }

    if (toggleBtn) {
      toggleBtn.textContent = this.isSignUpMode ? 'Sign In' : 'Sign Up';
    }

    this.clearAuthErrors();
  }

  private async handleEmailAuth(): Promise<void> {
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const errorDiv = document.getElementById('email-error');
    const submitBtn = document.getElementById('email-submit-btn') as HTMLButtonElement;

    if (!emailInput || !passwordInput) return;

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
      this.showError('email-error', 'Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      this.showError('email-error', 'Password must be at least 6 characters');
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      const span = submitBtn.querySelector('span');
      if (span) {
        span.textContent = 'Please wait...';
      }
    }

    let result;
    if (this.isSignUpMode) {
      result = await signUpWithEmail(email, password);
    } else {
      result = await signInWithEmail(email, password);
    }

    if (submitBtn) {
      submitBtn.disabled = false;
      const span = submitBtn.querySelector('span');
      if (span) {
        span.textContent = this.isSignUpMode ? 'Sign Up' : 'Sign In';
      }
    }

    if (result.success) {
      this.closeAuthModal();
      emailInput.value = '';
      passwordInput.value = '';
      window.location.href = './profile.html';
    } else {
      this.showError('email-error', result.error || 'Authentication failed');
    }
  }

  private async handlePhoneAuth(): Promise<void> {
    const phoneInput = document.getElementById('phone') as HTMLInputElement;
    const errorDiv = document.getElementById('phone-error');
    const submitBtn = document.getElementById('phone-submit-btn') as HTMLButtonElement;
    const otpSection = document.getElementById('otp-section');

    if (!phoneInput) return;

    const phone = phoneInput.value.trim();

    if (!phone) {
      this.showError('phone-error', 'Please enter your phone number');
      return;
    }

    if (!phone.startsWith('+')) {
      this.showError('phone-error', 'Phone number must include country code (e.g., +91)');
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      const span = submitBtn.querySelector('span');
      if (span) {
        span.textContent = 'Sending code...';
      }
    }

    const result = await signInWithPhone(phone);

    if (submitBtn) {
      submitBtn.disabled = false;
      const span = submitBtn.querySelector('span');
      if (span) {
        span.textContent = 'Send Code';
      }
    }

    if (result.success) {
      if (otpSection) {
        otpSection.style.display = 'block';
      }
      this.clearAuthErrors();
    } else {
      this.showError('phone-error', result.error || 'Failed to send code');
    }
  }

  private async handleOtpVerification(): Promise<void> {
    const otpInput = document.getElementById('otp') as HTMLInputElement;
    const errorDiv = document.getElementById('phone-error');
    const verifyBtn = document.getElementById('verify-otp-btn') as HTMLButtonElement;

    if (!otpInput) return;

    const otp = otpInput.value.trim();

    if (!otp || otp.length !== 6) {
      this.showError('phone-error', 'Please enter a valid 6-digit code');
      return;
    }

    if (verifyBtn) {
      verifyBtn.disabled = true;
      const span = verifyBtn.querySelector('span');
      if (span) {
        span.textContent = 'Verifying...';
      }
    }

    const result = await verifyPhoneCode(otp);

    if (verifyBtn) {
      verifyBtn.disabled = false;
      const span = verifyBtn.querySelector('span');
      if (span) {
        span.textContent = 'Verify Code';
      }
    }

    if (result.success) {
      this.closeAuthModal();
      otpInput.value = '';
      window.location.href = './profile.html';
    } else {
      this.showError('phone-error', result.error || 'Invalid code');
    }
  }

  private showError(errorId: string, message: string): void {
    const errorDiv = document.getElementById(errorId);
    if (errorDiv) {
      errorDiv.textContent = message;
      errorDiv.classList.add('show');
    }
  }

  private clearAuthErrors(): void {
    const errorDivs = document.querySelectorAll<HTMLElement>('.auth-error');
    errorDivs.forEach(div => {
      div.textContent = '';
      div.classList.remove('show');
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

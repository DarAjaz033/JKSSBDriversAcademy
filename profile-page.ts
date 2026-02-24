import { getCurrentUser, signOut, onAuthChange } from './auth-service';

class ProfilePage {
  constructor() {
    this.init();
  }

  private init(): void {
    this.checkAuth();
    this.setupSignOut();
  }

  private checkAuth(): void {
    let authChecked = false;
    let redirectScheduled = false;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                        (window.navigator as any).standalone === true;

    const timeout = (isMobile && isStandalone) ? 2000 : 1000;

    const unsubscribe = onAuthChange((user) => {
      if (authChecked) {
        return;
      }

      authChecked = true;

      if (!user) {
        if (!redirectScheduled) {
          redirectScheduled = true;
          setTimeout(() => {
            window.location.href = './index.html';
          }, 100);
        }
      } else {
        this.displayUserInfo(user);
      }
    });

    setTimeout(() => {
      if (!authChecked) {
        const user = getCurrentUser();
        authChecked = true;

        if (!user) {
          if (!redirectScheduled) {
            redirectScheduled = true;
            setTimeout(() => {
              window.location.href = './index.html';
            }, 100);
          }
        } else {
          this.displayUserInfo(user);
        }
      }
    }, timeout);
  }

  private displayUserInfo(user: any): void {
    const userEmailEl = document.getElementById('user-email');
    const userEmailDetailEl = document.getElementById('user-email-detail');
    const userPhoneEl = document.getElementById('user-phone');
    const userIdEl = document.getElementById('user-id');

    if (userEmailEl && user.email) {
      userEmailEl.textContent = user.email;
    }

    if (userEmailDetailEl && user.email) {
      userEmailDetailEl.textContent = user.email;
    } else if (userEmailDetailEl && user.phoneNumber) {
      userEmailDetailEl.textContent = 'Signed in with phone';
    }

    if (userPhoneEl && user.phoneNumber) {
      userPhoneEl.textContent = user.phoneNumber;
    } else if (userPhoneEl && !user.phoneNumber) {
      userPhoneEl.textContent = 'Not provided';
    }

    if (userIdEl) {
      userIdEl.textContent = user.uid.substring(0, 8) + '...';
    }
  }

  private setupSignOut(): void {
    const signOutBtn = document.getElementById('sign-out-btn');
    if (signOutBtn) {
      signOutBtn.addEventListener('click', async () => {
        const result = await signOut();
        if (result.success) {
          window.location.href = './index.html';
        }
      });
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ProfilePage();
  });
} else {
  new ProfilePage();
}

export { ProfilePage };

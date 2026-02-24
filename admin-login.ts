import { signInWithEmail, signOut } from './auth-service';
import { isAdmin } from './admin-service';

class AdminLoginPage {
  private form: HTMLFormElement;
  private submitBtn: HTMLButtonElement;
  private errorMessage: HTMLElement;

  constructor() {
    this.form = document.getElementById('admin-login-form') as HTMLFormElement;
    this.submitBtn = document.getElementById('submit-btn') as HTMLButtonElement;
    this.errorMessage = document.getElementById('error-message') as HTMLElement;
    this.init();
  }

  private init(): void {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  private async handleSubmit(e: Event): Promise<void> {
    e.preventDefault();

    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    this.submitBtn.disabled = true;
    this.submitBtn.textContent = 'Signing in...';
    this.hideError();

    const result = await signInWithEmail(email, password);

    if (!result.success) {
      this.showError(result.error || 'Failed to sign in');
      this.submitBtn.disabled = false;
      this.submitBtn.textContent = 'Sign In';
      return;
    }

    const hasAccess = result.user && (await isAdmin(result.user));
    if (!hasAccess) {
      await signOut();
      this.showError('You do not have admin access');
      this.submitBtn.disabled = false;
      this.submitBtn.textContent = 'Sign In';
      return;
    }

    window.location.href = './admin-dashboard.html';
  }

  private showError(message: string): void {
    this.errorMessage.textContent = message;
    this.errorMessage.classList.add('show');
  }

  private hideError(): void {
    this.errorMessage.classList.remove('show');
  }
}

new AdminLoginPage();

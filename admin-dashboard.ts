import { onAuthChange } from './auth-service';
import { isAdmin, getCourses, getPDFs, getPracticeTests, getAllPurchases } from './admin-service';

class AdminDashboard {
  constructor() {
    this.init();
    this.checkToasts();
  }

  private checkToasts(): void {
    const msg = sessionStorage.getItem('app_toast_msg');
    const type = sessionStorage.getItem('app_toast_type') || 'info';
    if (msg) {
      setTimeout(() => this.showToast(msg, type as any), 500);
      sessionStorage.removeItem('app_toast_msg');
      sessionStorage.removeItem('app_toast_type');
    }
  }

  private showToast(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      Object.assign(container.style, {
        position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', gap: '8px', zIndex: '999999',
        pointerEvents: 'none', width: 'max-content', maxWidth: '90vw'
      });
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    Object.assign(toast.style, {
      padding: '12px 24px', borderRadius: '8px', color: '#fff', fontSize: '14px',
      fontWeight: '500', fontFamily: "'Poppins', sans-serif", boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      display: 'flex', alignItems: 'center', gap: '8px', opacity: '0',
      transform: 'translateY(20px)', transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    });
    const colors = { success: '#10b981', error: '#ef4444', info: '#3b82f6', warning: '#f59e0b' };
    toast.style.background = (colors as any)[type] || colors.info;
    toast.textContent = message;
    container.appendChild(toast);
    requestAnimationFrame(() => { toast.style.opacity = '1'; toast.style.transform = 'translateY(0)'; });
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  private async init(): Promise<void> {
    onAuthChange(async (user) => {
      if (!user) {
        window.location.href = './admin-login.html';
        return;
      }

      const isUserAdmin = await isAdmin(user);
      if (!isUserAdmin) {
        window.location.href = './admin-login.html';
        return;
      }

      await this.loadStats();
    }, true);
  }

  private async loadStats(): Promise<void> {
    const coursesResult = await getCourses();
    const pdfsResult = await getPDFs();
    const testsResult = await getPracticeTests();
    const purchasesResult = await getAllPurchases();

    if (coursesResult.success) {
      document.getElementById('total-courses')!.textContent =
        coursesResult.courses?.length.toString() || '0';
    }

    if (pdfsResult.success) {
      document.getElementById('total-pdfs')!.textContent =
        pdfsResult.pdfs?.length.toString() || '0';
    }

    if (testsResult.success) {
      document.getElementById('total-tests')!.textContent =
        testsResult.tests?.length.toString() || '0';
    }

    if (purchasesResult.success) {
      document.getElementById('total-purchases')!.textContent =
        purchasesResult.purchases?.length.toString() || '0';
    }
  }
}

new AdminDashboard();

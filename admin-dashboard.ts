import { onAuthChange } from './auth-service';
import { isAdmin, getCourses, getPDFs, getPracticeTests, getAllPurchases } from './admin-service';

class AdminDashboard {
  constructor() {
    this.init();
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

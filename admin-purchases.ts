import { onAuthChange } from './auth-service';
import { isAdmin, getAllPurchases, getCourse, Purchase } from './admin-service';

class AdminPurchasesPage {
  private purchasesContainer: HTMLElement;

  constructor() {
    this.purchasesContainer = document.getElementById('purchases-container') as HTMLElement;
    this.init();
  }

  private async init(): Promise<void> {
    onAuthChange(async (user) => {
      if (!user || !isAdmin(user.email)) {
        window.location.href = './admin-login.html';
        return;
      }

      await this.loadPurchases();
    });
  }

  private async loadPurchases(): Promise<void> {
    const result = await getAllPurchases();

    if (result.success && result.purchases) {
      const purchasesWithCourses = await Promise.all(
        result.purchases.map(async (purchase) => {
          const courseResult = await getCourse(purchase.courseId);
          return {
            ...purchase,
            courseName: courseResult.success && courseResult.course ? courseResult.course.title : 'Unknown Course'
          };
        })
      );

      this.purchasesContainer.innerHTML = purchasesWithCourses
        .sort((a, b) => {
          const dateA = a.purchasedAt?.seconds || 0;
          const dateB = b.purchasedAt?.seconds || 0;
          return dateB - dateA;
        })
        .map(purchase => this.renderPurchaseRow(purchase))
        .join('');
    } else {
      this.purchasesContainer.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: var(--spacing-lg);">No purchases found</td></tr>';
    }
  }

  private renderPurchaseRow(purchase: Purchase & { courseName: string }): string {
    const date = purchase.purchasedAt?.seconds
      ? new Date(purchase.purchasedAt.seconds * 1000).toLocaleDateString()
      : 'N/A';

    const statusClass = purchase.status === 'completed' ? 'completed' :
                       purchase.status === 'pending' ? 'pending' : 'failed';

    return `
      <tr>
        <td>${purchase.userId.substring(0, 8)}...</td>
        <td>${purchase.courseName}</td>
        <td>₹${purchase.amount}</td>
        <td style="font-family: monospace; font-size: 12px;">${purchase.paymentId.substring(0, 16)}...</td>
        <td><span class="status-badge ${statusClass}">${purchase.status}</span></td>
        <td>${date}</td>
      </tr>
    `;
  }
}

new AdminPurchasesPage();

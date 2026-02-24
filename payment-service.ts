import { createPurchase, Course } from './admin-service';

declare global {
  interface Window {
    Cashfree: any;
  }
}

export interface PaymentConfig {
  appId: string;
  secretKey: string;
}

export const initiateCashfreePayment = async (
  course: Course,
  userId: string,
  userEmail: string,
  userName: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const orderAmount = course.price;
    const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const paymentSessionData = {
      order_id: orderId,
      order_amount: orderAmount,
      order_currency: 'INR',
      customer_details: {
        customer_id: userId,
        customer_email: userEmail,
        customer_name: userName,
        customer_phone: '9999999999'
      },
      order_meta: {
        return_url: `${window.location.origin}/payment-success.html?order_id=${orderId}&course_id=${course.id}`
      }
    };

    if (typeof window.Cashfree === 'undefined') {
      return {
        success: false,
        error: 'Cashfree SDK not loaded. Please refresh and try again.'
      };
    }

    await createPurchase({
      userId,
      courseId: course.id!,
      amount: orderAmount,
      paymentId: orderId,
      status: 'pending'
    });

    const checkoutOptions = {
      paymentSessionId: paymentSessionData.order_id,
      returnUrl: paymentSessionData.order_meta.return_url
    };

    const cashfree = new window.Cashfree(checkoutOptions);
    cashfree.redirect();

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Payment initiation failed'
    };
  }
};

export const simulatePayment = async (
  course: Course,
  userId: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const orderId = `TEST_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const result = await createPurchase({
      userId,
      courseId: course.id!,
      amount: course.price,
      paymentId: orderId,
      status: 'completed'
    });

    if (result.success) {
      return { success: true };
    } else {
      return { success: false, error: result.error };
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Payment simulation failed'
    };
  }
};

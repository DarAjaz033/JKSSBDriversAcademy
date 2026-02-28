import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';

// Initialize Firebase App
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSyAxRsJwYHIV3rVqJgjGf_ZwqmMF3TGwooM",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "jkssbdriversacd.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "jkssbdriversacd",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "jkssbdriversacd.firebasestorage.app",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "723957920242",
  appId: process.env.FIREBASE_APP_ID || "1:723957920242:web:825bc69a22161871107b6b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Helper to verify the actual order securely via Cashfree Orders API
async function verifyCashfreeOrder(orderId: string): Promise<any> {
  const appId = process.env.CASHFREE_APP_ID || '';
  const secretKey = process.env.CASHFREE_SECRET_KEY || '';
  const url = `https://api.cashfree.com/pg/orders/${orderId}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'x-api-version': '2023-08-01',
      'x-client-id': appId,
      'x-client-secret': secretKey
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to verify Cashfree order ${orderId}: ${response.statusText}`);
  }

  return response.json();
}

export default async function handler(req: any, res: any) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    let payload = req.body;
    if (typeof payload === 'string') {
      try { payload = JSON.parse(payload); } catch (e) { }
    }

    console.log('--- Incoming Cashfree Webhook ---');

    // We only care about PAYMENT_SUCCESS_WEBHOOK
    if (payload?.type !== 'PAYMENT_SUCCESS_WEBHOOK') {
      console.log('Ignoring non-success or unrelated webhook type:', payload?.type);
      return res.status(200).json({ status: "ok" });
    }

    const data = payload.data;
    const orderData = data.order || {};
    const customerDetails = data.customer_details || {};
    const paymentData = data.payment || {};

    // Sometimes Cashfree embeds form info directly in customer or order metadata
    // We extract form_id per user prompt
    const formData = data.form || {};
    const formId = formData.form_id || '';
    const orderId = orderData.order_id || formData.order_id || '';

    if (!orderId) {
      console.log('No order ID found in payload.');
      return res.status(200).json({ status: "ok" });
    }

    console.log(`Verifying Order: ${orderId}`);
    const verifiedOrder = await verifyCashfreeOrder(orderId);

    if (verifiedOrder.order_status !== 'PAID') {
      console.log(`Order ${orderId} is not PAID. Status: ${verifiedOrder.order_status}`);
      return res.status(200).json({ status: "ok" });
    }

    console.log('✅ Cashfree API verified order as PAID.');

    // Identify user email/phone
    const userEmail = customerDetails.customer_email || verifiedOrder.customer_details?.customer_email;
    const userPhone = customerDetails.customer_phone || verifiedOrder.customer_details?.customer_phone;

    let targetPhone = userPhone?.replace(/^(\+?91)/, ''); // Nomarlize phone

    if (!userEmail && !targetPhone) {
      console.error('No email or phone found to identify user.');
      return res.status(200).json({ status: "ok" });
    }

    // 1. Find Course by formId using paymentLink
    const coursesRef = collection(db, 'courses');
    const coursesSnapshot = await getDocs(coursesRef);
    let matchedCourse: any = null;

    coursesSnapshot.forEach((doc) => {
      const course = doc.data();
      if (course.paymentLink && formId) {
        if (course.paymentLink.includes(`code=${formId}`) || course.paymentLink.includes(`formId=${formId}`) || course.paymentLink.includes(formId)) {
          matchedCourse = { id: doc.id, ...course };
        }
      }
    });

    if (!matchedCourse) {
      console.error(`Could not locate any course matching form_id: ${formId}`);
      return res.status(200).json({ status: "ok" });
    }

    console.log(`Matched Course: ${matchedCourse.title} (${matchedCourse.id})`);

    // 2. Find User
    const usersRef = collection(db, 'users');
    let userSnapshot;

    if (userEmail) {
      const q = query(usersRef, where('email', '==', userEmail.toLowerCase()));
      userSnapshot = await getDocs(q);
    }

    // If not found by email, try phone
    if ((!userSnapshot || userSnapshot.empty) && targetPhone) {
      // Note: Data structure of users phone might differ, doing exact match
      const qPhone = query(usersRef, where('phone', '==', targetPhone));
      userSnapshot = await getDocs(qPhone);

      if (userSnapshot.empty) {
        const qPhoneAlt = query(usersRef, where('phone', '==', '+91' + targetPhone));
        userSnapshot = await getDocs(qPhoneAlt);
      }
    }

    if (!userSnapshot || userSnapshot.empty) {
      console.error(`Could not find a registered user matching email: ${userEmail} or phone: ${targetPhone}.`);
      return res.status(200).json({ status: "ok" });
    }

    if (matchedCourse && userSnapshot && !userSnapshot.empty) {
      const matchedUser = userSnapshot.docs[0];
      console.log(`Matched User: ${matchedUser.data().email} (${matchedUser.id})`);

      // Prevent duplicate enrollments check
      const enrollmentsRef = collection(db, 'enrollments');
      const qDup = query(enrollmentsRef, where('orderId', '==', orderId));
      const dupCheck = await getDocs(qDup);

      if (dupCheck.empty) {
        const enrolledAt = new Date();
        let expiresAt = null;
        if (matchedCourse.validityDays) {
          expiresAt = new Date(enrolledAt.getTime() + (matchedCourse.validityDays * 24 * 60 * 60 * 1000));
        }

        await addDoc(enrollmentsRef, {
          userId: matchedUser.id,
          courseId: matchedCourse.id,
          orderId: orderId,
          amount: verifiedOrder.order_amount,
          status: 'active',
          enrolledAt: serverTimestamp(),
          expiresAt: expiresAt ? expiresAt : null
        });
        console.log(`🎉 Successfully unlocked course ${matchedCourse.id} for user ${matchedUser.id}`);
      } else {
        console.log(`Duplicate webhook. Enrollment for Order ${orderId} already exists`);
      }
    }

    return res.status(200).json({ status: "ok" });
  } catch (error) {
    console.error('Error in Cashfree Webhook:', error);
    return res.status(200).json({ status: "ok" });
  }
}
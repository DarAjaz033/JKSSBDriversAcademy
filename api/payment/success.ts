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
    // Client browser returns here after payment
    try {
        const { order_id } = req.query;

        if (!order_id) {
            console.log('No order_id found in URL query.');
            // Redirect them back to homepage safely if access directly
            res.writeHead(302, { Location: '/' });
            return res.end();
        }

        console.log(`Verifying Order for Return Handler: ${order_id}`);
        const verifiedOrder = await verifyCashfreeOrder(order_id);

        if (verifiedOrder.order_status !== 'PAID') {
            console.log(`Order ${order_id} is not PAID. Status: ${verifiedOrder.order_status}`);
            res.writeHead(302, { Location: '/' });
            return res.end();
        }

        console.log('✅ Cashfree API verified order as PAID on Return Handler.');

        const userEmail = verifiedOrder.customer_details?.customer_email;
        const userPhone = verifiedOrder.customer_details?.customer_phone;
        let targetPhone = userPhone?.replace(/^(\+?91)/, ''); // Nomarlize phone

        // Get Form ID from nested tags if present or fallback
        // Cashfree orders endpoint sometimes includes order_tags or order_meta
        const formId = verifiedOrder.order_tags?.form_id || verifiedOrder.order_tags?.code || '';

        // 1. Find Course by formId using paymentLink
        const coursesRef = collection(db, 'courses');
        const coursesSnapshot = await getDocs(coursesRef);
        let matchedCourse: any = null;

        if (formId) {
            coursesSnapshot.forEach((doc) => {
                const course = doc.data();
                if (course.paymentLink) {
                    if (course.paymentLink.includes(`code=${formId}`) || course.paymentLink.includes(`formId=${formId}`) || course.paymentLink.includes(formId)) {
                        matchedCourse = { id: doc.id, ...course };
                    }
                }
            });
        }

        // 2. Find User
        const usersRef = collection(db, 'users');
        let userSnapshot;

        if (userEmail) {
            const q = query(usersRef, where('email', '==', userEmail.toLowerCase()));
            userSnapshot = await getDocs(q);
        }

        if ((!userSnapshot || userSnapshot.empty) && targetPhone) {
            const qPhone = query(usersRef, where('phone', '==', targetPhone));
            userSnapshot = await getDocs(qPhone);

            if (userSnapshot.empty) {
                const qPhoneAlt = query(usersRef, where('phone', '==', '+91' + targetPhone));
                userSnapshot = await getDocs(qPhoneAlt);
            }
        }

        // 3. Store Enrollment (If user and course found... if not, skip as webhook might have caught it or it's malformed)
        if (matchedCourse && userSnapshot && !userSnapshot.empty) {
            const matchedUser = userSnapshot.docs[0];

            // Prevent duplicate enrollments check
            const enrollmentsRef = collection(db, 'enrollments');
            const qDup = query(enrollmentsRef, where('orderId', '==', order_id));
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
                    orderId: order_id,
                    amount: verifiedOrder.order_amount,
                    status: 'active',
                    enrolledAt: serverTimestamp(),
                    expiresAt: expiresAt ? expiresAt : null
                });
                console.log(`🎉 Client returned. Successfully unlocked course ${matchedCourse.id} for user ${matchedUser.id}`);
            }
        }

        // Safely redirect student into their courses portal
        res.writeHead(302, { Location: '/payment-success.html' });
        return res.end();
    } catch (error) {
        console.error('Error in Return URL handler:', error);
        res.writeHead(302, { Location: '/' });
        return res.end();
    }
}

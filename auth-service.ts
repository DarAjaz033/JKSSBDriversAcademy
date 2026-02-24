import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  ConfirmationResult,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail as fetchSignInMethods
} from 'firebase/auth';
import { auth, db } from './firebase-config';
import { doc, setDoc, getDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';

let recaptchaVerifier: RecaptchaVerifier | null = null;
let confirmationResult: ConfirmationResult | null = null;

export const initRecaptcha = (containerId: string) => {
  if (!recaptchaVerifier) {
    recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      size: 'invisible',
      callback: () => {
      }
    });
  }
  return recaptchaVerifier;
};

export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return { success: true, user: result.user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const signInWithPhone = async (phoneNumber: string) => {
  try {
    const appVerifier = initRecaptcha('recaptcha-container');
    confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    return { success: true };
  } catch (error: any) {
    let errorMessage = error.message;

    if (error.code === 'auth/captcha-check-failed' || error.message.includes('Hostname match not found')) {
      errorMessage = 'Phone authentication is not configured. Please add your domain to Firebase Console > Authentication > Settings > Authorized domains';
    } else if (error.code === 'auth/invalid-phone-number') {
      errorMessage = 'Invalid phone number format. Please use format: +91 1234567890';
    }

    return { success: false, error: errorMessage };
  }
};

export const verifyPhoneCode = async (code: string) => {
  try {
    if (!confirmationResult) {
      return { success: false, error: 'No confirmation result available' };
    }
    const userCredential = await confirmationResult.confirm(code);
    return { success: true, user: userCredential.user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

// ── Firestore user save ──────────────────────────────────────────────────────

export const saveUserToFirestore = async (user: User, extraData?: { name?: string }) => {
  try {
    const userRef = doc(db, 'users', user.uid);
    const existing = await getDoc(userRef);
    const provider = user.providerData[0]?.providerId || 'email';
    const data: any = {
      email: user.email,
      photoURL: user.photoURL || null,
      provider,
      lastLogin: serverTimestamp(),
    };
    if (!existing.exists()) {
      data.name = extraData?.name || user.displayName || '';
      data.createdAt = serverTimestamp();
    } else {
      if (extraData?.name) data.name = extraData.name;
      else if (user.displayName) data.name = user.displayName;
    }
    await setDoc(userRef, data, { merge: true });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// ── Session token (single-session logic) ──────────────────────────────────────

const SESSION_TOKEN_KEY = 'jkssb_session_token';

export const generateAndSaveSessionToken = async (uid: string) => {
  try {
    const token = Date.now().toString() + Math.random().toString(36).slice(2);
    localStorage.setItem(SESSION_TOKEN_KEY, token);
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, { sessionToken: token }, { merge: true });
    return { success: true, token };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const validateSessionToken = async (uid: string): Promise<boolean> => {
  try {
    const localToken = localStorage.getItem(SESSION_TOKEN_KEY);

    // No local token — generate fresh one instead of signing out
    if (!localToken) {
      await generateAndSaveSessionToken(uid);
      return true;
    }

    const snap = await getDoc(doc(db, 'users', uid));

    // Firestore doc doesn't exist or has no token yet — trust Firebase Auth and save token
    if (!snap.exists() || !snap.data()?.sessionToken) {
      await setDoc(doc(db, 'users', uid), { sessionToken: localToken }, { merge: true });
      return true;
    }

    return localToken === snap.data()?.sessionToken;
  } catch {
    // On any error (network, etc.), trust Firebase Auth — don't sign out
    return true;
  }
};

export const clearSessionToken = async (uid: string) => {
  try {
    localStorage.removeItem(SESSION_TOKEN_KEY);
    await setDoc(doc(db, 'users', uid), { sessionToken: null }, { merge: true });
  } catch { }
};

// ── Check if email is registered ──────────────────────────────────────────────

export const checkEmailRegistered = async (email: string): Promise<boolean> => {
  try {
    const methods = await fetchSignInMethods(auth, email);
    return methods.length > 0;
  } catch {
    return false;
  }
};

// ── Single-session watcher ────────────────────────────────────────────────────
// Call this once after login. If Firestore token changes (new device logged in),
// automatically signs out the current session and redirects to login.

let _sessionUnsubscribe: (() => void) | null = null;

export const startSessionWatcher = (uid: string): void => {
  if (_sessionUnsubscribe) _sessionUnsubscribe();

  _sessionUnsubscribe = onSnapshot(
    doc(db, 'users', uid),
    (snap) => {
      if (!snap.exists()) return;
      const firestoreToken = snap.data()?.sessionToken;
      const localToken = localStorage.getItem(SESSION_TOKEN_KEY);
      // If both tokens exist but don't match — new session on another device
      if (firestoreToken && localToken && firestoreToken !== localToken) {
        console.warn('[SessionWatcher] Session invalidated by another device.');
        localStorage.removeItem(SESSION_TOKEN_KEY);
        firebaseSignOut(auth).then(() => {
          window.location.href = './login.html';
        });
      }
    },
    () => { /* Ignore snapshot errors (network etc) */ }
  );
};

export const stopSessionWatcher = (): void => {
  if (_sessionUnsubscribe) { _sessionUnsubscribe(); _sessionUnsubscribe = null; }
};

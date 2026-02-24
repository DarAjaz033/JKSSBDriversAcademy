import { db, storage } from './firebase-config';
import {
  collection,
  addDoc,
  updateDoc,
  setDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from 'firebase/storage';

export interface Course {
  id?: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  category: string;
  rank?: number;
  thumbnailUrl?: string;
  pdfIds: string[];
  practiceTestIds: string[];
  createdAt: any;
  updatedAt: any;
}

export interface PDF {
  id?: string;
  name: string;
  url: string;
  size: number;
  uploadedAt: any;
}

export interface PracticeTest {
  id?: string;
  title: string;
  description: string;
  questions: Question[];
  duration: number;
  courseId?: string;
  createdAt: any;
}

export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface Purchase {
  id?: string;
  userId: string;
  courseId: string;
  amount: number;
  paymentId: string;
  status: string;
  purchasedAt: any;
}

// User roles from Firebase users collection
const USERS_COLLECTION = 'users';

export interface AppUser {
  id?: string;
  email: string;
  role: 'admin' | 'user';
  uid?: string;
}

export const isAdmin = async (user: { uid: string; email: string | null } | null): Promise<boolean> => {
  if (!user) return false;
  try {
    // First try lookup by uid (doc id = uid) - required for Firestore rules
    const userDoc = await getDoc(doc(db, USERS_COLLECTION, user.uid));
    if (userDoc.exists()) {
      return (userDoc.data() as AppUser).role === 'admin';
    }
    // Fallback: query by email (for users added before uid-based structure)
    if (user.email) {
      const q = query(
        collection(db, USERS_COLLECTION),
        where('email', '==', user.email)
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return (snapshot.docs[0].data() as AppUser).role === 'admin';
      }
    }
    return false;
  } catch {
    return false;
  }
};

export const isAdminByEmail = async (email: string | null): Promise<boolean> => {
  if (!email) return false;
  try {
    const q = query(
      collection(db, USERS_COLLECTION),
      where('email', '==', email)
    );
    const snapshot = await getDocs(q);
    return !snapshot.empty && (snapshot.docs[0].data() as AppUser).role === 'admin';
  } catch {
    return false;
  }
};

/** Set user role by uid (doc id = uid). Creates or updates users/{uid}. */
export const setUserRole = async (userId: string, email: string, role: 'admin' | 'user') => {
  try {
    const userRef = doc(db, USERS_COLLECTION, userId);
    await setDoc(userRef, { email, role, uid: userId, updatedAt: serverTimestamp() }, { merge: true });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

/** Add user by email (for pre-login check). Use when uid is not yet known. */
export const addUserByEmail = async (email: string, role: 'admin' | 'user') => {
  try {
    const q = query(collection(db, USERS_COLLECTION), where('email', '==', email));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      await updateDoc(snapshot.docs[0].ref, { role, updatedAt: serverTimestamp() });
    } else {
      await addDoc(collection(db, USERS_COLLECTION), { email, role, createdAt: serverTimestamp() });
    }
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Course Management
export const createCourse = async (course: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const existing = await getDocs(collection(db, 'courses'));
    const maxRank = existing.docs.reduce((max, d) => {
      const r = (d.data() as Course).rank;
      return typeof r === 'number' && r > max ? r : max;
    }, 0);
    const docRef = await addDoc(collection(db, 'courses'), {
      ...course,
      rank: course.rank ?? maxRank + 1,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const updateCourseRank = async (courseId: string, rank: number) => {
  try {
    const courseRef = doc(db, 'courses', courseId);
    await updateDoc(courseRef, { rank, updatedAt: serverTimestamp() });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const updateCourse = async (courseId: string, updates: Partial<Course>) => {
  try {
    const courseRef = doc(db, 'courses', courseId);
    await updateDoc(courseRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const deleteCourse = async (courseId: string) => {
  try {
    await deleteDoc(doc(db, 'courses', courseId));
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const getCourses = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'courses'));
    const courses: Course[] = [];
    querySnapshot.forEach((doc) => {
      courses.push({ id: doc.id, ...doc.data() } as Course);
    });
    courses.sort((a, b) => (a.rank ?? 9999) - (b.rank ?? 9999));
    return { success: true, courses };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const getCourse = async (courseId: string) => {
  try {
    const docSnap = await getDoc(doc(db, 'courses', courseId));
    if (docSnap.exists()) {
      return { success: true, course: { id: docSnap.id, ...docSnap.data() } as Course };
    } else {
      return { success: false, error: 'Course not found' };
    }
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// PDF Management
export const uploadPDF = async (file: File) => {
  try {
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name}`;
    const storageRef = ref(storage, `pdfs/${fileName}`);

    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    const pdfDoc = await addDoc(collection(db, 'pdfs'), {
      name: file.name,
      url,
      size: file.size,
      uploadedAt: serverTimestamp()
    });

    return { success: true, id: pdfDoc.id, url };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const getPDFs = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'pdfs'));
    const pdfs: PDF[] = [];
    querySnapshot.forEach((doc) => {
      pdfs.push({ id: doc.id, ...doc.data() } as PDF);
    });
    return { success: true, pdfs };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const deletePDF = async (pdfId: string, url: string) => {
  try {
    const storageRef = ref(storage, url);
    await deleteObject(storageRef);
    await deleteDoc(doc(db, 'pdfs', pdfId));
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Practice Test Management
export const createPracticeTest = async (test: Omit<PracticeTest, 'id' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'practiceTests'), {
      ...test,
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const getPracticeTests = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'practiceTests'));
    const tests: PracticeTest[] = [];
    querySnapshot.forEach((doc) => {
      tests.push({ id: doc.id, ...doc.data() } as PracticeTest);
    });
    return { success: true, tests };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const deletePracticeTest = async (testId: string) => {
  try {
    await deleteDoc(doc(db, 'practiceTests', testId));
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Purchase Management
export const createPurchase = async (purchase: Omit<Purchase, 'id' | 'purchasedAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'purchases'), {
      ...purchase,
      purchasedAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const getUserPurchases = async (userId: string) => {
  try {
    const q = query(collection(db, 'purchases'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const purchases: Purchase[] = [];
    querySnapshot.forEach((doc) => {
      purchases.push({ id: doc.id, ...doc.data() } as Purchase);
    });
    return { success: true, purchases };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const getAllPurchases = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'purchases'));
    const purchases: Purchase[] = [];
    querySnapshot.forEach((doc) => {
      purchases.push({ id: doc.id, ...doc.data() } as Purchase);
    });
    return { success: true, purchases };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Check if user has purchased a course
export const hasUserPurchasedCourse = async (userId: string, courseId: string) => {
  try {
    const q = query(
      collection(db, 'purchases'),
      where('userId', '==', userId),
      where('courseId', '==', courseId),
      where('status', '==', 'completed')
    );
    const querySnapshot = await getDocs(q);
    return { success: true, hasPurchased: !querySnapshot.empty };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Get user's purchased courses with details
export const getUserCoursesWithDetails = async (userId: string) => {
  try {
    const purchasesResult = await getUserPurchases(userId);
    if (!purchasesResult.success) {
      return purchasesResult;
    }

    const courseIds = purchasesResult.purchases
      ?.filter(p => p.status === 'completed')
      .map(p => p.courseId) || [];

    const courses: Course[] = [];
    for (const courseId of courseIds) {
      const courseResult = await getCourse(courseId);
      if (courseResult.success && courseResult.course) {
        courses.push(courseResult.course);
      }
    }

    return { success: true, courses };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

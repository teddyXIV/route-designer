// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, User } from "firebase/auth";
import { getFirestore, collection, doc, setDoc, query, where, getDocs } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGE_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app)

const db = getFirestore(app);

const analytics = getAnalytics(app);

//===========================================================================
//Sign in/up/out
//===========================================================================

const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    const user = userCredential.user;

    return user;

  } catch (error: any) {
    console.error('Error signing in:', error.message);
  }
}

const logOut = async () => {
  try {
    await signOut(auth)
    console.log("sign out successful")
  } catch (error: any) {
    console.error('Error signing out ', error.message);
  }
}

const signUp = async (email: string, password: string): Promise<User | null> => {
  if (!email || !password) {
    throw new Error('Email and password are required.');
  }

  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters long.');
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userRef = doc(db, 'users', user.uid);
    try {
      await setDoc(userRef, {
        email,
        createdAt: new Date(),
      });
    } catch (firestoreError) {
      console.error('Error saving user to Firestore:', firestoreError);
      await user.delete(); // Clean up the Firebase Auth user
      throw firestoreError;
    }

    return user;
  } catch (error: any) {
    console.error('Error creating account:', error);
    return null
  }
};

export { db, auth, signIn, signUp, logOut };
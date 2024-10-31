
import { initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore, query, where } from "firebase/firestore";

import { 
  FIREBASE_API_KEY, 
  FIREBASE_AUTH_DOMAIN, 
  FIREBASE_PROJECT_ID, 
  FIREBASE_STORAGE_BUCKET, 
  FIREBASE_MESSAGING_SENDER_ID, 
  FIREBASE_APP_ID 
} from '@env';

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const addTestToDb = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "tests"), data);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw new Error("Failed to add test to database");
  }
};


export const getAllTestDocs = async () => {
  try {
    const testCollection = collection(db, 'tests');
    const querySnapshot = await getDocs(testCollection);

    const testDocs = [];
    querySnapshot.forEach((doc) => {
      testDocs.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return testDocs;
  } catch (error) {
    console.error('Error fetching test documents:', error);
    throw new Error('Failed to fetch test documents');
  }
};

export const createUser = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "users"), data);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw new Error("Failed to add test to database");
  }
};

export const getAllUser = async () => {
  try {
    const Collection = collection(db, 'users');
    const querySnapshot = await getDocs(Collection);

    const testDocs = [];
    querySnapshot.forEach((doc) => {
      testDocs.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return testDocs;
  } catch (error) {
    console.error('Error fetching test documents:', error);
    throw new Error('Failed to fetch test documents');
  }
};


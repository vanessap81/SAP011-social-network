import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: 'AIzaSyA41Dab9eY4PHp_wsvUVa9e8nYCsfLSUl8',
  authDomain: 'mypet-network.firebaseapp.com',
  projectId: 'mypet-network',
  storageBucket: 'mypet-network.appspot.com',
  messagingSenderId: '15817347931',
  appId: '1:15817347931:web:647f11598bc19b133a407e',
  measurementId: 'G-M7X1CYLD8K',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

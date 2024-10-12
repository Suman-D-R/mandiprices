// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAi9pBpyqV25w5srW7oA09F-M2vOZPss8w',
  authDomain: 'mandiprices-67f7b.firebaseapp.com',
  projectId: 'mandiprices-67f7b',
  storageBucket: 'mandiprices-67f7b.appspot.com',
  messagingSenderId: '986335113967',
  appId: '1:986335113967:web:eededcc4c5e632efaa611a',
  measurementId: 'G-CMQ0B0N04Z',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics and export it
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, analytics };

import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyD5Dqo9i0A4x-1hGq3VU-PQbXmpYBKxCAU',
  authDomain: 'test-ultilites.firebaseapp.com',
  projectId: 'test-ultilites',
  storageBucket: 'test-ultilites.appspot.com',
  messagingSenderId: '631475575592',
  appId: '1:631475575592:web:b4b86fd3867712ee6ace1d',
};

const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: 'AIzaSyDyiJc7FeI0dadfJTrm194X4GRyTp5-v2o',
  authDomain: 'soccerauth-ec8ee.firebaseapp.com',
  projectId: 'soccerauth-ec8ee',
  storageBucket: 'soccerauth-ec8ee.appspot.com',
  messagingSenderId: '535152503610',
  appId: '1:535152503610:web:58a96ff642b58052b3be03',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;

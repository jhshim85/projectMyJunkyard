import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDZTGfaxpkKZNP5Qdm75JpiFbVlWhytNzs",
  authDomain: "my-junkyard.firebaseapp.com",
  projectId: "my-junkyard",
  storageBucket: "my-junkyard.appspot.com",
  messagingSenderId: "860205631796",
  appId: "1:860205631796:web:3e18a4103c49ba9cdbfd61"
};

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID
// };

const app = initializeApp(firebaseConfig);
// const firestore = getFirestore(app);
// export const db = {
  //   folders: collection(firestore, 'folders'),
  //   files: collection(firestore, 'files')
  // }
  
  export const auth = getAuth(app);
  export const storage = getStorage(app);
  export const db = getFirestore(app);
export default app
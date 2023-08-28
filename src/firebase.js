import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

const app = initializeApp(firebaseConfig);
// const firestore = getFirestore(app);
// export const db = {
//   folders: collection(firestore, 'folders'),
//   files: collection(firestore, 'files')
// }
// export const db = {
//   formatDoc: (doc) => {
//     return {
//       id: doc.id,
//       ...doc.data(),
//     };
//   },
//   folders: firestore.collection("folders"),
//   files: firestore.collection("files"),
// };

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

// export const db = initializeFirestore(app, {
//   experimentalForceLongPolling: true,
//   useFetchStreams: false,
// });

export default app
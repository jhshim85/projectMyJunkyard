import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDZTGfaxpkKZNP5Qdm75JpiFbVlWhytNzs",
  authDomain: "my-junkyard.firebaseapp.com",
  projectId: "my-junkyard",
  storageBucket: "my-junkyard.appspot.com",
  messagingSenderId: "860205631796",
  appId: "1:860205631796:web:3e18a4103c49ba9cdbfd61"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app
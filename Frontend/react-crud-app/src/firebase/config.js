// import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//   apiKey: "AIzaSyD-fNwGdZAT0FLha1L2arpLTbyUyLUYGko",
//   authDomain: "react-crudapp-e653f.firebaseapp.com",
//   projectId: "react-crudapp-e653f",
//   storageBucket: "react-crudapp-e653f.appspot.com",
//   messagingSenderId: "893132011526",
//   appId: "1:893132011526:web:0424b8818dce566f216b87"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD-fNwGdZAT0FLha1L2arpLTbyUyLUYGko",
  authDomain:"react-crudapp-e653f.firebaseapp.com",
  projectId: "react-crudapp-e653f",
  storageBucket: "react-crudapp-e653f.appspot.com",
  messagingSenderId: "893132011526",
  appId: "1:893132011526:web:0424b8818dce566f216b87"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage };
import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqW8MxzsZVA3i34mFBH11vfmeuYwJ-hag",
  authDomain: "instagram-clone-fbd32.firebaseapp.com",
  projectId: "instagram-clone-fbd32",
  storageBucket: "instagram-clone-fbd32.appspot.com",
  messagingSenderId: "678762293481",
  appId: "1:678762293481:web:d075407a236d59b7f72878",
  measurementId: "G-09LCEZ4M70",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };

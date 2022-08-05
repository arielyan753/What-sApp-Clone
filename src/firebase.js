import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

  const firebaseConfig ={
    apiKey: "AIzaSyBn3hvdnuAOjo5trQ_7BA2ap2NVoIEr6VE",
    authDomain: "what-s-app-clone-93a2a.firebaseapp.com",
    projectId: "what-s-app-clone-93a2a",
    storageBucket: "what-s-app-clone-93a2a.appspot.com",
    messagingSenderId: "477408640208",
    appId: "1:477408640208:web:b2e50a053d8c77bfe9f2d5",
    measurementId: "G-R45718T41J"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export {auth,provider} ;
export default db;
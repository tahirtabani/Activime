import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfiRNa7TURPGBoKk05mzT0LBOeAHJT_aE",

  authDomain: "fir-auth-4f282.firebaseapp.com",

  projectId: "fir-auth-4f282",

  storageBucket: "fir-auth-4f282.appspot.com",

  messagingSenderId: "705383590288",

  appId: "1:705383590288:web:31c5cf9a47faff8bfc6b15",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
const auth = firebase.auth();
const db = app.firestore();

export { firebase ,app, auth, db };

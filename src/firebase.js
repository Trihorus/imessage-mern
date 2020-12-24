import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCXdG_AQvnws9tZzrndkH7RgS2TIK4bb1g",
    authDomain: "imessage-7fe63.firebaseapp.com",
    projectId: "imessage-7fe63",
    storageBucket: "imessage-7fe63.appspot.com",
    messagingSenderId: "143456566845",
    appId: "1:143456566845:web:44169a9aaccddb7cb57454",
    measurementId: "G-GGN0N8X1NP"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;

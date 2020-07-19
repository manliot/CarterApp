import firebase from 'firebase';
import 'firebase/firestore'


/* class Firebase {
    static init() {
        initializeApp({
            apiKey: "AIzaSyBW4oOWD6HdpWtnqqVc6ZwLdn59VjQWRP8",
            authDomain: "caplist-c5148.firebaseapp.com",
            databaseURL: "https://caplist-c5148.firebaseio.com",
            projectId: "caplist-c5148",
            storageBucket: "caplist-c5148.appspot.com",
            messagingSenderId: "85436634075",
            appId: "1:85436634075:web:b3d02b83ac22d4b823cdfe",
            measurementId: "G-F5ZPLSSEDQ"
        }
        )
    }
} */
var firebaseConfig = {
    apiKey: "AIzaSyBW4oOWD6HdpWtnqqVc6ZwLdn59VjQWRP8",
    authDomain: "caplist-c5148.firebaseapp.com",
    databaseURL: "https://caplist-c5148.firebaseio.com",
    projectId: "caplist-c5148",
    storageBucket: "caplist-c5148.appspot.com",
    messagingSenderId: "85436634075",
    appId: "1:85436634075:web:b3d02b83ac22d4b823cdfe",
    measurementId: "G-F5ZPLSSEDQ"
};
// Initialize Firebase
/* const fb = firebase.initializeApp(firebaseConfig);
export default db = fb.firestore() 
const fb = firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();*/
const fb = firebase.initializeApp(firebaseConfig)
export default db = fb.firestore() 
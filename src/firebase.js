import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCwC95sRJStBNFOsH185dKJ-Ky45j4mimo",
    authDomain: "yt-abb.firebaseapp.com",
    projectId: "yt-abb",
    storageBucket: "yt-abb.appspot.com",
    messagingSenderId: "920318962760",
    appId: "1:920318962760:web:e694825355110c7a573c7d",
};

firebase.initializeApp(firebaseConfig);

export default firebase.auth();

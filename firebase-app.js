import {initializeApp} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";
import {getAuth} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";
import {getFirestore} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";
const firebaseConfig = {
 apiKey: "AIzaSyB0TyVyjUp3lzO6l1L5aqBrHwXFD2rVPg4",
 authDomain: "lardemaria-beaaa.firebaseapp.com",
 projectId: "lardemaria-beaaa",
 storageBucket: "lardemaria-beaaa.firebasestorage.app",
 messagingSenderId: "849054289684",
 appId: "1:849054289684:web:8f877715672373c28dbc01"
};
export const app=initializeApp(firebaseConfig), auth=getAuth(app), db=getFirestore(app);
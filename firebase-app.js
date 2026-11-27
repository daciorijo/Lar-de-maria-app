import {initializeApp} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import {getAuth} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import {getFirestore} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";
const firebaseConfig = {
                    apiKey: "AIzaSyDrLCoUhezEKy6qtSCTSa25AxyStKtmw8M",
                    authDomain: "lar-de-maria-f2c45.firebaseapp.com",
                    projectId: "lar-de-maria-f2c45",
                    storageBucket: "lar-de-maria-f2c45.firebasestorage.app",
                    messagingSenderId: "839400810340",
                    appId: "1:839400810340:web:f601ba799d518e5292fc71"
                };
export const app=initializeApp(firebaseConfig), auth=getAuth(app), db=getFirestore(app);
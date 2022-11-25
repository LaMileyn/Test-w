
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyAUTHdawEgHJdS8KXd6CBKw9cWtpnq17sE",
    authDomain: "todo-test-work.firebaseapp.com",
    projectId: "todo-test-work",
    storageBucket: "todo-test-work.appspot.com",
    messagingSenderId: "683469499869",
    appId: "1:683469499869:web:bcc0f0d0e8e9b2248f9a34"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)
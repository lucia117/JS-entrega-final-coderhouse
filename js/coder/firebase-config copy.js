// Import the functions you need from the SDKs you need
//import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";

//ponerlo en todas las paginas
//<script src="https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js"></script>

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBC2jI2iB9qveyKrsP-bjlQsn0qTDnu2ng",
    authDomain: "proyecto-coderhouse-js.firebaseapp.com",
    projectId: "proyecto-coderhouse-js",
    storageBucket: "proyecto-coderhouse-js.appspot.com",
    messagingSenderId: "848449723155",
    appId: "1:848449723155:web:389eea9e45481a081358e6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const guardar = async () => {
    await db.collection('personal-data').doc().set({
        email: "mail@mail.com",
        password: "1234"
    });
}
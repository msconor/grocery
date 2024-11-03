// Firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCT8axqLjDjypUjOeK4JdAxuabkBDE4oG0",
    authDomain: "reward-point-86f51.firebaseapp.com",
    databaseURL: "https://reward-point-86f51-default-rtdb.firebaseio.com/",
    projectId: "reward-point-86f51",
    storageBucket: "reward-point-86f51.appspot.com",
    messagingSenderId: "749995309345",
    appId: "1:749995309345:web:3a4bf1462f6fb64e45e660",
    measurementId: "G-J9T0HVYM0P"
};
const app = initializeApp(firebaseConfig);


const database = getDatabase(app);
 
 function updatePoints(phone) {
    const userRef = database.ref('users/' + phone);

    userRef.transaction(currentData => {
      if (currentData === null) {
        return { points: 20 }; // Initialize with 20 points if the user does not exist
      } else {
        return { points: (currentData.points || 0) + 20 }; // Add 20 points to the existing points
      }
    }, (error, committed, snapshot) => {
      if (error) {
        console.error('Error updating points:', error.message);
      } else if (!committed) {
        console.log('Transaction not committed');
      } else {
        console.log('Points updated:', snapshot.val());
        alert('Points updated successfully! New points: ' + snapshot.val().points);
      }
    });
  }


  
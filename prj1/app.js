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
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('registerName').value;
    const phone = document.getElementById('registerphone').value;
    const password = document.getElementById('registerPassword').value;

   
    set(ref(database, 'users/' + phone + '/' + 'grocery_wala'), {
        name : name,
        phone: phone,
        password: password,
        points: 20 
    }).then(() => {
        alert('Registered successfully! Reward points: 20');
    }).catch((error) => {
        console.error('Error saving data: ', error.message);
        alert('Error saving data: ' + error.message);
    });
});


document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const phone = document.getElementById('loginPhone').value;
    const password = document.getElementById('loginPassword').value;

    const dbRef = ref(database);

    get(child(dbRef, 'users/' + phone +'/'+ 'grocery_wala')).then((snapshot) => {
        if (snapshot.exists()) {
            const userData = snapshot.val();

            if (userData.password === password) {
                localStorage.setItem('userName',userData.name);
                localStorage.setItem('userPoints',userData.points);
                localStorage.setItem('userPhone', userData.phone); 
                window.location.href='grocery.html'
                
               
            } else {
                alert('Invalid name or password!');
            }
        } else {
            alert('User not found!');
        }
    }).catch((error) => {
        console.error('Error retrieving data: ', error.message);
        alert('Error retrieving data: ' + error.message);
    });
});
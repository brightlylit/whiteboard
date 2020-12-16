//Firebase configuration
import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyA63o9xFuYwmRy1tocpeIGPoon3aYLEzTE",
    authDomain: "reader-58c8e.firebaseapp.com",
    databaseURL: "https://reader-58c8e.firebaseio.com",
    projectId: "reader-58c8e",
    storageBucket: "reader-58c8e.appspot.com",
    messagingSenderId: "750276672084",
    appId: "1:750276672084:web:71c958ea9e979d0d700bc1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

export default database;
// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
    apiKey: "AIzaSyD_GPPXhd9ATVic7q1F90yGAzYVwSx6RMw",
    authDomain: "grief-unleashed.firebaseapp.com",
    projectId: "grief-unleashed",
    storageBucket: "grief-unleashed.appspot.com",
    messagingSenderId: "1096641136581",
    appId: "1:1096641136581:web:cc3fa763594bfeecb2edac",
    measurementId: "G-KMS2RB2LYG"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

/* Backgorund message handler */
messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    // self.registration.showNotification(
    //     notificationTitle,
    //     notificationOptions
    // );
});
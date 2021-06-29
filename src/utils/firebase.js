import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD_GPPXhd9ATVic7q1F90yGAzYVwSx6RMw",
    authDomain: "grief-unleashed.firebaseapp.com",
    projectId: "grief-unleashed",
    storageBucket: "grief-unleashed.appspot.com",
    messagingSenderId: "1096641136581",
    appId: "1:1096641136581:web:cc3fa763594bfeecb2edac",
    measurementId: "G-KMS2RB2LYG"
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

/* Foreground notification handler */
export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
});

export const getDeviceToken = (setTokenFound, setDeviceToken) => {
    return messaging.getToken({vapidKey: 'BDpZ4DQRjeSul5ZHk0y863moKimgfsOGukxeI1PJmzqrt47cLGUyEUy0czr1hclHYpOfHOy-IDt2sDg5_Pziiis'}).then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        setTokenFound(true);
        setDeviceToken(currentToken);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log('No registration token available. Request permission to generate one.');
        setTokenFound(false);
        // shows on the UI that permission is required 
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
}

export default firebaseConfig;
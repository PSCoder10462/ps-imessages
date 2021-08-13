import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBI9-Wi_pm2ltr9oxKdsyA1AMGN60G-91U",
  authDomain: "imessage-7b6a0.firebaseapp.com",
  databaseURL: "https://imessage-7b6a0.firebaseio.com",
  projectId: "imessage-7b6a0",
  storageBucket: "imessage-7b6a0.appspot.com",
  messagingSenderId: "133409868255",
  appId: "1:133409868255:web:3387bc09066a15899bdc6a",
  measurementId: "G-FLKJK4ZKCR"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
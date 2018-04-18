import * as firebase from 'firebase';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "setdrop-33fd4.firebaseapp.com",
  databaseURL: "https://setdrop-33fd4.firebaseio.com",
  projectId: "setdrop-33fd4",
  storageBucket: "",
  messagingSenderId: "803394100008"
};
console.log(firebase.apps.length);
if(!firebase.apps.length){
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
  auth
};

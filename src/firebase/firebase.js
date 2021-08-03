import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyAyjiUdvhsrFmz3tgX952mxBd047b6p40c",
    authDomain: "react-chat-application-edee7.firebaseapp.com",
    projectId: "react-chat-application-edee7",
    storageBucket: "react-chat-application-edee7.appspot.com",
    messagingSenderId: "696421517514",
    appId: "1:696421517514:web:c3d6ad38e658d65b4f0c33"
  }).auth();
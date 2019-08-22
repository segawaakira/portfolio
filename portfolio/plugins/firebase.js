import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyAptpwlfzPpVNBzedwwEShg2vipUAXBvVI",
  authDomain: process.env.FIREBASE_PROJECT_ID+".firebaseapp.com",
  databaseURL: "https://"+process.env.FIREBASE_PROJECT_ID+".firebaseio.com",
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_PROJECT_ID+".appspot.com",
  messagingSenderId: "195848604817"
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export default firebase
const firebase = require("firebase-admin");
const serviceAccount = require("./phinsecurityassessment-firestorekey.json");

const firestore = firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
});

module.exports = firestore;

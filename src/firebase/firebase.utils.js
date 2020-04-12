import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyD87QX-OcExU_OWJIEs4sZQuIxhOkACx3I",
    authDomain: "crwn-clothing-3fe09.firebaseapp.com",
    databaseURL: "https://crwn-clothing-3fe09.firebaseio.com",
    projectId: "crwn-clothing-3fe09",
    storageBucket: "crwn-clothing-3fe09.appspot.com",
    messagingSenderId: "580849073532",
    appId: "1:580849073532:web:bfff82d019f052523b78f9",
    measurementId: "G-SWVF3E89VY"
  }

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    
    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message)
      }
    }

    return userRef;
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const SignInWithGoogle = () => auth.signInWithPopup(provider);
  export default firebase;
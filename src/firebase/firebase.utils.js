import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBUjDnelH5NsSOSE-XnwWIadKeGM-2jg0s",
  authDomain: "crwn-db-2c72e.firebaseapp.com",
  databaseURL: "https://crwn-db-2c72e.firebaseio.com",
  projectId: "crwn-db-2c72e",
  storageBucket: "",
  messagingSenderId: "365377761818",
  appId: "1:365377761818:web:883e355a814a95af"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  
  if(!userAuth) return;
  
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  
  if(!snapShot.exists){

    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    }catch(error){
      console.log('error creating user', error.message);
    }

  }

  return userRef;

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

import { app } from "./config.js";

const auth = () => getAuth(app);

async function createUser(name, email, password) {
  await createUserWithEmailAndPassword(auth(), email, password)
    .then(() => {
      updateProfile(auth().currentUser, {
        displayName: name,
        // photoURL:
      });
    })
    .catch((error) => {
      throw error;
    });
}

function checkLogin() {
  onAuthStateChanged(auth(), (user) => {
    if (user) {
      // window.location.href = "#timeline";
      console.log("usuário logado");
    } else {
      window.location.href = "#login";
    }
  });
}

function getUserInfo() {
  return auth().currentUser;
}

async function signIn(email, password) {
  await signInWithEmailAndPassword(auth(), email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  //location.hash = "#timeline";
}

const provider = new GoogleAuthProvider();

async function signGoogle() {
  await signInWithPopup(auth(), provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
}

async function resetLink(email) {
  await sendPasswordResetEmail(auth(), email);
}

async function exit() {
  await signOut(auth());
  location.hash = "#login";
}

export {
  auth,
  createUser,
  signIn,
  signGoogle,
  resetLink,
  exit,
  checkLogin,
  getUserInfo,
};

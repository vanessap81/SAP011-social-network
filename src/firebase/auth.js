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
} from 'firebase/auth';

import { app } from './config.js';

const auth = () => getAuth(app);

async function createUser(name, email, password) {
  const auth1 = getAuth(app);
  await createUserWithEmailAndPassword(auth1, email, password)
    .then(() => {
      updateProfile(auth1.currentUser, {
        displayName: name,
      });
    })
    .catch((error) => {
      throw error;
    });
}

function checkLogin() {
  return onAuthStateChanged(auth(), (user) => {
    if (user) {
      return true;
    }
    window.location.href = '#login';
    return false;
  });
}

function getUserInfo() {
  return auth().currentUser;
}

async function signIn(email, password) {
  await signInWithEmailAndPassword(auth(), email, password);
}

const provider = new GoogleAuthProvider();

async function signGoogle() {
  await signInWithPopup(auth(), provider);
}

async function resetLink(email) {
  await sendPasswordResetEmail(auth(), email).then(() => {
  });
}

async function exit() {
  await signOut(auth()).then(() => {
  });
  window.location.hash = '#login';
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

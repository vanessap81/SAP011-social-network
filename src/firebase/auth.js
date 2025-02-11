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
      return true;
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
  // Caso não exista cria o usuário na collection
  // Chamar getDoc e setDoc do firebase
  // const userData = await getDoc(doc(db, "users", auth.currentUser.uid));
  // if (!userData.exists()) {
  //   const userGoogle = {
  //     email: auth.currentUser.email,
  //     nome: auth.currentUser.displayName,
  //   };

  //   await setDoc(doc(db, "users", auth.currentUser.uid), userGoogle);
  //   console.log("usuarioCriado");
  // }
}

async function resetLink(email) {
  await sendPasswordResetEmail(auth(), email)
    .then(() => {
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  //location.hash = "#login";
}

async function exit() {
  await signOut(auth())
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
  location.hash = "#login";
}

export {
  createUser,
  signIn,
  signGoogle,
  resetLink,
  exit,
  checkLogin,
  getUserInfo,
};

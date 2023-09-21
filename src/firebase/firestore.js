import { collection, addDoc, getDocs } from "firebase/firestore";

import { getAuth } from "firebase/auth";
import { db, app } from "./config.js";

const auth = () => getAuth(app);

async function savePost(postText) {
  const date = Date.now();
  const currentDate = new Date(date);
  const postDate = currentDate.toLocaleDateString();

  const post = {
    author: auth().currentUser.uid,
    name: auth().currentUser.displayName,
    texto: postText,
    likes: [],
    data: postDate,
  };

  const docRef = await addDoc(collection(db, "posts"), post);
  post.id = docRef.id;
  return post;
}

async function getPosts() {
  const querySnapshot = await getDocs(collection(db, "posts"));
  const postsInFirebase = [];
  querySnapshot.forEach((doc) => {
    const collection = doc.data();
    postsInFirebase.push(collection);
  });
  return postsInFirebase;
}

export { auth, savePost, getPosts };

// async function getPosts() {
//   const querySnapshot = await getDocs(collection(db, "posts"));
//   const postsInFirebase = [];
//   querySnapshot.forEach((doc) => {
//     const collection = {
//       // docId: doc.id,
//       docData: doc.data(),
//     };
//     postsInFirebase.push(collection);
//   });
//   return postsInFirebase;
// }

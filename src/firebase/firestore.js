import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
} from "firebase/firestore";

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
  const postOrder = query(collection(db, "posts"), orderBy("data", "desc"));
  const querySnapshot = await getDocs(postOrder);
  const postsInFirebase = [];
  querySnapshot.forEach((doc) => {
    const collection = doc.data();
    collection.postId = doc.id;
    postsInFirebase.push(collection);
  });
  // console.log(postsInFirebase[0]);
  // console.log(`Post Id: ${postsInFirebase[0].postId}`);
  return postsInFirebase;
}

// EM CONSTRUÇÃO
function deletePost(postId) {
  const postRef = doc(db, "posts", postId);
  deleteDoc(postRef);
}

function likeIt(postId, uid) {
  updateDoc(doc(db, "posts", postId), {
    likes: arrayUnion(uid),
  });
}

function disLikeIt(postId, uid) {
  updateDoc(doc(db, "posts", postId), {
    likes: arrayRemove(uid),
  });
}

export { auth, savePost, getPosts, deletePost, likeIt, disLikeIt };

// async function getPosts() {
//   const querySnapshot = await getDocs(collection(db, "posts"));
//   const postsInFirebase = [];
//   querySnapshot.forEach((doc) => {
//     const collection = {
//       docId: doc.id,
//       docData: doc.data(),
//     };
//     postsInFirebase.push(collection);
//   });
//   return postsInFirebase;
// }

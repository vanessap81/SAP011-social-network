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

// const querySnapshot = await getDocs(collection(db, "posts"));
// querySnapshot.forEach((doc) => {
//   console.log(doc.id, " => ", doc.data());
// });

// async function showPosts() {
//   const textos = [];
//   const ordenarPost = query(collection(db, "posts"), orderBy("data", "desc"));
//   const colecaoPosts = await getDocs(ordenarPost);
//   colecaoPosts.forEach((post) => {
//     const data = post.data();
//     data.id = post.id;
//     textos.push(data);
//   });
//   return textos;
// }

export { auth, savePost };

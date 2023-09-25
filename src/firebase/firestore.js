import { collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db, app } from './config.js';

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

  const docRef = await addDoc(collection(db, 'posts'), post);
  post.id = docRef.id;
  return post;
}

export { auth, savePost };

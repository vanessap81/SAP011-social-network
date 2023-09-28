import { exit, auth, getUserInfo } from '../../firebase/auth.js';

import {
  savePost,
  getPosts,
  deletePost,
  likeIt,
  disLikeIt,
} from '../../firebase/firestore.js';

import feedLogo from '../../img/logo-top-timeline.png';
import exitIcon from '../../img/exit-icon.png';
import sendIcon from '../../img/send-button-white.png';
import homeIcon from '../../img/feed-home-icon.png';
import postPhoto from '../../img/post-photo1-no-bg.png';
import noHeart from '../../img/post-no-likes.png';
import heart from '../../img/post-likes.png';
import pencil from '../../img/post-edit.png';
import trash from '../../img/post-trash.png';

const screen = `
      <section id="main-timeline">
        <div id="div-logo">
            <img class="logo" src="${feedLogo}" alt="MyPet logo">

            <button id="signout-button" type="button"><img class="logout" src="${exitIcon}" alt=""></button>
            
        </div>

          <div id="feed">
            <div id="feed-container">
          </div>

          <div id="input-container">
            <input type="text" name="post" placeholder="Publique algo" id="postPlace"/>
            <button id="publish-button" type="button"><img src="${sendIcon}" alt="Send Button"></button>
          </div>

          </div>

          <div id="functions">
            <button id="home-button" type="button"><img src="${homeIcon}" alt=""></button>
        </div>

      </section>`;

export default async () => {
  const container = document.getElementById('app');
  container.innerHTML = screen;

  const exitBtn = document.getElementById('signout-button');
  exitBtn.addEventListener('click', exit);

  const backToTop = document.querySelector('#home-button');
  const feed = document.querySelector('#feed-container');
  backToTop.addEventListener('click', () => {
    feed.scrollTo(0, 0);
  });

  const postButton = document.getElementById('publish-button');
  const postPlace = document.getElementById('postPlace');
  const feedContainer = document.getElementById('feed-container');

  // EXIBIR POST DA COLEÇÃO
  const arrayDePosts = await getPosts();

  async function putPostsInFeed() {
    getUserInfo();

    feedContainer.innerHTML = arrayDePosts
      .map(
        (post) => `
        <div class="post" id="post">
          <div class="user-info">
            <img src="${postPhoto}" alt="Foto do perfil">
            <div class="post-text">
              <p class="username">${post.name}</p>
              <p class="text">${post.texto}</p>
            </div>
          </div>
          <div class="dateAndLikes">
            <p class="postDate">${post.data}</p>
            ${
  post.author === auth().currentUser.uid
    ? `
              <button type="button" id="btn-delete" class="btn-delete" data-postid="${post.postId}"><img class="trash" src="${trash}" alt="Apagar   post"></button>

              <button type="button" id="btn-edit" class="btn-edit" data-postid="${post.postId}"><img class="edit" src="${pencil}" alt="Editar   post"></button>
            `
    : ''
}

            <div class="likesNumber">
              
              <button type="button" id="btn-like" class="btn-like" data-postid="${
  post.postId
}" data-postAuthor="${auth().currentUser.uid}" data-like="${
  post.likes
}">
                <img ${
  post.likes.includes(auth().currentUser.uid)
    ? `src="${heart}"`
    : `src="${noHeart}"`
} id="heart"
                class="heart" alt="Likes">
              </button>

              <p id="numbersLike">${post.likes.length}</p>
            </div>

          </div>
        </div>
        `,
      )
      .join('');
  }

  async function postFunctions() {
    putPostsInFeed();

    const feed = document.getElementById('feed-container');

    feed.addEventListener('click', (event) => {
      const parentNode = event.target.parentNode;
      const postId = parentNode.getAttribute('data-postid');
      const postAuthor = auth().currentUser.uid;
      const clickedBtn = parentNode.getAttribute('id');
      const likes = parentNode.getAttribute('data-like');

      if (clickedBtn === 'btn-delete') {
        const post = document.getElementById('post');
        post.remove();
        deletePost(postId);
      }

      if (clickedBtn === 'btn-like') {
        likeIt(postId, postAuthor);
      }

      if (clickedBtn === 'btn-like' && likes.includes(postAuthor)) {
        disLikeIt(postId, postAuthor);
      }
    });
  }

  postFunctions();

  // FUNÇÃO DE POSTAR CONTEÚDO
  function postIt() {
    const postContainer = document.createElement('div');
    const user = getUserInfo();

    const date = Date.now();
    const currentDate = new Date(date);
    const postDate = currentDate.toLocaleDateString();

    // LAYOUT DA POSTAGEM
    const postLayout = `
        <div class="post">
          <div class="user-info">
            <img src="${postPhoto}" alt="Foto do perfil">
            <div class="post-text">
              <p class="username">${user.displayName}</p>
              <p class="text">${postPlace.value}</p>
            </div>
          </div>
          <div class="dateAndLikes">
            <p class="postDate">${postDate}</p>
            ${
  user.author === auth().currentUser.uid
    ? `
              <button type="button" class="btn-delete" data-postid="${user.postId}"><img class="trash" src="${trash}" alt="Apagar   post"></button>

              <button type="button" id="btn-edit" class="btn-edit" data-postid="${user.postId}"><img class="edit" src="${pencil}" alt="Editar   post"></button>
            `
    : ''
}
            <div class="likesNumber">
              
              <button type="button" class="btn-like" data-postid="${
  user.postId
}" data-postAuthor="${auth().currentUser.uid}">
                <img class="heart" src="${noHeart}" alt="Likes">
              </button>
              <p>0</p>

          </div>
        </div>`;

    postContainer.innerHTML = postLayout;

    document
      .getElementById('feed-container')
      .insertAdjacentElement('afterbegin', postContainer);

    postPlace.value = '';
  }

  async function createNewPost() {
    if (postPlace.value !== '') {
      await savePost(postPlace.value);
      postIt();
    }
  }

  postButton.addEventListener('click', createNewPost);
};

import { exit, getUserInfo } from "../../firebase/auth.js";
// import meme from "../../img/angry-cat.gif";
import feedLogo from "../../img/logo-top-timeline.png";
import exitIcon from "../../img/exit-icon.png";
import sendIcon from "../../img/send-button-white.png";
import homeIcon from "../../img/feed-home-icon.png";
import searchIcon from "../../img/feed-search-icon.png";
import postIcon from "../../img/feed-post-icon.png";
import profileIcon from "../../img/feed-profile-icon.png";
import postPhoto from "../../img/post-photo1-no-bg.png";
import noHeart from "../../img/post-no-likes.png";
// import heart from "../../img/post-likes.png";
import { savePost, getPosts } from "../../firebase/firestore.js";
import { async } from "regenerator-runtime";

const screen = `
      <section id="main-timeline">
        <div id="div-logo">
            <img class="logo" src="${feedLogo}" alt="MyPet logo">

            <button id="signout-button" type="button"><img class="logout" src="${exitIcon}" alt=""></button>
            
        </div>

          <div id="feed">

            <div id="feed-container"></div>

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
  const container = document.getElementById("app");
  container.innerHTML = screen;

  const exitBtn = document.getElementById("signout-button");
  exitBtn.addEventListener("click", exit);

  const backToTop = document.querySelector("#home-button");
  const feed = document.querySelector("#feed-container");
  backToTop.addEventListener("click", function () {
    feed.scrollTo(0, 0);
  });

  const postButton = document.getElementById("publish-button");
  const postPlace = document.getElementById("postPlace");
  const feedContainer = document.getElementById("feed-container");

  // FUNÇÃO DE POSTAR CONTEÚDO
  function postIt() {
    if (postPlace.value !== "") {
      const postContainer = document.createElement("div");
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
            <p class="postDate">Postado em: ${postDate}</p>
            <p class="likesNumber">0</p>
            <p><img class="heart" src="${noHeart}" alt="Likes"></p>
          </div>
        </div>`;

      postContainer.innerHTML = postLayout;

      feedContainer.appendChild(postContainer);
      postPlace.value = "";
    }
  }

  async function createNewPost() {
    await savePost(postPlace.value);
    postIt();
  }

  postButton.addEventListener("click", createNewPost);

  const arrayDePosts = await getPosts();
  // EXIBIR POST DA COLEÇÃO
  function putPostsInFeed() {
    feedContainer.innerHTML = arrayDePosts
      .map(
        (post) => `
        <div class="post">
          <div class="user-info">
            <img src="${postPhoto}" alt="Foto do perfil">
            <div class="post-text">
              <p class="username">${post.name}</p>
              <p class="text">${post.texto}</p>
            </div>
          </div>
          <div class="dateAndLikes">
          <p class="postDate">Postado em: ${post.data}</p>
          <p class="likesNumber">0</p>
          <p><img class="heart" src="${noHeart}" alt="Likes"></p>
          </div>
        </div>
      `
      )
      .join("");
  }

  putPostsInFeed();
};

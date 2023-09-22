import { exit, auth, getUserInfo } from "../../firebase/auth.js";
import feedLogo from "../../img/logo-top-timeline.png";
import exitIcon from "../../img/exit-icon.png";
import sendIcon from "../../img/send-button-white.png";
import homeIcon from "../../img/feed-home-icon.png";
import postPhoto from "../../img/post-photo1-no-bg.png";
import noHeart from "../../img/post-no-likes.png";
import pencil from "../../img/post-edit.png";
import trash from "../../img/post-trash.png";
// import heart from "../../img/post-likes.png";
import { savePost, getPosts, deletePost } from "../../firebase/firestore.js";
// import { async } from "regenerator-runtime";

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
            <p class="postDate">${postDate}</p>
            <button type="button" id="btn-delete"><img class="trash" src="${trash}" alt="Likes"></button>
            <button type="button" id="btn-edit"><img class="edit" src="${pencil}" alt="Likes"></button>
            <p class="likesNumber">0</p>
            <button type="button" id="btn-like"><img class="heart" src="${noHeart}" alt="Likes"></button>
            
            <div class="modal-container id="modal-container">
              <div class="modal">
                <p class="question">Tem certeza de que deseja excluir?</p>
                  <div class="btn-modal">
                    <button class="btn-yes" id='btn-excluir'>Excluir</button>
                    <button class="btn-no" id="btn-cancelar">Cancelar</button>
                  </div>
              </div>
            </div>

          </div>
        </div>`;

    postContainer.innerHTML = postLayout;

    document
      .getElementById("feed-container")
      .insertAdjacentElement("afterbegin", postContainer);
    postPlace.value = "";

    //if para função de mostrar ou ocultar icones de editar e excluir
    // if (  === auth().currentUser.uid) {
    //   console.log("iguais");
    // }
  }

  async function createNewPost() {
    if (postPlace.value !== "") {
      await savePost(postPlace.value);
      postIt();
    }
  }

  postButton.addEventListener("click", createNewPost);

  // EXIBIR POST DA COLEÇÃO
  const arrayDePosts = await getPosts();

  function putPostsInFeed() {
    feedContainer.innerHTML = arrayDePosts
      .map(
        (post) => `
        <div class="post">
          <div class="user-info">
            <img src="${postPhoto}" alt="Foto do perfil">
            <div class="post-text">
              <p class="username">${post.name}</p>
              <p class="postAuthor">${post.author}</p>
              <p class="text">${post.texto}</p>
            </div>
          </div>
          <div class="dateAndLikes">
            <p class="postDate">${post.data}</p>
            <button type="button" id="btn-delete"><img class="trash" src="${trash}" alt="Likes"></button>
            <button type="button" id="btn-edit"><img class="edit" src="${pencil}" alt="Likes"></button>
            <p class="likesNumber">0</p>
            <button type="button" id="btn-like"><img class="heart" src="${noHeart}" alt="Likes"></button>
          </div>
        </div>
      `
      )
      .join("");

    getUserInfo();
    console.log(auth().currentUser.uid);

    // if (post.author === auth().currentUser.uid) {
    //   console.log("iguais");
    // }
  }

  putPostsInFeed();
};

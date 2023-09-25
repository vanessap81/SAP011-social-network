import { exit, auth, getUserInfo } from "../../firebase/auth.js";
import feedLogo from "../../img/logo-top-timeline.png";
import exitIcon from "../../img/exit-icon.png";
import sendIcon from "../../img/send-button-white.png";
import homeIcon from "../../img/feed-home-icon.png";
import postPhoto from "../../img/post-photo1-no-bg.png";
import noHeart from "../../img/post-no-likes.png";
import pencil from "../../img/post-edit.png";
import trash from "../../img/post-trash.png";
import heart from "../../img/post-likes.png";
import {
  savePost,
  getPosts,
  deletePost,
  likeIt,
  disLikeIt,
} from "../../firebase/firestore.js";
import { doc } from "firebase/firestore";
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

  // EXIBIR POST DA COLEÇÃO
  const arrayDePosts = await getPosts();

  function putPostsInFeed() {
    getUserInfo();

    feedContainer.innerHTML = arrayDePosts
      .map(
        (post) => `
        <div class="post" id="post">
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
            ${
              post.author === auth().currentUser.uid
                ? `
              <button type="button" id="btn-delete" class="btn-delete" data-postid="${post.postId}"><img class="trash" src="${trash}" alt="Apagar   post"></button>

              <button type="button" id="btn-edit" class="btn-edit" data-postid="${post.postId}"><img class="edit" src="${pencil}" alt="Editar   post"></button>
            `
                : ""
            }
            <div class="likesNumber">
              
              <button type="button" class="btn-like" data-postid="${
                post.postId
              }" data-postAuthor="${auth().currentUser.uid}">
                <img ${
                  post.likes.includes(auth().currentUser.uid)
                    ? `src="${heart}"`
                    : `src="${noHeart}"`
                } class="heart" alt="Likes">
              </button>
              <p>${post.likes.length}</p>

            </div>

          </div>
        </div>
        `
      )
      .join("");
  }

  async function postFunctions() {
    putPostsInFeed();

    const feed = document.getElementById("feed-container");
    feed.addEventListener("click", (event) => {
      const parentNode = event.target.parentNode;
      // console.log(parentNode);
      const postId = parentNode.getAttribute("data-postid");
      // console.log(postId);
      deletePost(postId);
      const post = document.getElementById("post");
      post.remove();
    });

    // const btnDelete = document.querySelector(".btn-delete");
    // btnDelete.addEventListener("click", (event) => {
    //   const postId = btnDelete.getAttribute("data-postid");
    //   console.log(postId);
    //   console.log(event.target.parentNode);
    // });

    // const allBtnLike = document.querySelector(".btn-like");

    // allBtnLike.addEventListener("click", () => {
    //   const postId = document.getAttribute("data-postid");
    //   console.log(postId);
    // });

    // allBtnLike.addEventListener("click", () => {
    //   const postAuthor = document.getAttribute("data-postAuthor");
    //   console.log(postAuthor);
    // });
  }

  // likeIt(postId, auth().currentUser.uid);
  // post.likes.push(auth().currentUser.uid);

  postFunctions();

  // function loadThis() {
  //   const btnDel = document.getElementById("btn-delete");
  //   function openModal() {
  //     const modal = document.getElementById("modal-container");
  //     modal.style.display = "block";
  //     console.log("funciona");
  //   }
  //   btnDel.addEventListener("click", openModal);
  // }
  // loadThis();

  // Função curtir post
  // const allBtnLike = document.getElementsByClassName(".btn-like");

  // allBtnLike.addEventListener("click", () => {
  //   const btnLike = document.getElementById("btn-like");
  //   const postId = btnLike.dataset.postId;
  //   console.log(postId);
  //   // likeIt(postId, auth().currentUser.uid);
  //   // post.likes.push(auth().currentUser.uid);
  // });

  // função para deletar post

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
            ${
              user.author === auth().currentUser.uid
                ? `
              <button type="button" class="btn-delete" data-postid="${user.postId}"><img class="trash" src="${trash}" alt="Apagar   post"></button>

              <button type="button" id="btn-edit" class="btn-edit" data-postid="${user.postId}"><img class="edit" src="${pencil}" alt="Editar   post"></button>
            `
                : ""
            }
            
            <div class="likesNumber">
              
              <button type="button" class="btn-like" data-postid="${
                user.postId
              }" data-postAuthor="${auth().currentUser.uid}">
                <img class="heart" alt="Likes">
              </button>
              <p>${user.likes.length}</p>

          </div>
        </div>`;

    postContainer.innerHTML = postLayout;

    document
      .getElementById("feed-container")
      .insertAdjacentElement("afterbegin", postContainer);
    postPlace.value = "";
  }

  async function createNewPost() {
    if (postPlace.value !== "") {
      await savePost(postPlace.value);
      postIt();
    }
  }

  postButton.addEventListener("click", createNewPost);
};

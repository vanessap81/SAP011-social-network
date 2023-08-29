// Este es el punto de entrada de tu aplicacion

//import recuperacao from "./lib/recuperacao";

// import { myFunction } from './lib/index.js';

//function fillMain() {
//  const mainContent = document.getElementById("app");
//  mainContent.innerHTML = recuperacao;
//}

//fillMain();

function getContent(fragmentId) {
  const pages = {
    home: ` Estamos na Home <br> Acesse a tela de boas-vindas do link: <a href="#welcome">Welcome</a>`,
    register: `<section id="main-register">
    <h1>Crie sua conta</h1>
    <p><a href="#recuperacao">Já é registrado? Faça Login.</a></p>
    <div id="form-container">
      <img src="./img/photo-profile.png" alt="foto de perfil ilustrativa" />
      <form action="">
        <label for="name">Nome</label>
        <input class="input" type="text" id="nomeId" required name="name" />
        <label for="email">E-mail</label>
        <input
          class="input"
          type="text"
          id="emailId"
          placeholder="seunome@email.com"
          required
          name="email"
        />
        <label for="password">Senha</label>
        <input
          class="input"
          type="password"
          id="passwordId"
          required
          name="password"
        />
        <label for="date">Data de nascimento</label>
        <input class="input" type="date" id="birthId" />
        <input id="submit" type="submit" class="send" value="Enviar" />
      </form>
    </div>
    <div class="decoration" id="green-ball"></div>
    <div id="purple-div"></div>
    <div class="decoration" id="purple-ball">
          <img src="./img/purple-ball.png" alt="" id="half-ball"/>
    </div>
  </section>`,
    welcome: `
    <section id="main-welcome">
        <h1>Boas-vindas!</h1>
        <h3>
          Seu cadastro foi <br />
          realizado com sucesso!
        </h3>
        <a href="#register" id="toTimeline">Ver postagens</a>
        <div class="decoration" id="green-ball"></div>
        <div class="decoration" id="purple-ball">
          <img src="./img/person-in-ball.png" alt="" />
        </div>
      </section>
    `,
    recuperacao:`
    <section id="main-recuperacao">
    <h1>Redefinir de Senha</h1>
    <p>Confirme seu e-mail</p>

    <div id="form-container">
    <form action="">
    <label for="email">E-mail</label>
    <p><input class="input" type="text" id="email" placeholder="seunome@email.com" required name="email" /></p>

    <div class="espaço-redefinir">
    <button type="submit" class="btn-redefinir-senha" id="btn-redefinir-senha">Enviar</button>
    </div>

    <p>Você receberá um e-mail com o link para cadastrar uma nova senha.</p>

    </form>
    <p id="msg-redefine-senha" class="msg-redefine-senha"></p>
    <a href="#resetpassword" id="toTimeline">Redefinir senha</a>
   
    </div>

    <div class="decoration" id="green-ball"></div>
    <div id="purple-div"></div>
    <div class="decoration" id="purple-ball">
          <img src="./img/purple-ball.png" alt="" id="half-ball"/>
    </div>
    <div class="decoration" id="girl-dog">
    <img src="./img/girl-image.png" alt=""></div>
    </section>
    `,

    resetpassword: `
    <section id="main-resetpassword">
    <h1>Redefinir de Senha</h1>
    <p>Confirme seu e-mail e senha</p>

    <div id="form-container">
    <form action="">
    <label for="email">E-mail</label>
    <p><input class="input" type="text" id="email" placeholder="seunome@email.com" required name="email" /></p>

    <label for="newpassword">Nova Senha</label>
    <p><input class="input" type="password" id="newpassword" placeholder="********" required name="newpassword"/></p>

    <label for="confirmpassword">Confirme sua senha</label>
    <p><input class="input" type="password" id="confirmpassword" placeholder="********" required name="confirmpassword"/></p>

    <div class="espaço-confirm-redefinir">
    <button type="submit" class="btn-confirm-senha" id="btn-confirm-senha">Enviar</button>
    </div>

    </form>
    <a href="#login" id="toTimeline">Redefinir senha</a>      
    </div>

    </section>
    `,

    login: `
    <section="main-login">
    <h1>MyPet</h1>
    <p>Faça o login para continuar</p>
    <p><a href="">Esqueceu a senha?</a></p>
      
    <div id="form-container">
    <form action="">
    <label for="email">E-mail</label>
    <input class="input" type="text" id="email" placeholder="seunome@email.com" required email="email" />
          
    <label for="password">Senha</label>
    <input class="input" type="password" id="passwordId" required name="password" />

    <input id="submit" type="submit" class="login" value="Login" />
    <input id="submit" type="submit" class="login" value="Login com Google" />

    </form>

    </div>

    <div class="decoration" id="green-ball"></div>
    <div class="decoration" id="purple-ball">
    <img src="./img/purple-ball.png" alt="" />
    </div>

    <a href="#home" id="toTimeline">Redefinir senha</a>

    </section>

   `,  
  };

  return pages[fragmentId];
}
function loadContent() {
  const contentDiv = document.getElementById("app");
  const fragmentId = location.hash.substring(1);
  contentDiv.innerHTML = getContent(fragmentId);
}
if (!location.hash) {
  location.hash = "#home";
}
loadContent();
window.addEventListener("hashchange", loadContent);
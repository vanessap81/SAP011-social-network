import { createUser } from "../../firebase/auth";
import profile from "../../img/photo-profile.png";
import ball from "../../img/purple-ball.png";

const screen = `
        <section id="main-register">
        <h1>Crie sua conta</h1>
        <p><a href="#home">Já é registrado? Faça Login.</a></p>

        <div id="form-container">
        <img src="${profile}" alt="foto de perfil ilustrativa" />
        <form action="">

        <label for="nameId">Nome</label>
        <input class="input" type="text" id="nameId" required name="name" autocomplete="on" />

        <label for="emailId">E-mail</label>
        <input
                class="input"
                type="text"
                id="emailId"
                placeholder="seunome@email.com"
                required
                name="email"
                autocomplete="on"
        />

        <label for="passwordId">Senha</label>
        <input
                class="input"
                type="password"
                id="passwordId"
                required
                name="password"
        />

        <input id="submit" type="submit" class="send" value="Enviar" />
        </form>
        </div>
        
        <div class="decoration" id="green-ball"></div>
        <div id="purple-div"></div>
        <div class="decoration" id="purple-ball">
                <img src="${ball}" alt="" id="half-ball"/>
        </div>
        </section>
        `;

export default () => {
  const container = document.getElementById("app");
  container.innerHTML = screen;

  const nameId = document.getElementById("nameId");
  const emailId = document.getElementById("emailId");
  const passwordId = document.getElementById("passwordId");

  async function captureData(event) {
    event.preventDefault();

    const nameUser = nameId.value;
    const emailUser = emailId.value;
    const passwordUser = passwordId.value;

    await createUser(nameUser, emailUser, passwordUser);
    location.hash = "#welcome";
  }

  const submit = document.getElementById("submit");
  submit.addEventListener("click", captureData);
};

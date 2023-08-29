export default (content) => {
const content = `
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

                <p>by Julia Ribeiro e Vanessa Ponte</p>

                </div>
                `;
     

container.innerHTML = content;

        const botaoRedefinir = container.querySelector("#btn-redefinir-senha");
        botaoRedefinir.addEventListener('click', (e) => {
                e.preventDefault();
                const email = container.querySelector('#email').value;
                redefinirSenha(email)
                .then(() => {
                const msgConfirmaRedefinicao = container.querySelector("#msg-redefine-senha");
                msgConfirmaRedefinicao.innerHTML = "Em breve, você receberá um e-mail para redefinir sua senha.";
                })
                .catch((error) => {
                const msgErroRedefinicao = container.querySelector("#msg-redefine-senha");
                if (error.code === "auth/user-not-found") {
                msgErroRedefinicao.innerHTML = "O e-mail informado não está cadastrado.";
                }
                });
        });
              
        return container;
};
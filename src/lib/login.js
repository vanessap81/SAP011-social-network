export default `
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

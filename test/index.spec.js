import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  auth,
} from "firebase/auth";

import {
  signIn,
  signGoogle,
  createUser,
  resetLink,
  getUserInfo,
} from "../src/firebase/auth.js";

jest.mock("firebase/auth");

describe("Criar Usuario", () => {
  it("cria uma conta do usuário utilizando o email e senha", async () => {
    const mockAuth = {
      currentUser: {},
    };
    getAuth.mockReturnValueOnce(mockAuth);
    createUserWithEmailAndPassword.mockResolvedValueOnce();
    const email = "teste2@teste.com";
    const password = "123456";
    const displayName = "testName";
    await createUser(email, password, displayName);

    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });
});

// describe("getUserInfo", () => {
//   it("Recupera informações do usuário", () => {
//     const mockAuth2 = {
//       currentUser: {},
//     };
//     getUserInfo.mockReturnValueOnce(mockAuth2);
//     expect(auth().mockAuth2).toHaveBeenCalledTimes(1);
//   });
// });

// describe("checkLogin", () => {
//   it("Verifica se o usuário está logado", () => {
//     expect(checkLogin).toHaveBeenCalledWith(onAuthStateChanged());
//   });
// });

describe("signIn", () => {
  it("Logar usuário utilizando o email e senha", async () => {
    signInWithEmailAndPassword.mockResolvedValueOnce();
    const email = "teste@teste.com";
    const password = "123456";
    await signIn(email, password);
    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      getAuth(),
      email,
      password
    );
  });
});

describe("signOut", () => {
  it("Deslogar", async () => {
    await signOut();
    expect(signOut).toHaveBeenCalled();
  });
});

describe("signInGoogle", () => {
  it("Login com Google account", async () => {
    signInWithPopup.mockResolvedValueOnce();

    await signGoogle();

    expect(typeof signGoogle).toBe("function");
    expect(signInWithPopup).toHaveBeenCalledTimes(1);
    expect(signInWithPopup).toHaveBeenCalledWith(undefined, expect.any(Object));
  });
});

describe("resetLink", () => {
  it("Enviar email com link de redefinição", () => {
    sendPasswordResetEmail.mockResolvedValue();
    resetLink();
    expect(sendPasswordResetEmail).toHaveBeenCalledTimes(1);
  });
});

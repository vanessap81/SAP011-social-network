// Este es el punto de entrada de tu aplicacion

import recuperacao from "./lib/recuperacao";

// import { myFunction } from './lib/index.js';

function fillMain() {
  const mainContent = document.getElementById("app");
  mainContent.innerHTML = recuperacao;
}

fillMain();
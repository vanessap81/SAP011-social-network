import login from "./lib/login/login.js";
import register from "./lib/register/register.js";
import welcome from "./lib/welcome/welcome.js";
import timeline from "./lib/timeline/timeline.js";
import reset from "./lib/reset/reset.js";
import newpassword from "./lib/newpassword/newpassword.js";
import { checkLogin } from "./firebase/auth.js";

function loadContent() {
  const fragmentId = location.hash.substring(1);
  console.log(fragmentId);
  switch (fragmentId) {
    case "register":
      register();
      break;
    case "reset":
      reset();
      break;
    case "newpassword":
      newpassword();
      break;
    case "welcome":
      welcome();
      break;
    case "timeline":
      timeline();
      break;
    default:
      login();
  }
}

if (!location.hash) {
  location.hash = "#login";
}

checkLogin();
loadContent();
window.addEventListener("hashchange", loadContent);

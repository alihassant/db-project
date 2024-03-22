import cookie from "js-cookie";
// import Router from "next/router";

export function handleLogin(token) {
  cookie.set("token", token, { expires: 7 });
}

export function handleLogout() {
  cookie.remove("token");
  window.localStorage.setItem("logout", Date.now());
}

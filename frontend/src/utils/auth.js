import cookie from "js-cookie";
// import Router from "next/router";

export function handleLogin(token, rememberMe) {
  // here { expires: 8 / (60 * 60 * 24) } means 8 seconds
  // cookie.set("token", token, { expires: 8 / (60 * 60 * 24) });
  if (!rememberMe) {
    cookie.set("token", token, { expires: 1 });
  } else {
    cookie.set("token", token, { expires: 7 });
  }

  // here { expires: 7 } means 7 days
  // cookie.set("token", token, { expires: 7 });
  //   Router.push("/dashboard");
}

export function handleLogout() {
  //destroying the cookie
  cookie.remove("token");
  window.localStorage.setItem("logout", Date.now());
  // Router.push("/login");
}

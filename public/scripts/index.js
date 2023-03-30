let params = new URL(document.location).searchParams;
let token = params.get("token");
let refresh_token = params.get("rtoken");
localStorage.setItem("token", JSON.stringify(token));
localStorage.setItem("refresh_token",refresh_token );
const gettoken = JSON.parse(localStorage.getItem("token"))
console.log(gettoken)


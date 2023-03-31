let params = new URL(document.location).searchParams;
let token = params.get("token");
let refresh_token = params.get("rtoken");
const loginbtn = document.getElementById("my_ac_btn")
document.getElementById("logo").onclick = ()=>{
    location.assign("../index.html")
}

if(token){
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("refresh_token",refresh_token );
}

const gettoken = JSON.parse(localStorage.getItem("token"))

if(gettoken){
    loginbtn.innerText = "My Account"
}

loginbtn.onclick = ()=>{
    if(loginbtn.innerText == "My Account"){
        location.assign("../dashboard.html")
    }else{
        location.assign("../signup.html")
    }
}


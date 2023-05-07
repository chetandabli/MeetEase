let params = new URL(document.location).searchParams;
let token = params.get("token");
let refresh_token = params.get("rtoken");
const loginbtn = document.getElementById("my_ac_btn")
const logoutbtn = document.getElementById("logout_btn");
const baseUrl = "http://localhost:3000/"
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
    logoutbtn.style.display = "inline"
}

loginbtn.onclick = ()=>{
    if(loginbtn.innerText == "My Account"){
        location.assign("../dashboard.html")
    }else{
        location.assign("../signup.html")
    }
}
logoutbtn.onclick = async()=>{
    try {
        let res = await fetch(`${baseUrl}user/logout`, {
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization":`Bearer ${JSON.parse(localStorage.getItem("token"))} rtokenBearer ${localStorage.getItem("refresh_token")}`
            }
        });

        if(res.ok){
            localStorage.removeItem("token");
            localStorage.removeItem("refresh_token");
            location.assign(baseUrl);
        }
    } catch (error) {
        console.log(error)
    }
}


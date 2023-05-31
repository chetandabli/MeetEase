fetch("https://easemeet.onrender.com/auth/google")
.then((res)=>{
    console.log(res.json())
})

document.getElementById("logo").onclick = ()=>{
    location.assign("../index.html")
}
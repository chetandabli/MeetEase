fetch("http://localhost:3000/auth/google")
.then((res)=>{
    console.log(res.json())
})

document.getElementById("logo").onclick = ()=>{
    location.assign("../index.html")
}
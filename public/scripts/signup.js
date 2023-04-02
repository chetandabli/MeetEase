fetch("https://busy-motion-6100-production.up.railway.app/auth/google")
.then((res)=>{
    console.log(res.json())
})

document.getElementById("logo").onclick = ()=>{
    location.assign("../index.html")
}
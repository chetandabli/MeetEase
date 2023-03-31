fetch("http://localhost:3000/auth/google")
.then((res)=>{
    console.log(res.json())
})
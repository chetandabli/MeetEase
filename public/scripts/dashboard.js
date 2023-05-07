const baseUrl = "http://localhost:3000/";

let myname, myUserId;

2
let token = JSON.parse(localStorage.getItem("token")) || null
if(!token){
  window.location.href = "./signup.html"
}

window.addEventListener("load", () => {
    appenddata();
  });

  // logout
  const logoutbtn = document.getElementById("logout_btn");
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

const livebtn = document.getElementById("livemeeting").onclick = ()=>{
  let x = myname.split(" ")
  location.assign(baseUrl+`videochat.html?name=${x[0]}&user_id=${myUserId}`)
}
  

  async function appenddata() {

    try {
      let responsedata = await fetch("http://localhost:3000/user/meetings",{
       
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
      });
   
      let data = await responsedata.json();
      if(data.msg == "jwt malformed" || data.msg =="jwt expired"){
        localStorage.removeItem("token")
        localStorage.removeItem("refresh_token")
        window.location.href = "./signup.html"
    
      }
      console.log(data)
      let datatoappend = data[0].meetingsData;
      append(data, datatoappend);
      show(data)

    } catch (err) {
      console.log(err);
    }
  }


function append(x, data){
  document.querySelector("#main-container").innerHTML = null;
  data.map(function (elem, index) {

    let diva = document.createElement("div");
    diva.setAttribute("id","cardid")
    diva.style.borderTop = `7px solid ${elem.color}`
          
    let title = document.createElement("p")
    title.setAttribute("id","title")
    title.innerText = elem.heading;
    let para = document.createElement("p")
    para.setAttribute("id","para")
    let a= showtime(elem.start_time,elem.end_time)
    para.innerText = `${a} mins, One-on-One`
    para.style.color  ="#85888a"
    let booking = document.createElement("p")
       booking.innerText = "View booking page"
 
       booking.setAttribute("id","book")
       booking.style.color  = "blue"
       booking.addEventListener("click", function () {
        window.open(`http://localhost:3000/user/${x[0]._id}`)
      });
       let  hra = document.createElement("hr")
         hra.style.color = "#ededed"
       let bottomdiv = document.createElement("div");
          bottomdiv.setAttribute("id","botdiv")
       let link = document.createElement("button")
       link.innerText = "Copy link";
       link.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(`http://localhost:3000/user/${x[0]._id}`);
          link.innerText = "Copied"
          setTimeout(() => {
            link.innerText = "Copy link"
          }, 2000);
        } catch (err) {
          console.error('Failed to copy: ', err);
        }
      });
       let remove = document.createElement("button");
       remove.innerText = "Delete";
       remove.addEventListener("click", function () {
         removed(elem._id)   
       });
       remove.style.backgroundColor =  "red" ;
       link.style.backgroundColor =  `${elem.color}`

       bottomdiv.append(link,remove)

       diva.append(title,para,booking,hra,bottomdiv)
    
       document.querySelector("#main-container").append(diva);
      

  })
}
  

function show(data){
let a = data[0].email

document.getElementById("namecircle").innerText = ` ${data[0].name[0]}`
// document.querySelector("#span").innerText = `localhost:3000/user/${data[0]._id}`
document.querySelector("#span").innerText = `http://localhost:3000/user/${data[0]._id}`
document.querySelector("#span").onclick = ()=>{
  window.open(`http://localhost:3000/user/${data[0]._id}`)
}
document.querySelector("#span").style.color = "blue"

document.querySelector("#username").innerText = data[0].name
document.querySelector("#book").style.color = "blue"
myname = data[0].name
myUserId = data[0]._id
let b = data[0].picture

// let image = document.createElement("img")
// image.setAttribute("src",b)

// let imagetoshow = document.querySelector("#imagea")
// imagetoshow.src = b





}





function showtime(start,end){
  
  let a = new Date(start)
  let b= new Date(end)
   const durationinMs =   b.getTime() - a.getTime();
   const durationinMin = durationinMs/ (1000*60)

   return durationinMin
}



async function removed(id){
  try {
    let responsedata = await fetch(`http://localhost:3000/meeting/${id}`,{
      method:"DELETE",
      headers: {
        "Authorization":`Bearer ${JSON.parse(localStorage.getItem("token"))}`
      }
      })
  let res = await responsedata.json()
    if(responsedata.ok){
      alert(res.message);
      appenddata();
    }
  } catch (error) {
    console.log(error)
  }
}


 function linked(id){
  console.log(id)
}


function booked(id){
  console.log("go to view page")
}



let appointments = document.querySelector("#appointments")
appointments.addEventListener("click",()=>{
  window.location.href ="./appointments.html"


})




//yha par charo append karna he

document.querySelector("#allmeet").addEventListener("click",appenddata)
document.querySelector("#live").addEventListener("click",live)
document.querySelector("#upcoming").addEventListener("click",upcoming)
document.querySelector("#ended").addEventListener("click",ended)

function live(){

  appendremain("live")
}

function upcoming(){
  appendremain("upcoming")
}

function ended(){
  appendremain("ended")
}

async function appendremain(when) {


  try {
    let responsedata = await fetch(`http://localhost:3000/user/meetings/${when}`,{
     
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${JSON.parse(localStorage.getItem("token"))}`
      }
    });
 
    let data = await responsedata.json();
    let datatoappend = data[0]
console.log(datatoappend)
    if(when == "live"){
      console.log(datatoappend.currentMeetings)
      append(data, datatoappend.currentMeetings)
    }
    if(when== "upcoming"){
      append(data, datatoappend.futureMeetings)
    }
      if(when == "ended"){
        append(data, datatoappend.pastMeetingsData )
      }

    show(data)

  } catch (err) {
    console.log(err);
  }
}
// by chetan

document.getElementById("logo").onclick = ()=>{
  location.assign("../index.html")
}

document.getElementById("showa2a").addEventListener("click",()=>{
  location.assign("../OneToOne.html")
})

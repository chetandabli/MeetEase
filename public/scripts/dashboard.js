

window.addEventListener("load", () => {
    appenddata();
  });
  

  async function appenddata() {

    try {
      let responsedata = await fetch("http://localhost:3000/user/meetings",{
       
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
      });
   
      let data = await responsedata.json();
      console.log(data[0])
      let datatoappend = data[0].meetingsData;
      append(datatoappend);
      show(data)

    } catch (err) {
      console.log(err);
    }
  }


function append(data){

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
        booked(elem._id)   
      });
       let  hra = document.createElement("hr")
         hra.style.color = "#ededed"
       let bottomdiv = document.createElement("div");
          bottomdiv.setAttribute("id","botdiv")
       let link = document.createElement("button")
       link.innerText = "Copy link"
       link.addEventListener("click", function () {
        linked(elem._id)   
      });
       let remove = document.createElement("button");
       remove.innerText = "Delete";
       remove.addEventListener("click", function () {
         removed(elem._id)   
       });
       remove.style.backgroundColor =  `${elem.color}`
       link.style.backgroundColor =  `${elem.color}`

       bottomdiv.append(link,remove)

       diva.append(title,para,booking,hra,bottomdiv)
    
       document.querySelector("#main-container").append(diva);
      

  })
}
  

function show(data){
let a = data[0].email
let str = ""
for(let  i = 0;i<=a.length-1;i++){
  if(a[i]=="@"){
    break;
  }
  str+=a[i]
}

document.querySelector("#span").innerText = `Calendly.com/${str}`
document.querySelector("#span").style.color = "blue"

document.querySelector("#username").innerText = data[0].name
document.querySelector("#book").style.color = "blue"


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

  // let responsedata = await fetch(`http://localhost:3000/user/delete/${id}`,{
  //     method:"DELETE",
  //     headers: {
  //       "Authorization":`Bearer ${JSON.parse(localStorage.getItem("token"))}`
  //     }
  //     })
  
  //     let data = await responsedata.json()
  
  // console.log(data)
  // alert(data.msg)
  // window.location.reload()

}


 function linked(id){
  console.log(id)
}


function booked(id){
  console.log("go to view page")
}



let newmeeting = document.querySelector("#showa2a")
newmeeting.addEventListener("click",()=>{
  


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
      append(datatoappend.currentMeetings)
    }
    if(when== "upcoming"){
      append(datatoappend.futureMeetings)
    }
      if(when == "ended"){
        append(datatoappend.pastMeetingsData )
      }

    show(data)

  } catch (err) {
    console.log(err);
  }
}

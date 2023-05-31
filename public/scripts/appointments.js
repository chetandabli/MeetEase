
window.addEventListener("load", () => {
    appenddata();
  });
  

  async function appenddata() {
    try {
      let responsedata = await fetch("https://easemeet.onrender.com/user/appointments",{
       
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
      });
   
      let data = await responsedata.json();
      console.log(data[0])
    //   let datatoappend = data[0].meetingsData;
      let datatoappend = data[0].appointments;
      console.log(datatoappend)
      
      append(datatoappend);


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
       remove.style.backgroundColor =  "red" ;
       link.style.backgroundColor =  `${elem.color}`

       bottomdiv.append(link,remove)

       diva.append(title,para,booking,hra,bottomdiv)
    
       document.querySelector("#main-container").append(diva);
      

  })
}
  
function showtime(start,end){
  
  let a = new Date(start)
  let b= new Date(end)
   const durationinMs =   b.getTime() - a.getTime();
   const durationinMin = durationinMs/ (1000*60)

   return durationinMin
}



let appointments = document.querySelector("#appointments")
appointments.addEventListener("click",()=>{
  window.location.href ="./dashboard.html"
  
})


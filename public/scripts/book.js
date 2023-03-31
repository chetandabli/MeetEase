const create = (x)=>{
    return document.createElement(`${x}`)
}

const baseUrl = "http://localhost:3000/"

document.getElementById("name").innerText = x.name
document.getElementById("userimg").src = x.picture
document.getElementById("avil").innerText = x.futureMeetings.length;



x.futureMeetings.forEach(el => {
    const startDate = new Date(el.start_time);
    const startTime = startDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const endDate = new Date(el.end_time);
    const endTime = endDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const meetingDate = new Date(el.date);
    const dateString = meetingDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });


    let maindiv = create("div");
    let firstinner1 = create("div");
    let firstinner2 = create("div");

    firstinner1.innerHTML = `<h2>${el.heading}</h2>
    <p class="discrep">${el.description}</p>`;
    
    let timing = create("p");
    timing.classList = "timing";
    timing.innerHTML = `${startTime+ " - "+endTime}\n <span>${dateString}</span>`

    let btndiv = create("div");
    btndiv.classList = "btndiv"
    let btn1 = create("button");
    btn1.innerText = "Book Meeting";
    btn1.classList = "btnbooking";
    btn1.onclick = ()=>{
        if(btn1.innerText == "Book Meeting"){
            btn1.innerText = "Cancel";
            btn1.style.backgroundColor = "gray";
            btn1.style.width = "50%";
            btn1.style.back
            setTimeout(() => {
                btn2.style.width = "45%";
                btn2.style.display = "inline-flex";
                btn2.style.textAlign = "center";
            }, 201);
        }else{
            btn2.style.width = "0%";
            btn2.style.display = "none";
            setTimeout(() => {
                btn1.innerText = "Book Meeting";
                btn1.style.backgroundColor = "#2970d4";
                btn1.style.width = "100%";
            }, 50);
        }
    }
    btn1.addEventListener("mouseover", function() {
        btn1.style.backgroundColor = "white";
      });
      btn1.addEventListener("mouseout", function() {
        btn1.style.backgroundColor = "gray";
      });
    let btn2 = create("button");
    btn2.innerText = "Confirm";
    btn2.classList = "cnfbtn";
    btn2.setAttribute("id", el._id)
    btn2.onclick = ()=>{
        bookMeeting(el._id)
    }
    btn2.style.display = "none";
    btn2.style.textAlign = "center";

    btndiv.append(btn1, btn2);

    firstinner2.append(timing, btndiv);

    maindiv.append(firstinner1, firstinner2);

    document.getElementById("meetings").append(maindiv)
});

const img = document.getElementById("userimg")
img.addEventListener("error", function(event) {
  event.target.src = "https://lh3.googleusercontent.com/a/AGNmyxYY4U5evwrlin9S9fU55mDT5rv2gsappcXO26EeJQ=s96-c"
  event.onerror = null
})

// for booking with shduler
async function bookMeeting(id){
    if(localStorage.getItem("token")){
        try {
            let res = fetch(`${baseUrl}meeting/book/${id}`, {
                method: POST,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization":`Bearer ${localStorage.getItem("token")}`
                }
            })
            res = await res.json()
            console.log(res);
        } catch (error) {
            console.log(error)
        }
    }else{
        location.assign("../signup.html")
    }
}


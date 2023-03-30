const create = (x)=>{
    return document.createElement(`${x}`)
}

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

    
    console.log(startTime, endTime, dateString)

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
    btn1.classList = "btnbooking"
    let btn2 = create("button");
    btn2.innerText = "Confirm";
    btn2.classList = "cnfbtn"
    btn2.setAttribute("id", el._id)

    btndiv.append(btn1, btn2);

    firstinner2.append(timing, btndiv);

    maindiv.append(firstinner1, firstinner2);

    document.getElementById("meetings").append(maindiv)
});
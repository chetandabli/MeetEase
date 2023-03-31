let created = document.getElementById("created");
let created_top = document.getElementById("created_top");
// let endDate = new Date();
// let startDate = new Date();
// startDate.setUTCHours(start_time.value.slice(0, 2))
// startDate.setUTCMinutes(start_time.value.slice(3, 5))
// endDate.setUTCHours(end_time.value.slice(0, 2))
// endDate.setUTCMinutes(end_time.value.slice(3, 5))
// let mongoStartDate = startDate.toISOString();
// let mongoEndDate = endDate.toISOString();

let postData = () => {
    let event_name = document.getElementById("data1").value
    let event_location = document.getElementById("data2").value
    let description = document.getElementById("data3").value
    let date = document.getElementById("startd").value
    let start_time = document.getElementById("startt").value
    let end_time = document.getElementById("endt").value

    const [startHour, startMinute] = start_time.split(":");
    const [endHour, endMinute] = end_time.split(":");
    const [year, month, day] = date.split("-").map(Number);

    const startDate = new Date(year, month - 1, day, startHour, startMinute);
    const endDate = new Date(year, month - 1, day, endHour, endMinute);

    if(!event_name || !event_location || !description || !date || !startDate || !endDate){
        alert("please fill required feilds");
        return
    }

    const event_data = {
        start_time: startDate,
        end_time: endDate,
        date: date,
        heading: event_name,
        description: description,
        location: event_location,
    }
    console.log(event_data)
    fetch("http://localhost:3000/meeting",{
        method:"POST",
        headers:{
            "Content-type":"application/json",
            "Authorization":`Bearer ${JSON.parse(localStorage.getItem("token"))}`
        },
        body:JSON.stringify(event_data)
    }).then((res)=>{
        if(res.ok){
            alert("Meeting Created!")
            location.assign("../dashboard.html")
        }
    })
    .catch(Error=> console.log(Error));
    
}

created.addEventListener("click", postData)
created_top.addEventListener("click", postData)

// by chetan
document.getElementById("back").onclick = ()=>{
    location.assign("../dashboard.html")
}
let event_name = document.getElementById("data1")
let event_location = document.getElementById("data2");
let description = document.getElementById("data3");
let start_time = document.getElementById("startt")
let end_time = document.getElementById("endt");
let created = document.getElementById("created");
let input_date = document.getElementById("startd")
let endDate = new Date();
let startDate = new Date();
startDate.setUTCHours(start_time.value.slice(0, 2))
startDate.setUTCMinutes(start_time.value.slice(3, 5))
endDate.setUTCHours(end_time.value.slice(0, 2))
endDate.setUTCMinutes(end_time.value.slice(3, 5))
let mongoStartDate = startDate.toISOString();
let mongoEndDate = endDate.toISOString();
created.addEventListener("click", () => {
    const event_data = {
        start_time: mongoStartDate,
        end_time: mongoEndDate,
        date: `${input_date.value}T00:00:00.000Z`,
        heading: event_name.value,
        description: description.value,
        location: event_location.value,
    }
    fetch("http://localhost:3000/meeting",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(event_data)
    }).then(res=>res.json())
    .then(res=> console.log(res))
    .catch(Error=> console.log(Error))
})
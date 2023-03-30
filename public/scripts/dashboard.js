const {token} = require("./index")
console.log(token)

window.addEventListener("load", () => {
    appenddata();
  });
  
  async function appenddata() {

    // try {
    //   let responsedata = await fetch("http://localhost:3000/user/meetings",{
       
        // headers: {
        //   "Content-Type": "application/json",
        //   "Authorization":`Bearer ${localStorage.getItem("token")}`
        // }
    //   });
   
    //   let data = await responsedata.json();
    //   let datatoappend = data;
    //   append(datatoappend);

    // } catch (err) {
    //   console.log(err);
    // }
//   }

  
  }

  console.log(`Bearer ${localStorage.getItem("token")}`)
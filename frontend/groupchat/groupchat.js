
let token = localStorage.getItem("token");
let listofgrps = document.querySelector(".listofgrps");
// let searchinp=document.querySelector('#searchinp');
let addtogroup=document.querySelector('#addtogroup');
let personemail=document.querySelector('#personemail');
let adminvalue=document.querySelector('#adminvalue');
let groupmessages=document.querySelector('.groupmessages');
let sendmessage=document.querySelector('.sendmsg');
let inptxt=document.querySelector('#inptext');
let groupparticipants=document.querySelector('.grpparticipants');
let pangrpname = document.querySelector("#grpname");
let signout = document.querySelector("#signoutgrp");

let nam = "";
axios
  .get("http://localhost:3000/user", {
    headers: { authorization: token },
  })
  .then((result) => {
    console.log(result);
    nam += result.data[0].name;
    console.log(nam);
  })
  .catch((err) => {
    console.log(err);
  });










addtogroup.addEventListener('click',()=>{

 let id= location.href.split("g=")[1];

 let obj={
  mail:personemail.value,
  admin:adminvalue.value
 }

 axios.post(`http://localhost:3000/addparticipants/${id}`, obj, {
   headers: { authorization: token },
 }).then(result=>{

  alert(result.data);
  personemail.value="";
  location.reload();
 })
 .catch(err=>{
  console.log(err);
 })
  
});

sendmessage.addEventListener('click',()=>{
 let id = location.href.split("g=")[1];

  let inptxtvalue=inptxt.value;
  let obj={
msg:inptxtvalue
  }

  axios
    .post(`http://localhost:3000/postgroupmsgs/${id}`, obj, {
      headers: { authorization: token },
    })
    .then((result) => {
      console.log(result);
      inptxt.value="";
    })
    .catch((err) => {
      console.log(err);
    });
})


setInterval(() => {
   let id = location.href.split("g=")[1];

  axios.get(`http://localhost:3000/getgrpmsgs/${id}`, {
    headers: { authorization: token }
  }).then(result=>{
    let klu="";
    for(let i=0;i<result.data.length;i++){
if (result.data[i].username == nam) {
  klu += `
            <div class="p-2 indimsg " >
            <span>you : 
        </span>
            <span>${result.data[i].message}</span>
            </div>
            `;
} else {
  klu += `
            <div class="p-2 indimsg ">
            <span  >${result.data[i].username} : 
        </span>
            <span>${result.data[i].message}</span>
            </div>
            `;
}
      
    }
    groupmessages.innerHTML=klu;
  })
  .catch(err=>{
    console.log(err);
  })
  
}, 700);


document.addEventListener('DOMContentLoaded',()=>{
   let id = location.href.split("g=")[1];


  axios.get(`http://localhost:3000/grpparticipants/${id}`, {
    headers: { authorization: token },
  }).then(result=>{
    let listpar="";
    console.log(result.data[0].name);

    for(let i=0;i<result.data.length;i++){

      
     let nameusershort=result.data[i].name.split(" ")[0];
      if(result.data[i].admin==true){
listpar += `
    <div>
    <h6>${nameusershort}</h6> 
    <h6>group admin</h6>
    </div>
`;

      }
      else{
        listpar += `
    <div>
    <h6>${nameusershort}</h6>
    <button class=" makeadmin" id="${result.data[i].userId}">make admin</button>
       <button class="rempeople" id="${result.data[i].userId}">remove</button>

    </div>
`;
      }
    }

    groupparticipants.innerHTML=listpar;
    })
  .catch(err=>{
    console.log(err);
  })
});


function grpdat(){
     let id = location.href.split("g=")[1];

  axios.get(`http://localhost:3000/getgrpname/${id}`, {
    headers: { authorization: token },
  }).then(result=>{
   pangrpname.innerHTML= result.data.groupname;

  })
  .catch(err=>{
    console.log(err);
  })
}
grpdat();


groupparticipants.addEventListener('click',(e)=>{
     let id = location.href.split("g=")[1];


  if(e.target.classList.contains('makeadmin')){

    let idd=e.target.id;
    let obj={
      useridupdate:idd
    }

    axios.post(`http://localhost:3000/makeuseradmin/${id}`, obj, {
      headers: { authorization: token },
    }).then(result=>{
alert(result.data);
location.reload();
    })
    .catch(err=>{
      console.log(err);
    })
  }

    if (e.target.classList.contains("rempeople")) {
      let iddd = e.target.id;
      let obj = {
        useriddel: iddd,
      };

      axios
        .post(`http://localhost:3000/removepart/${id}`, obj, {
          headers: { authorization: token },
        })
        .then((result) => {
          alert(result.data);
          location.reload();
        })
        .catch((err) => {
          console.log(err.data);
        });
    }



});

signout.addEventListener("click", () => {
  localStorage.clear();
  location.replace("../login/login.html");
});
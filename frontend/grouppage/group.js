
let listofgrps=document.querySelector('.listofgrps');
let token=localStorage.getItem('token');
let crtgrp=document.querySelector('#crtgrp');


let gname=document.querySelector('#grpname');
crtgrp.addEventListener('click',()=>{
let namegrp=gname.value;

    let obj={
        grpname:namegrp
    }
    axios.post("http://localhost:3000/creategrp", obj, {
      headers: { authorization: token }
    }).then(result=>{
        console.log(result);
        grps();
    })
    .catch(err=>{
        console.log(err);
    })

})

function grps(){


    axios.get("http://localhost:3000/getallgroups", {
      headers: { authorization: token }
    }).then(result=>{
        let gt='';
        if(result.data.length==0){
        listofgrps.innerHTML='you are not in any group! ';
        }
        else{
for(let i=0;i<result.data.length;i++){
    gt+=`
    <div>
    <a href="../groupchat/groupchat.html?g=${result.data[i].groupId}">${result.data[i].groupname}</a>
    </div>
    `;
}  
listofgrps.innerHTML=gt;   
        }   
    })
    .catch(err=>{
        console.log(err);
    })

}

grps();
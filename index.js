
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const addBtn = $(".add-btn");
const update = $(".update-btn") ;
const search =$(".search__btn")
const done =$(".bulk-done-btn")
const removeAll= $(".bulk-remove-btn")


const nameTask = $("#new-task");
const desTask = $("#description");
const datetask = $("#date");
const prioTask = $("#priority");
const nameSearch =$("#search-task");


const showTask = $(".content-show")


render(JSON.parse(localStorage.getItem("nameTasks")) ?? [])

addBtn.addEventListener("click",()=>{  
    const getStorage = localStorage.getItem("nameTasks") ? JSON.parse(localStorage.getItem("nameTasks")) : [];
   
   if(!(nameTask.value && desTask.value && datetask.value)){
        alert("Xin hãy nhập thông tin đầy đủ");
        return false;
   }

   getStorage.push({
    name :  nameTask.value,
    description : desTask.value,
    date : datetask.value,
    priority : prioTask.value
    })

    localStorage.setItem("nameTasks",JSON.stringify(getStorage))

    render(getStorage)

    nameTask.value = ""
    desTask.value = ""
    datetask.value = ""
    prioTask.value = "low"

})

update.addEventListener("click",()=>{
    const maUpdate = update.getAttribute("id")
    const getStorage = JSON.parse(localStorage.getItem("nameTasks")) 
    
    
    if(nameTask.value === getStorage[maUpdate].name && 
        desTask.value=== getStorage[maUpdate].description &&
        datetask.value === getStorage[maUpdate].date &&
        prioTask.value === getStorage[maUpdate].priority
        ) {

            alert("Xin hãy thay đổi một số thông tin ")
            return false;
        }
    
        getStorage[maUpdate]={
        name :  nameTask.value,
        description : desTask.value,
        date : datetask.value,
        priority : prioTask.value
    }
    localStorage.setItem("nameTasks",JSON.stringify(getStorage))
    nameTask.value = ""
    desTask.value = ""
    datetask.value = ""
    prioTask.value = "low"
    addBtn.style.display ="block";
    update.style.display = "none" 
    render (getStorage);

})

search.addEventListener("click",()=>{
    const getStorage = JSON.parse(localStorage.getItem("nameTasks")) 
   
   if(nameSearch.value === ""){
       alert("Xin hãy điền tên cần tìm kiếm")
       
       return false;
   }
    const searchItem = getStorage.filter((i)=>{
       
       const result =nameSearch.value === i.name
       
       return result;
       
})
nameSearch.value =""
render(searchItem);

})







removeAll.addEventListener("click",()=>{



})

const data=["a","b","c","d"]
function check(id){
    // const checked = $$("#check")[id].checked


    

    console.log(id);
    console.log($$("#check")[id]);
    console.log($$("#check")[id].checked);
    // const getStorage = JSON.parse(localStorage.getItem("nameTasks"))
    // const n= getStorage.splice(id,1);
    data.splice(id,1)
    console.log(data);
}












function edit(id){
    const getStorage = JSON.parse(localStorage.getItem("nameTasks")) 
    nameTask.value = getStorage[id].name,
    desTask.value = getStorage[id].description,
    datetask.value = getStorage[id].date,
    prioTask.value = getStorage[id].priority
    
    update.setAttribute("id",id)
    addBtn.style.display ="none";
    update.style.display = "block" 

}

function remove(id){
    const getStorage = JSON.parse(localStorage.getItem("nameTasks"))         
    getStorage.splice(id,1);
    localStorage.setItem("nameTasks",JSON.stringify(getStorage))
    render (getStorage);
    nameTask.value = ""
    desTask.value = ""
    datetask.value = ""
    prioTask.value = "low"
    addBtn.style.display ="block";
    update.style.display = "none" 
}

function render(tasks){

    const arrayTask = tasks.map((e,index)=>{

        return `<div id="show-List-todo">
        <div class="show-recent-todo">
            <input type="checkbox" id="check" onclick="check(${index});">
            <label>${e.name}</label><br>
        </div>
        <div class="detail-remove">
            <button class="detail-btn" onclick="edit(${index});">Detail</button>
            <button class="remove-btn" onclick="remove(${index});">Remove</button>
        </div>
    </div>`
    })
    showTask.innerHTML = arrayTask.join("");
}

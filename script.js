const taskContainer=document.querySelector(".task_container")
globalStore=[]
const generateHTML = (taskData) => {
    return `
    <div id=${taskData.id} class="col-md-6 col-lg-4">
        <div class="card">
            <div class="card-header d-flex justify-content-end gap-2">
                <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil"></i></button>
                <button type="button" class="btn btn-outline-danger" onclick="onDelete(this.id)"><i class="fas fa-trash"></i></button>
            </div>
            <img src=${taskData.imageurl} class="card-img-top m-20" alt="...">
            <div class="card-body">
                <h5 class="card-title fw-bold text-primary">${taskData.tasktitle}</h5>
                <p class="card-text">${taskData.taskdescription}</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    </div>
`;
}

const loadInitialData = () => {
    const getCards = localStorage.getItem("tasky");
    const {cards} = JSON.parse(getCards);
    cards.map((cardObject) => {
        taskContainer.insertAdjacentHTML("beforeend",generateHTML(cardObject));
        globalStore.push(cardObject);
    });

}

const saveChanges = () => {
    const taskData = {
        id : `${Date.now()}`,
        imageurl: document.getElementById("imageUrl").value,
        tasktitle: document.getElementById("taskTitle").value,
        tasktype:document.getElementById("taskType").value,
        taskdescription:document.getElementById("taskDescription").value
    };
    taskContainer.insertAdjacentHTML("beforeend", generateHTML(taskData));
    globalStore.push(taskData);
    localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));
};

const deleteCard = (event) =>{
    event = window.event;
    const targetID = event.target.id;
    const tagname = event.target.tagname;

    globalStore = globalStore.filter((cardObject)=>cardObject.id!=targetID);
    localStorage.setItem("tasky",JSON.stringify({cards:globalStore}))

    if(tagname=="BUTTON"){
        return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
    }
    else{
        return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
    }


}

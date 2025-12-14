const todo = document.querySelector("#todo");
const progess = document.querySelector("#Progress");
const done = document.querySelector("#done");
const tasks = document.querySelectorAll(".task");
const toggleModal = document.querySelector("#toggle-modal");
const modal = document.querySelector(".modal");
const modalBG = document.querySelector(".modal .bg");


let dragElement =null;

tasks.forEach(task =>{
    task.addEventListener("drag", (e)=>{
        dragElement = task;        
    });
});
const addDragEventOnColumn =(column)=>{
    column.addEventListener("dragenter",(e)=>{
        e.preventDefault();
        column.classList.add("hover-over");
    });
    column.addEventListener("dragleave",(e)=>{
        e.preventDefault();
        column.classList.remove("hover-over");
    });
    column.addEventListener("dragover",(e)=>{
        e.preventDefault();
    })
    column.addEventListener("drop",(e)=>{
        column.appendChild(dragElement);
        column.classList.remove("hover-over");
    })
};
addDragEventOnColumn(todo);
addDragEventOnColumn(progess);
addDragEventOnColumn(done);

toggleModal.addEventListener("click",()=>{
    modal.classList.add("active");
});
modalBG.addEventListener("click",()=>{
    modal.classList.remove("active");
});
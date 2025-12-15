/* ---------- DOM ---------- */
const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");

const toggleModal = document.querySelector("#toggle-modal");
const modal = document.querySelector(".modal");
const modalBG = document.querySelector(".modal .bg");
const addTaskBtn = document.querySelector(".add-task-btn");

const columns = [todo, progress, done];
let draggedTask = null;

/* ---------- Helpers ---------- */
function updateCounts() {
    columns.forEach(col => {
        const count = col.querySelector(".right");
        if (!count) return;
        count.textContent = col.querySelectorAll(".task").length;
    });
}

function saveState() {
    const data = {};

    columns.forEach(col => {
        data[`#${col.id}`] = Array.from(col.querySelectorAll(".task")).map(task => ({
            title: task.querySelector("h2").innerText,
            desc: task.querySelector("p").innerText
        }));
    });

    localStorage.setItem("tasks", JSON.stringify(data));
}

function createTask(title, desc) {
    const div = document.createElement("div");
    div.className = "task";
    div.draggable = true;

    div.innerHTML = `
        <h2>${title}</h2>
        <p>${desc}</p>
        <button class="delete-btn">Delete</button>
    `;

    div.addEventListener("dragstart", () => {
        draggedTask = div;
    });

    div.querySelector(".delete-btn").addEventListener("click", () => {
        div.remove();
        updateCounts();
        saveState();
    });

    return div;
}

/* ---------- Load From LocalStorage ---------- */
const saved = JSON.parse(localStorage.getItem("tasks"));
if (saved) {
    Object.keys(saved).forEach(selector => {
        const column = document.querySelector(selector);
        if (!column) return;

        saved[selector].forEach(task => {
            column.appendChild(createTask(task.title, task.desc));
        });
    });
}

updateCounts();

/* ---------- Drag & Drop ---------- */
function enableColumnDrag(column) {
    column.addEventListener("dragover", e => e.preventDefault());

    column.addEventListener("dragenter", e => {
        e.preventDefault();
        column.classList.add("hover-over");
    });

    column.addEventListener("dragleave", () => {
        column.classList.remove("hover-over");
    });

    column.addEventListener("drop", () => {
        if (!draggedTask) return;

        column.appendChild(draggedTask);
        draggedTask = null;
        column.classList.remove("hover-over");

        updateCounts();
        saveState();
    });
}

columns.forEach(enableColumnDrag);

/* ---------- Modal ---------- */
toggleModal.addEventListener("click", () => {
    modal.classList.add("active");
});

modalBG.addEventListener("click", () => {
    modal.classList.remove("active");
});

/* ---------- Add Task ---------- */
addTaskBtn.addEventListener("click", (e) => {
    const titleInput = document.querySelector("#task-title-input");
    const descInput = document.querySelector("#task-description-input");

    if (!titleInput || !descInput) return;

    const title = titleInput.value.trim();
    const desc = descInput.value.trim();

    if (!title || !desc) {
    alert("Please enter both title and description");
    return;
}

    todo.appendChild(createTask(title, desc));

    titleInput.value = "";
    descInput.value = "";

    updateCounts();
    saveState();
    modal.classList.remove("active");
});

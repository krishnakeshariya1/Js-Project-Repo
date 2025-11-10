const addBtn = document.querySelector("#addBtn");
let taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
const clearAllBtn = document.querySelector("#clearAll");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function createTodoNode(todo, index) {
  const li = document.createElement("li");
  li.classList.add("card");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = !!todo.completed;

  const textSpan = document.createElement("span");
  textSpan.classList.add("todo-text");
  textSpan.textContent = todo.text;

  // ✅ Apply the correct style from stored data
  if (todo.completed) {
    textSpan.classList.add("completed");
  } else {
    textSpan.classList.remove("completed");
  }

  // Update on checkbox toggle
  checkbox.addEventListener("change", () => {
    todo.completed = checkbox.checked;
    if (todo.completed) textSpan.classList.add("completed");
    else textSpan.classList.remove("completed");
    saveTodos();
  });

  // Edit text on double click
  textSpan.addEventListener("dblclick", () => {
    const newText = prompt("Edit Todo", todo.text);
    if (newText !== null) {
      todo.text = newText.trim();
      textSpan.textContent = todo.text;
      saveTodos();
    }
  });

  // Delete todo
  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.addEventListener("click", () => {
    todos.splice(index, 1);
    saveTodos();
    renderTodo();
  });

  li.appendChild(checkbox);
  li.appendChild(textSpan);
  li.appendChild(delBtn);

  return li;
}

function renderTodo() {
  taskList.innerHTML = "";
  todos.forEach((todo, index) => {
    const node = createTodoNode(todo, index);
    taskList.appendChild(node);
  });
}

function addTodo() {
  const text = taskInput.value.trim();
  if (!text) return;

  todos.push({
    text,
    completed: false,
  });

  taskInput.value = "";
  saveTodos();
  renderTodo();
}

addBtn.addEventListener("click", addTodo);

if (clearAllBtn) {
  clearAllBtn.addEventListener("click", () => {
    todos = [];
    saveTodos();
    renderTodo();
  });
}

// ✅ Load from localStorage on startup
renderTodo();

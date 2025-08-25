// Get main elements
let taskInput = document.getElementById("taskInput");
let addTaskBtn = document.getElementById("addTaskBtn");
let taskList = document.getElementById("taskList");
let clearAllBtn = document.getElementById("clearAllBtn");

// Get modal elements
let modal = document.getElementById("modal");
let modalMessage = document.getElementById("modal-message");
let closeModalBtn = document.getElementById("close-modal");

// Load tasks when page loads
document.addEventListener("DOMContentLoaded", loadTasks);

addTaskBtn.addEventListener("click", addTask);
clearAllBtn.addEventListener("click", clearAll);

// Add new task
function addTask() {
  let taskText = taskInput.value.trim();

  if (taskText === "") {
    showModal("Please enter a task!");
    return;
  }

  createTaskElement(taskText, false);
  saveTaskToLocalStorage(taskText, false);

  taskInput.value = "";
}

// Create a task element
function createTaskElement(taskText, completed = false) {
  const li = document.createElement("li");

  // text span
  const span = document.createElement("span");
  span.textContent = taskText;
  li.appendChild(span);

  if (completed) li.classList.add("completed");

  // Toggle completed
  span.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateLocalStorage();
  });

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
    updateLocalStorage();
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Save task to localStorage
function saveTaskToLocalStorage(taskText, completed) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, completed: completed });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => createTaskElement(task.text, task.completed));
}

// Update localStorage
function updateLocalStorage() {
  let tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.querySelector("span").textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear all tasks
function clearAll() {
  taskList.innerHTML = "";
  localStorage.removeItem("tasks");
}

// Modal functions
function showModal(message) {
  modalMessage.textContent = message;
  modal.classList.remove("hidden");
}

closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

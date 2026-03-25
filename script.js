// -------- Login / Signup --------
function showSignup() {
  document.getElementById("loginForm").classList.add("hidden");
  document.getElementById("signupForm").classList.remove("hidden");
}
function showLogin() {
  document.getElementById("signupForm").classList.add("hidden");
  document.getElementById("loginForm").classList.remove("hidden");
}
function signup() {
  let name = document.getElementById("signupName").value;
  let email = document.getElementById("signupEmail").value;
  let password = document.getElementById("signupPassword").value;
  if (name && email && password) {
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);
    alert("Signup Successful!");
    showLogin();
  } else { alert("Please fill all fields!"); }
}
function login() {
  let email = document.getElementById("loginEmail").value;
  let password = document.getElementById("loginPassword").value;
  let storedEmail = localStorage.getItem("userEmail");
  let storedPassword = localStorage.getItem("userPassword");
  if (email === storedEmail && password === storedPassword) {
    window.location.href = "dashboard.html";
  } else { alert("Invalid Email or Password!"); }
}

// -------- Dashboard / Tasks --------
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.href.includes("dashboard.html")) {
    document.getElementById("userName").textContent = localStorage.getItem("userName");
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if(localStorage.getItem("theme")==="light") document.body.classList.add("light");
    renderTasks(tasks);
  }
});

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask() {
  let title = document.getElementById("newTaskInput").value.trim();
  if (!title) return alert("Enter a task!");
  tasks.push({ id: Date.now(), title, completed: false });
  saveTasks(); document.getElementById("newTaskInput").value = "";
  renderTasks(tasks);
}
function saveTasks() { localStorage.setItem("tasks", JSON.stringify(tasks)); }

function renderTasks(taskArray) {
  const taskList = document.getElementById("taskList"); taskList.innerHTML = "";
  taskArray.forEach(task => {
    const li = document.createElement("li"); li.dataset.id = task.id;
    li.innerHTML = `
      <input type="checkbox" ${task.completed?"checked":""} onclick="toggleComplete(${task.id})">
      <span class="${task.completed?"completed":""}">${task.title}</span>
      <button onclick="editTask(${task.id})">Edit</button>
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;
    taskList.appendChild(li);
  });
  updateStats(); addDragListeners();
}
function toggleComplete(id) {
  tasks = tasks.map(t => t.id===id? {...t, completed:!t.completed}: t);
  saveTasks(); renderTasks(tasks);
}
function editTask(id) {
  let newTitle = prompt("Edit task:"); if(newTitle){
    tasks = tasks.map(t => t.id===id? {...t,title:newTitle}: t);
    saveTasks(); renderTasks(tasks);
  }
}
function deleteTask(id) { tasks = tasks.filter(t => t.id!==id); saveTasks(); renderTasks(tasks); }
function updateStats() {
  document.getElementById("totalTasks").textContent = tasks.length;
  document.getElementById("completedTasks").textContent = tasks.filter(t=>t.completed).length;
  document.getElementById("pendingTasks").textContent = tasks.filter(t=>!t.completed).length;
}
function filterTasks(type){
  if(type==="all") renderTasks(tasks);
  else if(type==="completed") renderTasks(tasks.filter(t=>t.completed));
  else renderTasks(tasks.filter(t=>!t.completed));
}
function searchTask(){
  let query = document.getElementById("searchInput").value.toLowerCase();
  renderTasks(tasks.filter(t=>t.title.toLowerCase().includes(query)));
}

// -------- Drag & Drop --------
function addDragListeners(){
  const taskList = document.getElementById("taskList");
  taskList.querySelectorAll("li").forEach(li=>{
    li.setAttribute("draggable", true);
    li.addEventListener("dragstart", e=>{ e.dataTransfer.setData("text/plain", li.dataset.id); });
    li.addEventListener("dragover", e=> e.preventDefault());
    li.addEventListener("drop", e=>{
      e.preventDefault();
      const draggedId = parseInt(e.dataTransfer.getData("text/plain"));
      const targetId = parseInt(li.dataset.id);
      if(draggedId===targetId) return;
      const draggedIndex = tasks.findIndex(t=>t.id===draggedId);
      const targetIndex = tasks.findIndex(t=>t.id===targetId);
      const temp = tasks[draggedIndex];
      tasks.splice(draggedIndex,1);
      tasks.splice(targetIndex,0,temp);
      saveTasks(); renderTasks(tasks);
    });
  });
}

// -------- Dark / Light Mode --------
function toggleTheme(){
  if(document.body.classList.contains("light")){
    document.body.classList.remove("light"); localStorage.setItem("theme","dark");
  }else{
    document.body.classList.add("light"); localStorage.setItem("theme","light");
  }
}

// -------- Logout --------
function logout(){ window.location.href="index.html"; }
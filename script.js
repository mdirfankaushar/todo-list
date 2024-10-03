const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const clearAllTask = document.getElementById("clearAllTask");

let tasks = [];

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keydown", addTaskEnter);
taskList.addEventListener("click", toggleTask);
taskList.addEventListener("click", handleTaskclick);
taskList.addEventListener("dragstart", handleDragStart);
taskList.addEventListener("dragover", handleDragOver);
taskList.addEventListener("drop", handleDrop);

function addTask() {
    const taskText = taskInput.value.trim();

    if(taskText !== "") {
        tasks.push(taskText)
        renderTasks();
        taskInput.value = ""
    }
}

function addTaskEnter(e) {
    if (e.key === "Enter") {
        addTask();
    }
}

function toggleTask(e) {
    if(e.target.tagName === "LI") {
        const taskItem = e.target
        const taskIndex = Array.from(taskList.children).indexOf(e.target);
        taskItem.classList.toggle("completed"); // toggle the completed task
        tasks[taskIndex] = tasks[taskIndex].startsWith("✓ ") ? tasks[taskIndex].slice(2) : "✓ " + tasks[taskIndex]
        renderTasks()
    }
}

function handleTaskclick(e) {
    if(e.target.classList.contains("remove")) {
        const taskItem = e.target.parentElement;
        const taskItem2 = taskItem.parentElement;
        const taskIndex = Array.from(taskList.children).indexOf(taskItem2)
        tasks.splice(taskIndex, 1);
        renderTasks()
    }
}

function handleDragStart(e) {
    const taskItem = e.target;
    const taskIndex = Array.from(taskList.children).indexOf(taskItem);
    e.dataTransfer.setData("text/plain", taskIndex);
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    const taskIndex = parseInt(e.dataTransfer.getData("text/plain"));
    const dropIndex = Array.from(taskList.children).indexOf(e.target);

    if(taskIndex !== dropIndex && dropIndex !== -1) {
        const [removedTask] = tasks.splice(taskIndex, 1);
        tasks.splice(dropIndex, 0, removedTask);
        renderTasks();
    }
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((taskText, index) => {
        const taskItem = document.createElement("li");
        taskItem.textContent = `${index+1}. ${taskText}` //add list number to task text

        taskItem.draggable = true;
        taskItem.dataset.index = index;
        
        if(taskText.startsWith("✓ ")) {
            taskItem.classList.add("completed");
        }

        const removeButton = document.createElement("button");
        removeButton.innerHTML = `<i class="fa fa-trash remove"></i>`;
        removeButton.classList.add("remove")

        taskItem.appendChild(removeButton);
        taskList.appendChild(taskItem);
    })

    if(taskList.innerHTML !== "") {
        clearAllTask.style.display = 'block';
    }
    else {
        clearAllTask.style.display = 'none';
    }

 }

 clearAllTask.addEventListener("click", function() {
    taskList.innerHTML = "";
    tasks = []
    clearAllTask.style.display = 'none';
 })
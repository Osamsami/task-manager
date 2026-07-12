// Get references to DOM elements
const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.querySelector('span').textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Create and append a task element
function createTaskElement(taskText, isCompleted = false) {
    const li = document.createElement('li');
    if (isCompleted) {
        li.classList.add('completed');
    }

    const span = document.createElement('span');
    span.textContent = taskText;
    li.appendChild(span);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');

    deleteBtn.addEventListener('click', function (event) {
        event.stopPropagation();
        li.remove();
        saveTasks();
    });

    li.appendChild(deleteBtn);

    li.addEventListener('click', function () {
        li.classList.toggle('completed');
        filterTasks();
        saveTasks();
    });

    taskList.appendChild(li);
}

// Add a new task from the input field
function addTask() {
    const taskText = taskInput.value.trim();

    // Prevent empty tasks
    if (taskText === '') {
        return;
    }

    // Check for duplicates (case-insensitive)
    const existingTasks = Array.from(taskList.querySelectorAll('li span'));
    const isDuplicate = existingTasks.some(span => span.textContent.toLowerCase() === taskText.toLowerCase());

    if (isDuplicate) {
        alert('This task already exists!');
        return;
    }

    createTaskElement(taskText);
    filterTasks();
    saveTasks();
    taskInput.value = '';
}

// Load tasks from localStorage
function loadTasks() {
    const saved = JSON.parse(localStorage.getItem('tasks')) || [];
    saved.forEach(task => createTaskElement(task.text, task.completed));
    filterTasks();
}

// Add click event listener to the Add button
addButton.addEventListener('click', addTask);

// Add keypress event listener to the input field for the Enter key
taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Function to filter tasks based on active filter button
function filterTasks() {
    const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
    const tasks = taskList.querySelectorAll('li');

    tasks.forEach(task => {
        const isCompleted = task.classList.contains('completed');
        if (activeFilter === 'all') {
            task.style.display = 'flex';
        } else if (activeFilter === 'active' && !isCompleted) {
            task.style.display = 'flex';
        } else if (activeFilter === 'completed' && isCompleted) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });
}

// Add event listeners to filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        // Remove active class from all buttons
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        // Apply the filter
        filterTasks();
    });
});

// Load tasks on initial page load
loadTasks();

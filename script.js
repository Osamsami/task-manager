// Get references to DOM elements
const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();

    // Only add task if input is not empty
    if (taskText !== '') {
        // Create a new list item
        const li = document.createElement('li');

        // Create span for task text
        const span = document.createElement('span');
        span.textContent = taskText;
        li.appendChild(span);

        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');

        // Delete task when button is clicked
        deleteBtn.addEventListener('click', function (event) {
            event.stopPropagation(); // Prevent triggering 'completed' toggle
            li.remove();
        });

        li.appendChild(deleteBtn);

        // Toggle 'completed' status when clicked
        li.addEventListener('click', function () {
            li.classList.toggle('completed');
            filterTasks(); // Re-apply filter when state changes
        });

        // Append the new item to the task list
        taskList.appendChild(li);
        filterTasks(); // Apply filter to newly added item

        // Clear the input field
        taskInput.value = '';
    }
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

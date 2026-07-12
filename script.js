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
        li.textContent = taskText;

        // Toggle 'completed' status when clicked
        li.addEventListener('click', function () {
            li.classList.toggle('completed');
        });

        // Append the new item to the task list
        taskList.appendChild(li);

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

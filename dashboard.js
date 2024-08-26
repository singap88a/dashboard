    // Retrieve tasks from localStorage or initialize with default values
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [
        { task: "Design Website Layout", assignedTo: "John Doe", deadline: "2024-09-10", status: "In Progress" },
        { task: "Develop Backend API", assignedTo: "Jane Smith", deadline: "2024-09-20", status: "Not Started" },
        { task: "Setup Database", assignedTo: "Mike Johnson", deadline: "2024-09-15", status: "Completed" }
    ];

    function renderTasks() {
        const taskTableBody = document.getElementById('taskTableBody');
        taskTableBody.innerHTML = '';
        tasks.forEach((task, index) => {
            taskTableBody.innerHTML += `
                <tr>
                    <td><input type="text" value="${task.task}" onchange="updateTask(${index}, 'task', this.value)"></td>
                    <td><input type="text" value="${task.assignedTo}" onchange="updateTask(${index}, 'assignedTo', this.value)"></td>
                    <td><input type="date" value="${task.deadline}" onchange="updateTask(${index}, 'deadline', this.value)"></td>
                    <td>
                        <select onchange="updateTask(${index}, 'status', this.value)">
                            <option value="Not Started" ${task.status === "Not Started" ? "selected" : ""}>Not Started</option>
                            <option value="In Progress" ${task.status === "In Progress" ? "selected" : ""}>In Progress</option>
                            <option value="Completed" ${task.status === "Completed" ? "selected" : ""}>Completed</option>
                        </select>
                    </td>
                    <td>
                        <button class="btn btn-danger" onclick="removeTask(${index})">Delete</button>
                        <button class="btn" onclick="saveTasks()">Save</button>
                    </td>
                </tr>
            `;
        });
    }

    function addTask() {
        const newTask = { task: "New Task", assignedTo: "New Assignee", deadline: "2024-10-01", status: "Not Started" };
        tasks.push(newTask);
        renderTasks();
    }

    function removeTask(index) {
        tasks.splice(index, 1);
        saveTasks(); // Save changes after deletion
        renderTasks();
    }

    function updateTask(index, key, value) {
        tasks[index][key] = value;
        renderTasks();
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        alert('Tasks saved successfully!');
    }

    function searchTasks() {
        const searchInput = document.getElementById('searchInput').value.toLowerCase();
        const filteredTasks = tasks.filter(task => 
            task.task.toLowerCase().includes(searchInput) ||
            task.assignedTo.toLowerCase().includes(searchInput) ||
            task.deadline.includes(searchInput) ||
            task.status.toLowerCase().includes(searchInput)
        );

        const taskTableBody = document.getElementById('taskTableBody');
        taskTableBody.innerHTML = '';
        filteredTasks.forEach((task, index) => {
            taskTableBody.innerHTML += `
                <tr>
                    <td><input type="text" value="${task.task}" onchange="updateTask(${index}, 'task', this.value)"></td>
                    <td><input type="text" value="${task.assignedTo}" onchange="updateTask(${index}, 'assignedTo', this.value)"></td>
                    <td><input type="date" value="${task.deadline}" onchange="updateTask(${index}, 'deadline', this.value)"></td>
                    <td>
                        <select onchange="updateTask(${index}, 'status', this.value)">
                            <option value="Not Started" ${task.status === "Not Started" ? "selected" : ""}>Not Started</option>
                            <option value="In Progress" ${task.status === "In Progress" ? "selected" : ""}>In Progress</option>
                            <option value="Completed" ${task.status === "Completed" ? "selected" : ""}>Completed</option>
                        </select>
                    </td>
                    <td>
                        <button class="btn btn-danger" onclick="removeTask(${index})">Delete</button>
                        <button class="btn" onclick="saveTasks()">Save</button>
                    </td>
                </tr>
            `;
        });
    }

    // Initial render
    renderTasks(); 
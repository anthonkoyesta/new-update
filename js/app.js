// Vanilla JavaScript for Data Management & Local Storage

class TaskManager {
    constructor() {
        this.tasks = this.loadTasks();
    }

    // Load tasks from browser local storage
    loadTasks() {
        const storedTasks = localStorage.getItem('studentTasks');
        return storedTasks ? JSON.parse(storedTasks) : [];
    }

    // Save tasks to browser local storage
    saveTasks() {
        localStorage.setItem('studentTasks', JSON.stringify(this.tasks));
    }

    // Add a new task
    addTask(text) {
        const newTask = {
            id: Date.now(),
            text: text,
            completed: false
        };
        this.tasks.push(newTask);
        this.saveTasks();
        return newTask;
    }

    // Toggle task completion status
    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
        }
        return task;
    }

    // Delete a task
    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.saveTasks();
    }

    // Get all tasks
    getAllTasks() {
        return this.tasks;
    }
}

// Initialize the Task Manager globally
const taskManager = new TaskManager();

class Task {
    constructor(title, desc, priority, date, status = false) {
        this.title = title;
        this.desc = desc;
        this.priority = priority;
        this.date = date;
        this.status = status;
        this.id = Date.now();
    }

    toggleStatus() {
        this.status = !this.status;
    }
}

class TaskList {
    constructor() {
        tasks = [];
        const taskContainer = document.querySelector('.tasks-list');
    }

    addTask(title, desc, priority, date, status = false) {
        tasks.append(Task(title, desc, priority, date, status));
    }

    removeTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id)
    }

    displayTasks() {
        for (let t in tasks) {
            const task = document.createElement('div');
            const taskLeft = document.createElement('div');
            const status = document.createElement('span');
            const title = document.createElement('span');
            const remove = document.createElement('span');


            if (t.status = true) status.textContent = '✅'
            else status.textContent = '❌';

            title.textContent = t.title;
            remove.textContent = '🗑️';


            taskLeft.appendChild(status);
            taskLeft.appendChild(title);


            task.appendChild(taskLeft);
            task.appendChild(remove);

            taskContainer.appendChild(task);
        }
    }
}


// BUTTON
const addButton = document.querySelector('.add-task');
addButton.addEventListener('click', () => {
    openModal();
});

function openModal() {
    document.querySelector('.modal').style.display = 'flex';
}

function closeModal() {
    document.querySelector('.modal').style.display = 'none';
}

window.onclick = function (event) {
    if (event.target === document.querySelector('.modal')) {
        closeModal();
    }
};


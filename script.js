class Task {
    constructor(title, desc, priority, date, status = false, project) {
        this.title = title;
        this.desc = desc;
        this.priority = priority;
        this.date = date;
        this.status = status;
        this.project = project
        this.id = Date.now();
    }

    toggleStatus() {
        this.status = !this.status;
    }
}

class TaskList {
    constructor() {
        this.tasks = [];
        this.taskContainer = document.querySelector('.tasks-list');
        this.view = "home";
    }

    addTask(title, desc, priority, date, status = false) {
        this.tasks.push(new Task(title, desc, priority, date, status));
        this.displayTasks()
    }

    removeTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id)
        this.displayTasks();
    }

    displayTasks() {
        let list = [];

        if (this.view === "today") {
            const today = new Date().toISOString().slice(0, 10).replace(/-/g, '-');
            list = this.tasks.filter(task => task.date === today);
        }

        for (let t of list) {
            const task = document.createElement('div');
            const taskLeft = document.createElement('div');
            const status = document.createElement('span');
            const title = document.createElement('span');
            const remove = document.createElement('span');

            if (t.status === true) status.textContent = '✅'
            else status.textContent = '❌';

            title.textContent = t.title;
            remove.textContent = '🗑️';


            taskLeft.appendChild(status);
            taskLeft.appendChild(title);


            task.appendChild(taskLeft);
            task.appendChild(remove);

            this.taskContainer.appendChild(task);
        }
    }
}


// BUTTON
const addButton = document.querySelector('.add-task');
addButton.addEventListener('click', () => {
    openModal();
});


// MODAL
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

// FORM
document.querySelector('form').addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.querySelector('#title').value;
    const desc = document.querySelector('#desc').value;
    const priority = document.querySelector("input[name='priority']:checked")?.value;
    const date = document.querySelector('#date').value;

    tasksList.addTask(title, desc, priority, date);

    document.querySelector('form').reset();
    closeModal();
});





const tasksList = new TaskList();
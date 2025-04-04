class Task {
    constructor(title, desc, priority, date, project) {
        this.title = title;
        this.desc = desc;
        this.priority = priority;
        this.date = date;
        this.status = false;
        this.project = project
        this.id = Date.now();
    }
}

class TaskList {
    constructor() {
        this.tasks = [];
        this.taskContainer = document.querySelector('.tasks-list');
        this.view = "home";
    }

    addTask(title, desc, priority, date, project) {
        this.tasks.push(new Task(title, desc, priority, date, project));
        this.displayTasks()
    }

    removeTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id)
        this.displayTasks();
    }

    displayTasks() {
        this.taskContainer.innerHTML = '';
        let list = [];

        if (this.view === "today") {
            const today = new Date().toISOString().slice(0, 10).replace(/-/g, '-');
            list = this.tasks.filter(task => task.date === today);
        } else if(this.view === "home") {
            list = this.tasks;
        } else {
            list = this.tasks.filter(task => task.project === this.view);
        }

        for (let t of list) {
            const task = document.createElement('div');
            const taskLeft = document.createElement('div');
            const title = document.createElement('span');
            const remove = document.createElement('span');

            title.textContent = t.title;
            remove.textContent = '✔️';
            remove.classList.add('task-button')
            remove.addEventListener('click', () => this.removeTask(t.id));

            taskLeft.appendChild(title);

            task.appendChild(taskLeft);
            task.appendChild(remove);

            task.classList.add('task');

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
    const project = document.querySelector('#project').value;

    tasksList.addTask(title, desc, priority, date, project);

    document.querySelector('form').reset();
    closeModal();
});


const tasksList = new TaskList();
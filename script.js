class Task {
    constructor(title, desc, priority, date, group) {
        this.title = title;
        this.desc = desc;
        this.priority = priority;
        this.date = date;
        this.status = false;
        this.group = group
        this.id = Date.now();
    }
}

class TaskList {
    constructor() {
        this.tasks = [];
        this.taskContainer = document.querySelector('.tasks-list');
        this.view = "home";
    }

    addTask(title, desc, priority, date, group) {
        this.tasks.push(new Task(title, desc, priority, date, group));
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
        } else if (this.view === "home") {
            list = this.tasks;
        } else {
            list = this.tasks.filter(task => task.group === this.view);
        }

        for (let t of list) {
            const task = document.createElement('div');
            const title = document.createElement('span');
            const remove = document.createElement('span');
            const removeImg = document.createElement('img');

            const dropdown = document.createElement('div');
            dropdown.classList.add('task-dropdown');

            const dueDate = document.createElement('p');
            dueDate.innerHTML = `<b>Due Date:</b> ${t.date}`;

            const priority = document.createElement('p');
            priority.innerHTML = `<b>Priority:</b> ${t.priority}`;

            const desc = document.createElement('p');
            desc.innerHTML = `<b>Description:</b> ${t.desc}`;

            dropdown.appendChild(dueDate);
            dropdown.appendChild(priority);
            dropdown.appendChild(desc);

            title.textContent = t.title;
            remove.style.cursor = 'pointer';

            removeImg.src = 'images/cross.png';
            removeImg.alt = 'Remove task';
            removeImg.classList.add('task-remove-img');

            remove.appendChild(removeImg);
            remove.addEventListener('click', () => this.removeTask(t.id));


            task.appendChild(title);
            task.appendChild(remove);

            task.appendChild(dropdown);

            task.classList.add('task');


            task.addEventListener('mouseover', () => {
                dropdown.style.opacity = '1';
                dropdown.style.transform = 'translateY(0)';


                const dropdownHeight = dropdown.offsetHeight + 10;

                let nextTask = task.nextElementSibling;
                while (nextTask) {
                    nextTask.style.transition = 'transform 0.3s ease';
                    nextTask.style.transform = `translateY(${dropdownHeight}px)`;
                    nextTask = nextTask.nextElementSibling;
                }
            });

            task.addEventListener('mouseout', () => {
                dropdown.style.opacity = '0';
                dropdown.style.transform = 'translateY(-10px)';

                let nextTask = task.nextElementSibling;
                while (nextTask) {
                    nextTask.style.transition = 'transform 0.3s ease';
                    nextTask.style.transform = 'translateY(0)';
                    nextTask = nextTask.nextElementSibling;
                }
            });

            this.taskContainer.appendChild(task);
        }
    }
}


// BUTTON
const addButton = document.querySelector('.add-task');
addButton.addEventListener('click', () => {
    openModal();
});

const homeButton = document.querySelector('#home');
const todayButton = document.querySelector('#today');
const addgroupButton = document.querySelector('#add-group');

homeButton.addEventListener('click', () => {
    tasksList.view = "home";
    tasksList.displayTasks();
    document.querySelector('.tasks-container h1').textContent = "Home";
});

todayButton.addEventListener('click', () => {
    tasksList.view = "today";
    tasksList.displayTasks();
    document.querySelector('.tasks-container h1').textContent = "Today";
});

addgroupButton.addEventListener('click', () => {
    document.querySelector('.group-modal').style.display = 'flex';
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

    if (event.target === document.querySelector('.group-modal')) {
        document.querySelector('.group-modal').style.display = 'none';
    }
};

// FORM
document.querySelector('form').addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.querySelector('#title').value;
    const desc = document.querySelector('#desc').value;
    const priority = document.querySelector("input[name='priority']:checked")?.value;
    const date = document.querySelector('#date').value;
    const group = document.querySelector('#group').value;

    tasksList.addTask(title, desc, priority, date, group);

    document.querySelector('form').reset();
    closeModal();
});

document.querySelector('.add-group-btn').addEventListener('click', () => {
    const name = document.querySelector('#group-name').value.trim();
    if (!name) return;

    const list = document.querySelector('#groups-ul');
    const group = document.createElement('li');
    group.textContent = name;

    group.addEventListener('click', () => {
        tasksList.view = name;
        tasksList.displayTasks();
        document.querySelector('.tasks-container h1').textContent = name;
    });

    list.prepend(group);

    const groupInput = document.querySelector('#group');
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    groupInput.appendChild(option);

    document.querySelector('#group-name').value = '';
    document.querySelector('.group-modal').style.display = 'none';
});



const tasksList = new TaskList();
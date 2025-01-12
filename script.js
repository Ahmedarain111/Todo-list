const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" viewBox="0 0 24 24">
                <line x1="4" y1="4" x2="20" y2="20" />
                <line x1="20" y1="4" x2="4" y2="20" />
                </svg>`;
const taskListDiv = document.querySelector('.task-list');

document.querySelector(".add-task-btn").addEventListener('click', () => addTask());

function removeTask(task) {
    taskListDiv.removeChild(task);
}

function addTask() {
    const input = document.querySelector("input");

    if (input.value == '') {
        return;
    }

    const task = document.createElement("div");
    task.classList.add('task');
    const taskName = document.createElement("span");
    taskName.innerText = input.value;
    taskName.classList.add("task-name");
    const removebtn = document.createElement('button');
    removebtn.innerHTML = svgIcon;
    removebtn.classList.add('remove');
    removebtn.addEventListener('click', () => removeTask(task));

    task.appendChild(taskName);
    task.appendChild(removebtn);
    taskListDiv.appendChild(task);

    input.value = '';
}

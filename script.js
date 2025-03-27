class Task {
    constructor(title, desc, priority, date, time, status=false) {
        this.title = title;
        this.desc = desc;
        this.priority = priority;
        this.date = date;
        this.time = time;
        this.status = status;
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
}


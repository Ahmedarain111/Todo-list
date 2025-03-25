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


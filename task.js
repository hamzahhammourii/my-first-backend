const fs = require('fs');

const args = process.argv.slice(2);
const command = args[0];
const taskDescription = args[1];

const FILE_NAME = 'tasks.json';

function readTasks() {
    if (!fs.existsSync(FILE_NAME)) {
        return [];
    }
    const data = fs.readFileSync(FILE_NAME, 'utf8');
    return JSON.parse(data);
}

function saveTasks(tasks) {
    fs.writeFileSync(FILE_NAME, JSON.stringify(tasks, null, 2), 'utf8');
}

if (command === 'add') {
    if (!taskDescription) {
        console.log('Please provide a task description.');
        process.exit(1);
    }
    else {
        const tasks = readTasks();
    const newTask = {
        id: tasks.length + 1,
        description: taskDescription,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    tasks.push(newTask);
    saveTasks(tasks);
    console.log(`Task added: ${taskDescription}`);
    }
 
}
if (command === 'list') {
        const tasks = readTasks();
        if (tasks.length === 0) {
            console.log('No tasks found.');
        } else {
            console.log('Tasks:');
            tasks.forEach(task => {
                console.log(`- ${task.description} (${task.status})`);
            });
        }
    }
if (command === 'complete') {
    const tasksId = parseInt(args[1]);
    const tasks = readTasks();
    const task = tasks.find(t => t.id === tasksId);
    if (!task) {
        console.log(`Task with ID ${tasksId} not found.`);
    } else {
        task.status = 'completed';
        saveTasks(tasks);
        console.log(`Task with ID ${tasksId} marked as completed.`);
    }
}
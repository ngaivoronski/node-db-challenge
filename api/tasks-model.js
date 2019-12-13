const knex = require('knex');
const db = require("../data/db-config");

module.exports = {
    getTasks,
    getTaskById,
    addTask,
}

function getTasks() {
    return db('tasks')
    .select("tasks.id", "projects.name as project_name", "projects.description as project_description", "tasks.description as task_description", "tasks.notes as task_notes",
    knex.raw(`(case when tasks.completed = 0 then 'false' else 'true' end) as completed`))
    .join("projects", "tasks.project_id", "=", "projects.id")
    .orderBy("projects.id")
}

function getTaskById(id) {
    return db('tasks')
    .select("tasks.id", "projects.name as project_name", "projects.description as project_description", "tasks.description as task_description", "tasks.notes as task_notes",
    knex.raw(`(case when tasks.completed = 0 then 'false' else 'true' end) as completed`))
    .join("projects", "tasks.project_id", "=", "projects.id")
    .where("tasks.id", "=", id).first();
}

function addTask(taskData, projId) {
    const newTask = {...taskData, project_id: projId}

    return db("tasks")
    .insert(newTask)
    .then(taskIds => {
        const taskId = taskIds[0];
        return getTaskById(taskId);
    })
}
const knex = require('knex');
const db = require("../data/db-config");

module.exports = {
    getProjects,
    getProjectById,
    getProjectTasks,
    getResourcesForProject,
    addProject,
    assignResourceToProject,
}

function getProjects() {
    return db('projects')
    .select("projects.id", "projects.name", "projects.description",
    knex.raw(`(case when projects.completed = 0 then 'false' else 'true' end) as completed`));
}

function getProjectById(id) {
    return db('projects')
    .select("projects.id", "projects.name", "projects.description",
    knex.raw(`(case when projects.completed = 0 then 'false' else 'true' end) as completed`))
    .where({id}).first();
}

function getProjectTasks(projectId) {
    return db('tasks')
    .select("tasks.id", "tasks.description", "tasks.notes",
    knex.raw(`(case when tasks.completed = 0 then 'false' else 'true' end) as completed`))
    .join("projects", "tasks.project_id", "=", "projects.id")
    .where("tasks.project_id", "=", projectId);
}

function getResourcesForProject(id) {
    return db('resources')
    .select("resources.id", "resources.name", "resources.description")
    .join("resources_to_projects","resources.id", "=", "resources_to_projects.resource_id")
    .join("projects", "resources_to_projects.project_id", "=", "projects.id")
    .where("projects.id", "=", id)
}

function addProject(projData) {
    return db("projects")
        .insert(projData, "id")
        .then(ids => {
            const [id] = ids;
            return getProjectById(id);
        })
}

function assignResourceToProject(resource_id, project_id) {
    const resourceAssignment = {resource_id: resource_id, project_id: project_id}

    return db("resources_to_projects")
    .insert(resourceAssignment)
    .then(assignmentIds => {
        return getProjectById(project_id);
    })
}
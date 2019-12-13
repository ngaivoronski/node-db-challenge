const knex = require('knex');
const db = require("../data/db-config");

module.exports = {
    getProjects,
    getProjectById,
    addProject,
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

function addProject(projData) {
    return db("projects")
        .insert(projData, "id")
        .then(ids => {
            const [id] = ids;
            return getProjectById(id);
        })
}
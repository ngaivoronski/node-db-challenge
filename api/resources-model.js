const db = require("../data/db-config");

module.exports = {
    getResources,
    getResourceById,
    addResource,
}

function getResources() {
    return db('resources');
}

function getResourceById(id) {
    return db('resources').where({id}).first();
}

function addResource(rescData) {
    return db("resources")
        .insert(rescData, "id")
        .then(ids => {
            const [id] = ids;
            return getResourceById(id);
        })
}
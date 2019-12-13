
exports.up = function(knex) {
    return knex.schema.createTable('projects', tbl => {
        tbl.increments();
        tbl.string('name', 255)
            .notNullable();
        tbl.string('description', 255);
        tbl.boolean('completed')
            .defaultTo(false);
    })
    .createTable('tasks', tbl => {
        tbl.increments();
        tbl.integer('project_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('projects')
            .onDelete("CASCADE") // cascade, restrict, do nothing, set null
            .onUpdate("CASCADE");
        tbl.string('description', 255)
            .notNullable();
        tbl.string('notes', 255);
        tbl.boolean('completed')
            .defaultTo(false);
    })
    .createTable('resources', tbl => {
        tbl.increments();
        tbl.string('name', 255)
            .notNullable();
        tbl.string('description', 255);
    })
    .createTable('resources_to_projects', tbl => {
        tbl.primary(['resource_id', 'project_id'])
        tbl.integer('resource_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('resources')
            .onDelete("CASCADE") // cascade, restrict, do nothing, set null
            .onUpdate("CASCADE")
        tbl.integer('project_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('projects')
            .onDelete("CASCADE") // cascade, restrict, do nothing, set null
            .onUpdate("CASCADE");
    });

};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('resources_to_projects')
    .dropTableIfExists('resources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('projects');
};

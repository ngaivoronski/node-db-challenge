
exports.seed = function(knex) {

  return knex('projects').truncate()
    .then(function () {
      return knex('projects').insert([
        { name: 'wash the dishes', description: "rinse dishes and put them in the washer"},
        { name: 'do the laundry', description: "was dirty clothes and then dry them"},
        { name: 'take out the trash'}
      ]);
    });
};
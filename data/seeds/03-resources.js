
exports.seed = function(knex) {

  return knex('resources').truncate()
    .then(function () {
      return knex('resources').insert([
        { name: "dishes", description: "used dishes"},
        { name: "dish washer", description: ""},
        { name: "cleaning products", description: "soap and detergent"},
        { name: "sink", description: ""},
        { name: "clothes", description: "dirty laundry"},
        { name: "basket", description: "for laundry"},
        { name: "washing machine", description: "for laundry"},
        { name: "drier", description: "for laundry"},
        { name: "garbage bin", description: ""},
        { name: "garbage bags", description: ""},
        { name: "dumpster", description: ""},
      ]);
    });
};
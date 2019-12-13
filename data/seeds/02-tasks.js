
exports.seed = function(knex) {

  return knex('tasks').truncate()
    .then(function () {
      return knex('tasks').insert([
        { project_id: 1, description: "throw any leftover food into the garbage", notes: "eat anything edible remaining" },
        { project_id: 1, description: "rinse all the dirty dishes", notes: "" },
        { project_id: 1, description: "put dirty dishes in dish washer", notes: "make sure no leftover food is stuck to them" },
        { project_id: 1, description: "put soap in dish washer and turn on", notes: "wait for a couple hours" },
        { project_id: 1, description: "take out clean dishes and sort them", notes: "" },
        { project_id: 2, description: "gather all dirty laundry in a laundry basket and bring to washing machine", notes: "" },
        { project_id: 2, description: "throw laundry into washing machine, add detergent, turn on the machine", notes: "wait for a couple hours" },
        { project_id: 2, description: "gather all wet laundry, throw it in drier and turn on the drier", notes: "make sure to count socks to make sure you haven't lost any" },
        { project_id: 2, description: "take out the dry clothes and sort them", notes: "" },
        { project_id: 3, description: "lift the trash bag out of the garbage bin and bring to dumpster", notes: "careful that it doesn't spill" },
        { project_id: 3, description: "throw trash bag in dumpster and get a new trash bag", notes: "" },
        { project_id: 3, description: "put new trash bag into trash bin", notes: "" }
      ]);
    });
};
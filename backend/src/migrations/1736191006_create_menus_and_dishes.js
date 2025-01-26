exports.up = function (knex) {
  return knex.schema
    .createTable('refuellers', (table) => {
      table.increments('id').primary();
      table.string('name', 50).notNullable();
      table
        .enu('fuel', ['92', '95', '98', '100', 'diesel'])
        .notNullable();
      table.string('vol', 255).notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('issues', (table) => {
      table.increments('id').primary();
      table.string('name', 255).notNullable();
      table.string('number', 255).notNullable();
      table
        .enu('fuel', ['92', '95', '98', '100', 'diesel'])
        .notNullable();
      table.string('volume', 255).notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('refuellers_issues', (table) => {
      table.increments('id').primary();
      table
        .integer('refuellers_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('refuellers')
        .onDelete('CASCADE');
      table
        .integer('issues_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('issues')
        .onDelete('CASCADE');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.unique(['refuellers_id', 'issues_id']);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('refuellers_issues')
    .dropTableIfExists('issues')
    .dropTableIfExists('refuellers');
};

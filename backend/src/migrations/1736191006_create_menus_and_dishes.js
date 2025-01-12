exports.up = function (knex) {
  return knex.schema
    .createTable('menus', (table) => {
      table.increments('id').primary();
      table.string('day', 50).notNullable();
      table.string('variant', 50).notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('dishes', (table) => {
      table.increments('id').primary();
      table.string('name', 255).notNullable();
      table
        .enu('type', ['salad', 'starter', 'main course', 'drink', 'dessert'])
        .notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('menu_dishes', (table) => {
      table.increments('id').primary();
      table
        .integer('menu_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('menus')
        .onDelete('CASCADE');
      table
        .integer('dish_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('dishes')
        .onDelete('CASCADE');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.unique(['menu_id', 'dish_id']);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('menu_dishes')
    .dropTableIfExists('dishes')
    .dropTableIfExists('menus');
};

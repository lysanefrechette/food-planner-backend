import { Knex } from 'knex';

const tableName = 'food_inventory';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (t) => {
    t.increments('id').primary();

    t.datetime('inventory_date').notNullable();

    t.double('quantity').notNullable();

    t.integer('groceries_list_id').nullable().unsigned();

    t.foreign('groceries_list_id', 'fk_food_inventory_groceries_list_id')
      .references('id')
      .inTable('groceries_list');

    t.integer('ingredient_id').notNullable().unsigned();

    t.foreign('ingredient_id', 'fk_food_inventory_ingredient_id')
      .references('id')
      .inTable('ingredient');

    t.integer('meal_id').nullable().unsigned();

    t.foreign('meal_id', 'fk_food_inventory_meal_id')
      .references('id')
      .inTable('meal');

    t.integer('measurement_unit_id').nullable().unsigned();

    t.foreign('measurement_unit_id', 'fk_food_inventory_measurement_unit_id')
      .references('id')
      .inTable('measurement_unit');

    t.integer('user_id').notNullable().unsigned();

    t.foreign('user_id', 'fk_food_inventory_user_id')
      .references('id')
      .inTable('user');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}

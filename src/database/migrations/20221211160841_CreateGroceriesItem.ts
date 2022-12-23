import {Knex} from 'knex';

const tableName = 'groceries_item';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, t => {
    t.increments('id').primary();

    t.integer('groceries_list_id')
        .notNullable()
        .unsigned();

    t.foreign('groceries_list_id','fk_groceries_item_groceries_list_id')
        .references('id')
        .inTable('groceries_list');

    t.integer('ingredient_id')
        .notNullable()
        .unsigned();

    t.foreign('ingredient_id', 'fk_groceries_item_ingredient_id')
        .references('id')
        .inTable('ingredient');

    t.integer('measurement_unit_id')
        .notNullable()
        .unsigned();

    t.foreign('measurement_unit_id', 'fk_groceries_item_measurement_unit_id')
        .references('id')
        .inTable('measurement_unit');

  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
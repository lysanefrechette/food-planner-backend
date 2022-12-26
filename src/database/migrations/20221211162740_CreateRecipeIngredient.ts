import { Knex } from 'knex';

const tableName = 'recipe_ingredient';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (t) => {
    t.increments('id').primary();

    t.integer('ingredient_id').notNullable().unsigned();

    t.foreign('ingredient_id', 'fk_recipe_ingredient_ingredient_id')
      .references('id')
      .inTable('ingredient');

    t.integer('measurement_unit_id').nullable().unsigned();

    t.foreign('measurement_unit_id', 'fk_recipe_ingredient_measurement_unit_id')
      .references('id')
      .inTable('measurement_unit');

    t.integer('recipe_id').notNullable().unsigned();

    t.foreign('recipe_id', 'fk_recipe_ingredient_recipe_id')
      .references('id')
      .inTable('recipe');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}

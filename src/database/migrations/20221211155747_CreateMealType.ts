import {Knex} from 'knex';

const tableName = 'meal_type';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, t => {
    t.increments('id').primary();

    t.string('name', 45)
        .notNullable();

  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
import { Knex } from 'knex';

const tableName = 'recipe_author';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (t) => {
    t.increments('id').primary();

    t.string('first_name', 100).notNullable();

    t.string('last_name', 100).notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}

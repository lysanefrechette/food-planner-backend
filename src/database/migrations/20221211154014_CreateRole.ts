import { Knex } from 'knex';

const tableName = 'role';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (t) => {
    t.increments('id').primary();

    t.string('name', 150).notNullable().unique();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}

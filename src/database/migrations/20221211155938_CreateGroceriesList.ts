import { Knex } from 'knex';

const tableName = 'groceries_list';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (t) => {
    t.increments('id').primary();

    t.string('name', 255).notNullable();

    t.datetime('created_at').notNullable();

    t.datetime('updated_at').nullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}

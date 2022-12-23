import {Knex} from 'knex';

const tableName = 'image';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, t => {
    t.increments('id').primary();

    t.string('location', 255)
        .notNullable();

  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
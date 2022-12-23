import {Knex} from 'knex';

const tableName = 'notification';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, t => {
    t.increments('id').primary();

    t.text('description')
        .nullable();

    t.string('title', 45)
        .notNullable();

  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
import {Knex} from 'knex';

const tableName = 'time_of_day';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, t => {
    t.increments('id').primary();

    t.string('name', 255)
        .notNullable();

  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
import { Knex } from 'knex';

const tableName = 'recipe_author';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(tableName, (t) => {
    t.string('last_name').nullable().alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(tableName, (t) => {
    t.string('last_name').notNullable().alter();
  });
}

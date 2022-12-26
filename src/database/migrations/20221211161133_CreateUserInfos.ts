import { Knex } from 'knex';

const tableName = 'user_infos';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (t) => {
    t.increments('id').primary();

    t.string('first_name', 255).nullable();

    t.string('last_name', 255).nullable();

    t.integer('profile_picture_id').nullable().unsigned();

    t.foreign('profile_picture_id', 'fk_user_infos_profile_picture_id')
      .references('id')
      .inTable('image');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}

import { Knex } from 'knex';

const tableName = 'user';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (t) => {
    t.increments('id').primary();

    t.string('password', 250).notNullable();

    t.datetime('last_login').nullable();

    t.string('username', 150).notNullable().unique();

    t.string('email', 255).notNullable().unique();

    t.tinyint('is_active').notNullable().defaultTo(0);

    t.datetime('date_joined').notNullable();

    t.integer('role_id').notNullable().unsigned();

    t.foreign('role_id', 'fk_user_role_id').references('id').inTable('role');

    t.integer('user_infos_id').notNullable().unsigned();

    t.foreign('user_infos_id', 'fk_user_user_infos_id')
      .references('id')
      .inTable('user_infos');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}

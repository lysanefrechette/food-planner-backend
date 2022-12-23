import {Knex} from 'knex';

const tableName = 'meal';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, t => {
    t.increments('id').primary();

    t.integer('meal_type_id')
        .notNullable()
        .unsigned();

    t.foreign('meal_type_id', 'fk_meal_meal_type_id')
        .references('id')
        .inTable('meal_type');

    t.integer('recipe_id')
        .notNullable()
        .unsigned();

    t.foreign('recipe_id', 'fk_meal_recipe_id')
        .references('id')
        .inTable('recipe');

    t.datetime('date')
        .nullable();

    t.integer('day_time_id')
        .notNullable()
        .unsigned();

    t.foreign('day_time_id', 'fk_meal_day_time_id')
        .references('id')
        .inTable('time_of_day');

    t.integer('notification_id')
        .nullable()
        .unsigned();

    t.foreign('notification_id', 'fk_meal_notification_id')
        .references('id')
        .inTable('notification');

    t.integer('user_id')
        .notNullable()
        .unsigned();

    t.foreign('user_id', 'fk_meal_user_id')
        .references('id')
        .inTable('user');

    t.datetime('send_notification_at')
        .nullable();

    t.tinyint('notification_sent')
        .nullable();

  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
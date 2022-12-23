import {Knex} from 'knex';

const tableName = 'recipe';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, t => {
    t.increments('id').primary();

    t.string('title', 255)
        .notNullable();

    t.text('directions', 'long')
        .notNullable();

    t.integer('servings')
        .notNullable();

    t.integer('prep_time_minutes')
        .nullable();

    t.integer('cook_time_minutes')
        .nullable();

    t.text('presentation', 'long')
        .nullable();

    t.integer('author_id')
        .nullable()
        .unsigned();

    t.foreign('author_id', 'fk_recipe_author_id')
        .references('id')
        .inTable('recipe_author');

    t.integer('meal_type_id')
        .notNullable()
        .unsigned();

    t.foreign('meal_type_id', 'fk_recipe_meal_type_id')
        .references('id')
        .inTable('meal_type');

    t.integer('user_id')
        .notNullable()
        .unsigned();

    t.foreign('user_id', 'fk_recipe_user_id')
        .references('id')
        .inTable('user');

  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
import {Knex} from 'knex';

const tableName = 'recipe_image';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, t => {

    t.integer('image_id')
        .notNullable()
        .unsigned();

    t.foreign('image_id', 'fk_recipe_image_image_id')
        .references('id')
        .inTable('image');

    t.integer('recipe_id')
        .notNullable()
        .unsigned();

    t.foreign('recipe_id', 'fk_recipe_image_recipe_id')
        .references('id')
        .inTable('recipe');

    t.unique(['image_id', 'recipe_id']);
    t.primary(['image_id', 'recipe_id']);

  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
import { Knex } from 'knex';

const tableName = 'ingredient';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, (t) => {
    t.increments('id').primary();

    t.string('name', 255).notNullable();

    t.text('description', 'long').nullable();

    t.integer('image_id').nullable().unsigned();

    t.foreign('image_id', 'fk_ingredient_image_id')
      .references('id')
      .inTable('image');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}

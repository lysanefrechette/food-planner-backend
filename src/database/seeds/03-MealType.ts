import { Knex } from 'knex';
import { MealTypeModel } from '../models/mealType.model';

export async function seed(knex: Knex): Promise<any> {
  await MealTypeModel.query(knex).insert({
    name: 'breakfast',
  });
  await MealTypeModel.query(knex).insert({
    name: 'dinner',
  });
  await MealTypeModel.query(knex).insert({
    name: 'lunch',
  });
  await MealTypeModel.query(knex).insert({
    name: 'snack',
  });
  await MealTypeModel.query(knex).insert({
    name: 'other',
  });
}

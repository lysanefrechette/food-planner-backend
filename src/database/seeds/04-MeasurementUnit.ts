import { Knex } from 'knex';
import { MeasurementUnitModel } from '../models/measurementUnit.model';

export async function seed(knex: Knex): Promise<any> {
  await MeasurementUnitModel.query(knex).insert({
    name: 'cup',
  });
  await MeasurementUnitModel.query(knex).insert({
    name: 'gram',
  });
  await MeasurementUnitModel.query(knex).insert({
    name: 'millilitre',
  });
  await MeasurementUnitModel.query(knex).insert({
    name: 'litre',
  });
  await MeasurementUnitModel.query(knex).insert({
    name: 'milligram',
  });
  await MeasurementUnitModel.query(knex).insert({
    name: 'tablespoon',
  });
  await MeasurementUnitModel.query(knex).insert({
    name: 'teaspoon',
  });
  await MeasurementUnitModel.query(knex).insert({
    name: 'pound',
  });
  await MeasurementUnitModel.query(knex).insert({
    name: 'kilogram',
  });
  await MeasurementUnitModel.query(knex).insert({
    name: 'pint',
  });
  await MeasurementUnitModel.query(knex).insert({
    name: 'gallon',
  });
  await MeasurementUnitModel.query(knex).insert({
    name: 'ounce',
  });
  await MeasurementUnitModel.query(knex).insert({
    name: 'drop',
  });
  await MeasurementUnitModel.query(knex).insert({
    name: 'pinch',
  });
}

import { Knex } from 'knex';
import { TimeOfDayModel } from '../models/timeOfDay.model';

export async function seed(knex: Knex): Promise<any> {
  await TimeOfDayModel.query(knex).insert({
    name: 'morning',
  });
  await TimeOfDayModel.query(knex).insert({
    name: 'noon',
  });
  await TimeOfDayModel.query(knex).insert({
    name: 'afternoon',
  });
  await TimeOfDayModel.query(knex).insert({
    name: 'night',
  });
}

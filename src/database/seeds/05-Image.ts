import { Knex } from 'knex';
import { ImageModel } from '../models/image.model';

export async function seed(knex: Knex): Promise<any> {
  await ImageModel.query(knex).insert([
    {
      location: '/assets/profiles-pictures/default.png',
    },
  ]);
}

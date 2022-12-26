import { Knex } from 'knex';
import { UserInfosModel } from '../models/userInfos.model';

export async function seed(knex: Knex): Promise<any> {
  await UserInfosModel.query(knex).insert([
    {
      firstName: 'Lysane',
      lastName: 'Fréchette',
      profilePictureId: 1,
    },
  ]);
}

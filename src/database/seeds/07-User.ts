import { Knex } from 'knex';
import { UserModel } from '../models/user.model';
import * as argon2 from 'argon2';

export async function seed(knex: Knex): Promise<any> {
  await UserModel.query(knex).insert([
    {
      username: 'lysane',
      email: 'lysanefrechette2@hotmail.com',
      isActive: 1,
      password: await argon2.hash('Gk*@s5Ah&iRapL'),
      lastLogin: null,
      dateJoined: new Date(),
      roleId: 1,
      userInfosId: 1,
    },
  ]);
}

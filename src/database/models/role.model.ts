import { Model } from 'objection';
import { UserModel } from './user.model';

export class RoleModel extends Model {
  id: number;
  name: string;

  static tableName = 'role';

  static jsonSchema = {
    type: 'object',
    required: ['name'],
    properties: {
      id: { type: 'integer' },
      name: { type: 'string', minLength: 1, maxLength: 150 },
    },
  };

  static relationMappings = () => ({
    users: {
      relation: Model.HasManyRelation,
      modelClass: UserModel,
      join: {
        from: 'role.id',
        to: 'users.roleId',
      },
    },
  });
}

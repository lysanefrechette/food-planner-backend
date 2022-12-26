import { Model } from 'objection';
import { RoleModel } from './role.model';
import { UserInfosModel } from './userInfos.model';
import { FoodInventoryModel } from './foodInventory.model';

export class UserModel extends Model {
  id: number;
  password: string;
  lastLogin: Date | null;
  username: string;
  email: string;
  isActive: number;
  dateJoined: Date;
  roleId: number;
  userInfosId: number;

  static tableName = 'user';

  static relationMappings = () => ({
    role: {
      relation: Model.BelongsToOneRelation,
      modelClass: RoleModel,
      join: {
        from: 'user.roleId',
        to: 'role.id',
      },
    },
    userInfos: {
      relation: Model.HasOneRelation,
      modelClass: UserInfosModel,
      join: {
        from: 'user.userInfosId',
        to: 'userInfos.id',
      },
    },
    foodInventory: {
      relation: Model.HasManyRelation,
      modelClass: FoodInventoryModel,
      join: {
        from: 'user.id',
        to: 'foodInventory.userId',
      },
    },
  });
}

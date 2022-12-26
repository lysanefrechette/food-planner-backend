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
  role: RoleModel;
  userInfosId: number;

  userInfos: UserInfosModel;

  static tableName = 'user';

  static get relationMappings() {
    return {
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
          to: 'user_infos.id',
        },
      },
      foodInventory: {
        relation: Model.HasManyRelation,
        modelClass: FoodInventoryModel,
        join: {
          from: 'user.id',
          to: 'food_inventory.userId',
        },
      },
    };
  }
}

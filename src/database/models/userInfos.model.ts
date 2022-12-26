import { Model } from 'objection';
import { UserModel } from './user.model';
import { ImageModel } from './image.model';

export class UserInfosModel extends Model {
  id: number;
  firstName: string;
  lastName: string;
  profilePictureId: number;

  static tableName = 'user_infos';

  static relationMappings = () => ({
    user: {
      relation: Model.HasOneRelation,
      modelClass: UserModel,
      join: {
        from: 'userInfos.id',
        to: 'user.userInfosId',
      },
    },
    profilePicture: {
      relation: Model.HasOneRelation,
      modelClass: ImageModel,
      join: {
        from: 'userInfos.profilePictureId',
        to: 'image.id',
      },
    },
  });
}

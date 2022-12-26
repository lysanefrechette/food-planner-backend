import { Model } from 'objection';
import { UserInfosModel } from './userInfos.model';
import { RecipeModel } from './recipe.model';

export class ImageModel extends Model {
  id: number;
  location: string;

  static tableName = 'image';

  static relationMappings = () => ({
    userInfo: {
      relation: Model.HasOneRelation,
      modelClass: UserInfosModel,
      join: {
        from: 'image.id',
        to: 'user_infos.profilePictureId',
      },
    },
    recipes: {
      relation: Model.ManyToManyRelation,
      modelClass: RecipeModel,
      join: {
        from: 'image.id',
        through: {
          from: 'recipe_image.imageId',
          to: 'recipe_image.recipeId',
        },
        to: 'recipe.id',
      },
    },
  });
}

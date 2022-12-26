import { Model } from 'objection';
import { RecipeModel } from './recipe.model';
import { ImageModel } from './image.model';

export class RecipeImageModel extends Model {
  imageId: number;
  recipeId: number;

  static tableName = 'recipe_image';

  static relationMappings = () => ({
    recipes: {
      relation: Model.HasManyRelation,
      modelClass: RecipeModel,
      join: {
        from: 'recipeImage.recipeId',
        to: 'recipe.id',
      },
    },
    images: {
      relation: Model.ManyToManyRelation,
      modelClass: ImageModel,
      join: {
        from: 'recipeImage.imageId',
        to: 'image.id',
      },
    },
  });
}

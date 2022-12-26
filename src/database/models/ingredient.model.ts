import { Model } from 'objection';
import { ImageModel } from './image.model';
import { FoodInventoryModel } from './foodInventory.model';
import { RecipeIngredientModel } from './recipeIngredient.model';

export class IngredientModel extends Model {
  id: number;
  name: string;
  description: string;
  imageId: number;

  static tableName = 'ingredient';

  static relationMappings = () => ({
    image: {
      relation: Model.BelongsToOneRelation,
      modelClass: ImageModel,
      join: {
        from: 'ingredient.imageId',
        to: 'image.id',
      },
    },
    foodInventories: {
      relation: Model.HasManyRelation,
      modelClass: FoodInventoryModel,
      join: {
        from: 'ingredient.id',
        to: 'foodInventory.ingredientId',
      },
    },
    recipeIngredients: {
      relation: Model.HasManyRelation,
      modelClass: RecipeIngredientModel,
      join: {
        from: 'ingredient.id',
        to: 'recipeIngredient.ingredientId',
      },
    },
  });
}

import { Model } from 'objection';
import { IngredientModel } from './ingredient.model';
import { MeasurementUnitModel } from './measurementUnit.model';
import { RecipeModel } from './recipe.model';

export class RecipeIngredientModel extends Model {
  id: number;
  ingredientId: number;
  measurementUnitId: number;
  recipeId: number;

  static tableName: 'recipe_ingredient';

  static relationMappings = () => ({
    ingredient: {
      relation: Model.BelongsToOneRelation,
      modelClass: IngredientModel,
      join: {
        from: 'recipeIngredient.recipeId',
        to: 'recipe.id',
      },
    },
    measurementUnit: {
      relation: Model.BelongsToOneRelation,
      modelClass: MeasurementUnitModel,
      join: {
        from: 'recipeIngredient.measurementUnitId',
        to: 'measurementUnit.id',
      },
    },
    recipeId: {
      relation: Model.BelongsToOneRelation,
      modelClass: RecipeModel,
      join: {
        from: 'recipeIngredient.recipeId',
        to: 'recipe.id',
      },
    },
  });
}

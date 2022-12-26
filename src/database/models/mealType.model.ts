import { Model } from 'objection';
import { RecipeModel } from './recipe.model';

export class MealTypeModel extends Model {
  id: number;
  name: string;

  static tableName = 'meal_type';

  static relationMappings = () => ({
    recipes: {
      relation: Model.HasManyRelation,
      modelClass: RecipeModel,
      join: {
        from: 'mealType.id',
        to: 'recipe.mealTypeId',
      },
    },
  });
}

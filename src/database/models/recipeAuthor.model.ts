import { Model } from 'objection';
import { RecipeModel } from './recipe.model';

export class RecipeAuthorModel extends Model {
  id: number;
  firstName: string;
  lastName: string;

  static tableName = 'recipe_author';

  static relationMappings = () => ({
    recipes: {
      relation: Model.HasManyRelation,
      modelClass: RecipeModel,
      join: {
        from: 'recipeAuthor.id',
        to: 'recipe.recipeAuthorId',
      },
    },
  });
}

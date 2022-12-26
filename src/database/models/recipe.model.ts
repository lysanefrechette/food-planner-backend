import { Model } from 'objection';
import { UserModel } from './user.model';
import { MealTypeModel } from './mealType.model';
import { RecipeAuthorModel } from './recipeAuthor.model';
import { GroceriesItemModel } from './groceriesItem.model';
import { MealModel } from './meal.model';
import { RecipeIngredientModel } from './recipeIngredient.model';
import { ImageModel } from './image.model';

export class RecipeModel extends Model {
  id: number;
  title: string;
  directions: string;
  servings: number;
  prepMinutes: number;
  cookMinutes: number;
  presentation: string;
  userId: number;
  mealTypeId: number;
  authorId: number;

  static tableName = 'recipe';

  static relationMappings = () => ({
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: UserModel,
      join: {
        from: 'recipe.userId',
        to: 'user.id',
      },
    },
    mealType: {
      relation: Model.BelongsToOneRelation,
      modelClass: MealTypeModel,
      join: {
        from: 'recipe.mealTypeId',
        to: 'mealType.id',
      },
    },
    author: {
      relation: Model.BelongsToOneRelation,
      modelClass: RecipeAuthorModel,
      join: {
        from: 'recipe.authorId',
        to: 'recipeAuthor.id',
      },
    },
    groceriesItems: {
      relation: Model.HasManyRelation,
      modelClass: GroceriesItemModel,
      join: {
        from: 'recipe.id',
        to: 'groceriesItem.recipeId',
      },
    },
    meals: {
      relation: Model.HasManyRelation,
      modelClass: MealModel,
      join: {
        from: 'recipe.id',
        to: 'meal.recipeId',
      },
    },
    recipeIngredients: {
      relation: Model.HasManyRelation,
      modelClass: RecipeIngredientModel,
      join: {
        from: 'recipe.id',
        to: 'recipeIngredient.recipeId',
      },
    },
    images: {
      relation: Model.ManyToManyRelation,
      modelClass: ImageModel,
      join: {
        from: 'recipe.id',
        through: {
          from: 'recipeImage.recipeId',
          to: 'recipeImage.imageId',
        },
        to: 'image.recipeId',
      },
    },
  });
}

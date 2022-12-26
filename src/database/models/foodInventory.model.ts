import { Model } from 'objection';
import { IngredientModel } from './ingredient.model';
import { MealModel } from './meal.model';
import { MeasurementUnitModel } from './measurementUnit.model';
import { UserModel } from './user.model';
import { GroceriesListModel } from './groceriesList.model';

export class FoodInventoryModel extends Model {
  id: number;
  inventoryDate: Date;
  quantity: number;
  groceriesListId: number;
  ingredientId: number;
  mealId: number;
  measurementUnitId: number;
  userId: number;

  static tableName = 'food_inventory';

  static relationMappings = () => ({
    ingredient: {
      relation: Model.BelongsToOneRelation,
      modelClass: IngredientModel,
      join: {
        from: 'foodInventory.ingredientId',
        to: 'ingredient.id',
      },
    },
    meal: {
      relation: Model.BelongsToOneRelation,
      modelClass: MealModel,
      join: {
        from: 'foodInventory.mealId',
        to: 'meal.id',
      },
    },
    measurementUnit: {
      relation: Model.BelongsToOneRelation,
      modelClass: MeasurementUnitModel,
      join: {
        from: 'foodInventory,measurementUnitId',
        to: 'measurementUnit.id',
      },
    },
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: UserModel,
      join: {
        from: 'foodInventory.userId',
        to: 'user.id',
      },
    },
    groceriesList: {
      relation: Model.BelongsToOneRelation,
      modelClass: GroceriesListModel,
      join: {
        from: 'foodInventory.groceriesListId',
        to: 'groceriesList.id',
      },
    },
  });
}

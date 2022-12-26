import { Model } from 'objection';
import { GroceriesListModel } from './groceriesList.model';
import { IngredientModel } from './ingredient.model';
import { MeasurementUnitModel } from './measurementUnit.model';

export class GroceriesItemModel extends Model {
  id: number;
  groceriesListId: number;
  ingredientId: number;
  measurementUnitId: number;

  static tableName = 'groceries_item';

  static relationMappings = () => ({
    groceriesList: {
      relation: Model.BelongsToOneRelation,
      modelClass: GroceriesListModel,
      join: {
        from: 'groceriesItem.groceriesListId',
        to: 'groceriesItem.id',
      },
    },
    ingredient: {
      relation: Model.BelongsToOneRelation,
      modelClass: IngredientModel,
      join: {
        from: 'groceriesItem.ingredientId',
        to: 'ingredient.id',
      },
    },
    measurementUnit: {
      relation: Model.BelongsToOneRelation,
      modelClass: MeasurementUnitModel,
      join: {
        from: 'groceriesItem.measurementUnitId',
        to: 'measurementUnit.id',
      },
    },
  });
}

import { Model } from 'objection';
import { GroceriesItemModel } from './groceriesItem.model';

export class GroceriesListModel extends Model {
  id: number;
  name: string;
  createdAt: Date;
  modifiedAt: Date;

  static tableName = 'groceries_list';

  static relationMappings = () => ({
    foodInventory: {
      relation: Model.HasManyRelation,
      modelClass: GroceriesListModel,
      join: {
        from: 'groceriesList.id',
        to: 'foodInventory.groceriesListId',
      },
    },
    groceriesItem: {
      relation: Model.HasManyRelation,
      modelClass: GroceriesItemModel,
      join: {
        from: 'groceriesList.id',
        to: 'groceriesItem.groceriesListId',
      },
    },
  });
}

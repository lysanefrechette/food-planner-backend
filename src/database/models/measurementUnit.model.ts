import {Model} from "objection";
import {FoodInventoryModel} from "./foodInventory.model";
import {GroceriesItemModel} from "./groceriesItem.model";
import {RecipeIngredientModel} from "./recipeIngredient.model";

export class MeasurementUnitModel extends Model{
    id: number;
    name: string;

    static tableName = 'measurement_unit';

    static relationMappings = () => ({
        foodInventories: {
            relation: Model.HasManyRelation,
            modelClass: FoodInventoryModel,
            join: {
                from: 'measurementUnit.id',
                to: 'foodInventory.measurementUnitId'
            }
        },
        groceriesItems: {
            relation: Model.HasManyRelation,
            modelClass: GroceriesItemModel,
            join: {
                from: 'measurementUnit.id',
                to: 'groceriesItem.measurementUnitId'
            }
        },
        recipeIngredients: {
            relation: Model.HasManyRelation,
            modelClass: RecipeIngredientModel,
            join: {
                from: 'measurementUnit.id',
                to: 'recipeIngredient.measurementUnitId'
            }
        }
    });
}
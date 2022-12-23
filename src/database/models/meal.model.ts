import {Model} from "objection";
import {MealTypeModel} from "./mealType.model";
import {RecipeModel} from "./recipe.model";
import {TimeOfDayModel} from "./timeOfDay.model";
import {UserModel} from "./user.model";
import {NotificationModel} from "./notification.model";
import {FoodInventoryModel} from "./foodInventory.model";

export class MealModel extends Model{
    id: number;
    mealTypeId: number;
    recipeId: number;
    date: Date;
    dayTimeId: number;
    notificationId: number;
    userId: number;
    sendNotificationAt: Date;
    notificationSent: boolean;

    static tableName = 'meal';

    static relationMappings = () => ({
        mealType: {
            relation: Model.BelongsToOneRelation,
            modelClass: MealTypeModel,
            join: {
                from: 'meal.mealTypeId',
                to: 'mealType.id'
            }
        },
        recipe: {
            relation: Model.BelongsToOneRelation,
            modelClass: RecipeModel,
            join: {
                from: 'meal.recipeId',
                to: 'recipe.id'
            }
        },
        dayTime: {
            relation: Model.BelongsToOneRelation,
            modelClass: TimeOfDayModel,
            join: {
                from: 'meal.dayTimeId',
                to: 'timeOfDay.id'
            }
        },
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: UserModel,
            join: {
                from: 'meal.userId',
                to: 'user.id'
            }
        },
        notification: {
            relation: Model.BelongsToOneRelation,
            modelClass: NotificationModel,
            join: {
                from: 'meal.notificationId',
                to: 'notification.id'
            }
        },
        foodInventory: {
            relation: Model.HasManyRelation,
            modelClass: FoodInventoryModel,
            join: {
                from: 'meal.id',
                to: 'foodInventory.mealId'
            }
        }
    });
}
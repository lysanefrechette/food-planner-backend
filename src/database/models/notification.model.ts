import {Model} from "objection";
import {MealModel} from "./meal.model";

export class NotificationModel extends Model{
    id: number;
    description: string;
    title: string;

    static tableName = 'notification';

    static relationMappings = () => ({
        meals: {
            relation: Model.HasManyRelation,
            modelClass: MealModel,
            join: {
                from: 'notification.id',
                to: 'meal.notificationId'
            }
        }
    });
}
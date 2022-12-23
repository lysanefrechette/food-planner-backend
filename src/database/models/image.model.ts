import {Model} from "objection";
import {UserInfosModel} from "./userInfos.model";
import {RecipeModel} from "./recipe.model";

export class ImageModel extends Model{
    id: number;
    location: string;

    static tableName = 'image';

    static relationMappings = () => ({
        userInfo: {
            relation: Model.HasOneRelation,
            modelClass: UserInfosModel,
            join: {
                from: 'image.id',
                to: 'userInfos.profilePictureId'
            }
        },
        recipes: {
            relation: Model.ManyToManyRelation,
            modelClass: RecipeModel,
            join: {
                from: 'image.id',
                through: {
                    from: 'recipeImage.imageId',
                    to: 'recipeImage.recipeId'
                },
                to: 'recipe.id'
            }
        }
    })

}
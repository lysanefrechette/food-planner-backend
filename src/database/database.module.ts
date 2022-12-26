import { FoodInventoryModel } from './models/foodInventory.model';
import { GroceriesItemModel } from './models/groceriesItem.model';
import { GroceriesListModel } from './models/groceriesList.model';
import { ImageModel } from './models/image.model';
import { IngredientModel } from './models/ingredient.model';
import { MealModel } from './models/meal.model';
import { MealTypeModel } from './models/mealType.model';
import { MeasurementUnitModel } from './models/measurementUnit.model';
import { NotificationModel } from './models/notification.model';
import { RecipeModel } from './models/recipe.model';
import { RecipeImageModel } from './models/recipeImage.model';
import { RecipeIngredientModel } from './models/recipeIngredient.model';
import { RoleModel } from './models/role.model';
import { TimeOfDayModel } from './models/timeOfDay.model';
import { UserModel } from './models/user.model';
import { UserInfosModel } from './models/userInfos.model';
import { RecipeAuthorModel } from './models/recipeAuthor.model';
import { knexSnakeCaseMappers, Model } from 'objection';
import { Knex, knex } from 'knex';
import { Global, Module } from '@nestjs/common';

const models = [
  FoodInventoryModel,
  GroceriesItemModel,
  GroceriesListModel,
  ImageModel,
  IngredientModel,
  MealModel,
  MealTypeModel,
  MeasurementUnitModel,
  NotificationModel,
  RecipeModel,
  RecipeAuthorModel,
  RecipeImageModel,
  RecipeIngredientModel,
  RoleModel,
  TimeOfDayModel,
  UserModel,
  UserInfosModel,
];

const modelProviders = models.map((model) => {
  return {
    provide: model.name,
    useValue: model,
  };
});

const providers = [
  ...modelProviders,
  {
    provide: 'KnexConnection',
    useFactory: async () => {
      const config: Knex.Config = {
        client: 'mysql2',
        connection: process.env.DATABASE_URL,
        debug: process.env.KNEX_DEBUG === 'true',
        ...knexSnakeCaseMappers(),
      };

      Model.knex(knex(config));
      return knex;
    },
  },
];

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class DatabaseModule {}

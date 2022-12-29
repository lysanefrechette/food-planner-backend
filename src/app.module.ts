import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { join } from 'path';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guard/roles.guard';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { JwtStrategy } from './auth/strategy/jwt.strategy';
import { AuthModule } from './auth/auth.module';
import { ImageService } from './image/image.service';
import { RoleService } from './role/role.service';
import { UserInfosService } from './user-infos/user-infos.service';
import { ImageModule } from './image/image.module';
import { RoleModule } from './role/role.module';
import { UserInfosModule } from './user-infos/user-infos.module';
import { MeasurementUnitController } from './measurement-unit/measurement-unit.controller';
import { MeasurementUnitModule } from './measurement-unit/measurement-unit.module';
import { TimeOfDayModule } from './time-of-day/time-of-day.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { MealTypeModule } from './meal-type/meal-type.module';
import { RecipeAuthorModule } from './recipe-author/recipe-author.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ImageModule,
    RoleModule,
    UserInfosModule,
    MeasurementUnitModule,
    TimeOfDayModule,
    IngredientModule,
    MealTypeModule,
    RecipeAuthorModule,
  ],
  controllers: [AppController, MeasurementUnitController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    JwtStrategy,
    ImageService,
    RoleService,
    UserInfosService,
  ],
})
export class AppModule {}

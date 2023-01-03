import { Module } from '@nestjs/common';
import { IngredientController } from './ingredient.controller';
import { IngredientService } from './ingredient.service';
import { MulterModule } from '@nestjs/platform-express';
import { ImageModule } from '../image/image.module';

@Module({
  controllers: [IngredientController],
  providers: [IngredientService],
  exports: [IngredientService],
  imports: [
    MulterModule.register({ dest: './assets/images/ingredient' }),
    ImageModule,
  ],
})
export class IngredientModule {}

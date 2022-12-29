import { Module } from '@nestjs/common';
import { RecipeAuthorController } from './recipe-author.controller';
import { RecipeAuthorService } from './recipe-author.service';

@Module({
  controllers: [RecipeAuthorController],
  providers: [RecipeAuthorService],
  exports: [RecipeAuthorService],
})
export class RecipeAuthorModule {}

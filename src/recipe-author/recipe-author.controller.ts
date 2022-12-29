import { Controller, Get } from '@nestjs/common';
import { RecipeAuthorService } from './recipe-author.service';
import { RecipeAuthorModel } from '../database/models/recipeAuthor.model';

@Controller('recipe-author')
export class RecipeAuthorController {
  constructor(private recipeAuthorService: RecipeAuthorService) {}

  @Get()
  async getAll(): Promise<RecipeAuthorModel[]> {
    return this.recipeAuthorService.getAll();
  }
}

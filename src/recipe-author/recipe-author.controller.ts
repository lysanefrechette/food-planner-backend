import { Body, Controller, Get, Post } from '@nestjs/common';
import { RecipeAuthorService } from './recipe-author.service';
import { RecipeAuthorModel } from '../database/models/recipeAuthor.model';
import { CreateRecipeAuthorDto } from '../dto/create-recipe-author-dto';

@Controller('recipe-author')
export class RecipeAuthorController {
  constructor(private recipeAuthorService: RecipeAuthorService) {}

  @Get()
  async getAll(): Promise<RecipeAuthorModel[]> {
    return this.recipeAuthorService.getAll();
  }

  @Post()
  async create(@Body() dto: CreateRecipeAuthorDto): Promise<RecipeAuthorModel> {
    return this.recipeAuthorService.create(dto);
  }
}

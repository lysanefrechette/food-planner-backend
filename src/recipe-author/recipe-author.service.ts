import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { RecipeAuthorModel } from '../database/models/recipeAuthor.model';
import { CreateRecipeAuthorDto } from '../dto/create-recipe-author-dto';

@Injectable()
export class RecipeAuthorService {
  constructor(
    @Inject('RecipeAuthorModel')
    private modelClass: ModelClass<RecipeAuthorModel>,
  ) {}

  async getAll(): Promise<RecipeAuthorModel[]> {
    return this.modelClass.query();
  }

  async create(dto: CreateRecipeAuthorDto): Promise<RecipeAuthorModel> {
    return this.modelClass.query().insert({
      ...dto,
    });
  }
}

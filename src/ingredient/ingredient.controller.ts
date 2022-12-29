import { Controller, Get } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { IngredientModel } from '../database/models/ingredient.model';

@Controller('ingredient')
export class IngredientController {
  constructor(private ingredientService: IngredientService) {}

  @Get()
  async getAll(): Promise<IngredientModel[]> {
    return this.ingredientService.getAll();
  }
}

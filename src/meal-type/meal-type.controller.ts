import { Controller, Get } from '@nestjs/common';
import { MealTypeService } from './meal-type.service';
import { MealTypeModel } from '../database/models/mealType.model';

@Controller('meal-type')
export class MealTypeController {
  constructor(private mealTypeService: MealTypeService) {}

  @Get()
  async getAll(): Promise<MealTypeModel[]> {
    return this.mealTypeService.getAll();
  }
}

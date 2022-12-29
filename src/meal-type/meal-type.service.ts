import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { MealTypeModel } from '../database/models/mealType.model';

@Injectable()
export class MealTypeService {
  constructor(
    @Inject('MealTypeModel') private modelClass: ModelClass<MealTypeModel>,
  ) {}

  async getAll(): Promise<MealTypeModel[]> {
    return this.modelClass.query();
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { IngredientModel } from '../database/models/ingredient.model';

@Injectable()
export class IngredientService {
  constructor(
    @Inject('IngredientModel') private modelClass: ModelClass<IngredientModel>,
  ) {}

  async getAll(): Promise<IngredientModel[]> {
    return this.modelClass.query();
  }
}

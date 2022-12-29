import { Inject, Injectable, Logger } from '@nestjs/common';
import { ModelClass } from 'objection';
import { MeasurementUnitModel } from '../database/models/measurementUnit.model';

@Injectable()
export class MeasurementUnitService {
  constructor(
    @Inject('MeasurementUnitModel')
    private modelClass: ModelClass<MeasurementUnitModel>,
  ) {}

  async getAll(): Promise<MeasurementUnitModel[]> {
    return this.modelClass.query();
  }
}

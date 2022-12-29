import { Controller, Get } from '@nestjs/common';
import { MeasurementUnitService } from './measurement-unit.service';
import { MeasurementUnitModel } from '../database/models/measurementUnit.model';

@Controller('measurement-unit')
export class MeasurementUnitController {
  constructor(private measurementUnitService: MeasurementUnitService) {}
  @Get()
  async getAll(): Promise<MeasurementUnitModel[]> {
    return this.measurementUnitService.getAll();
  }
}

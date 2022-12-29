import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { TimeOfDayModel } from '../database/models/timeOfDay.model';

@Injectable()
export class TimeOfDayService {
  constructor(
    @Inject('TimeOfDayModel') private modelClass: ModelClass<TimeOfDayModel>,
  ) {}

  async getAll(): Promise<TimeOfDayModel[]> {
    return this.modelClass.query();
  }
}

import { Controller, Get } from '@nestjs/common';
import { TimeOfDayService } from './time-of-day.service';
import { TimeOfDayModel } from '../database/models/timeOfDay.model';

@Controller('time-of-day')
export class TimeOfDayController {
  constructor(private timeOfDayService: TimeOfDayService) {}

  @Get()
  async getAll(): Promise<TimeOfDayModel[]> {
    return this.timeOfDayService.getAll();
  }
}

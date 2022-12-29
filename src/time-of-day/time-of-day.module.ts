import { Module } from '@nestjs/common';
import { TimeOfDayController } from './time-of-day.controller';
import { TimeOfDayService } from './time-of-day.service';

@Module({
  controllers: [TimeOfDayController],
  providers: [TimeOfDayService],
  exports: [TimeOfDayService],
})
export class TimeOfDayModule {}

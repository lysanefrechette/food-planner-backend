import { Test, TestingModule } from '@nestjs/testing';
import { TimeOfDayController } from './time-of-day.controller';

describe('TimeOfDayController', () => {
  let controller: TimeOfDayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimeOfDayController],
    }).compile();

    controller = module.get<TimeOfDayController>(TimeOfDayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

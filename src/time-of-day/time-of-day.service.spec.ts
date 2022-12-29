import { Test, TestingModule } from '@nestjs/testing';
import { TimeOfDayService } from './time-of-day.service';

describe('TimeOfDayService', () => {
  let service: TimeOfDayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimeOfDayService],
    }).compile();

    service = module.get<TimeOfDayService>(TimeOfDayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

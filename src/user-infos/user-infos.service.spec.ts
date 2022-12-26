import { Test, TestingModule } from '@nestjs/testing';
import { UserInfosService } from './user-infos.service';

describe('UserInfosService', () => {
  let service: UserInfosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserInfosService],
    }).compile();

    service = module.get<UserInfosService>(UserInfosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

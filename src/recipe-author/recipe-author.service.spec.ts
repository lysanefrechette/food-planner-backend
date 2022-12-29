import { Test, TestingModule } from '@nestjs/testing';
import { RecipeAuthorService } from './recipe-author.service';

describe('RecipeAuthorService', () => {
  let service: RecipeAuthorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecipeAuthorService],
    }).compile();

    service = module.get<RecipeAuthorService>(RecipeAuthorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

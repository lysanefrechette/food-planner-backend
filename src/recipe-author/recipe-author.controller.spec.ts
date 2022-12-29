import { Test, TestingModule } from '@nestjs/testing';
import { RecipeAuthorController } from './recipe-author.controller';

describe('RecipeAuthorController', () => {
  let controller: RecipeAuthorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipeAuthorController],
    }).compile();

    controller = module.get<RecipeAuthorController>(RecipeAuthorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

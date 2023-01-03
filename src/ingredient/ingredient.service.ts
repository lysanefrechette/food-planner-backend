import { Inject, Injectable, Logger } from '@nestjs/common';
import Objection, { ModelClass } from 'objection';
import { IngredientModel } from '../database/models/ingredient.model';
import { CreateIngredientDto } from '../dto/create-ingredient-dto';
import { ImageModel } from '../database/models/image.model';
import { IngredientEntity } from '../entities/ingredient.entity';
import { ImageService } from '../image/image.service';
import { UpdateIngredientDto } from '../dto/update-ingredient-dto';

@Injectable()
export class IngredientService {
  private readonly logger: Logger = new Logger();
  constructor(
    @Inject('IngredientModel') private modelClass: ModelClass<IngredientModel>,
    private readonly imageService: ImageService,
  ) {}

  findById(
    id: number,
  ): Objection.QueryBuilder<IngredientModel, IngredientModel> {
    const ingredient = this.modelClass.query().findById(id);
    if (ingredient) {
      return ingredient;
    }
    this.logger.error('Ingredient does not exist');
    return null;
  }
  async getAll(): Promise<IngredientModel[]> {
    return this.modelClass.query();
  }

  async create(
    dto: CreateIngredientDto,
    image?: Express.Multer.File,
  ): Promise<IngredientEntity> {
    try {
      return await ImageModel.transaction(async () => {
        let ingredientModel;
        if (image) {
          const imagePath = await ImageModel.query().insert({
            location: image.path,
          });
          ingredientModel = await this.modelClass
            .query()
            .insert({ ...dto, imageId: imagePath.id });
        } else {
          ingredientModel = await this.modelClass.query().insert({ ...dto });
        }
        return this.getDetail(ingredientModel.id);
      });
    } catch (err) {
      this.logger.error(
        `An error occurred while creating the ingredient. ${err}`,
      );
      return null;
    }
  }

  async update(
    id: number,
    dto: UpdateIngredientDto,
    image?: Express.Multer.File,
  ): Promise<IngredientEntity> {
    try {
      return await this.modelClass.transaction(async () => {
        let ingredientModel;
        if (image) {
          const imagePath = await ImageModel.query().insert({
            location: image.path,
          });
          ingredientModel = await this.modelClass
            .query()
            .patchAndFetchById(id, {
              imageId: imagePath.id,
              ...dto,
            });
        } else {
          ingredientModel = await this.modelClass
            .query()
            .patchAndFetchById(id, {
              ...dto,
            });
        }
        return this.getDetail(ingredientModel.id);
      });
    } catch (err) {
      this.logger.error(
        `An error occurred while trying to update the ingredient. ${err}`,
      );
      return null;
    }
  }

  async getDetail(id: number): Promise<IngredientEntity> {
    const ingredient = await this.findById(id).withGraphFetched('image');
    if (ingredient) {
      const image = this.imageService.getBase64Image(ingredient.image.location);
      return new IngredientEntity({
        image: image,
        name: ingredient.name,
        description: ingredient.description,
        id: ingredient.id,
      });
    }
  }
}

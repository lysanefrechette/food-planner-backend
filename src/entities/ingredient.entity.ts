import { Exclude } from 'class-transformer';

export class IngredientEntity {
  id: number;
  name: string;
  description: string;
  image: string;

  @Exclude()
  imageId: number;
  constructor(partial: Partial<IngredientEntity>) {
    Object.assign(this, partial);
  }
}

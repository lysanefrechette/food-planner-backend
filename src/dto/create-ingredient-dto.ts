import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateIngredientDto {
  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
  name: string;

  @IsString()
  description: string;
}

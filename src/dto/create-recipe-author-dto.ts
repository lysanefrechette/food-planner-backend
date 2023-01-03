import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateRecipeAuthorDto {
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  lastName: string;
}

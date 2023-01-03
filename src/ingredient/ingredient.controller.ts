import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  UploadedFile,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { IngredientModel } from '../database/models/ingredient.model';
import { CreateIngredientDto } from '../dto/create-ingredient-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { getUniqueFileName } from '../image/constants';
import { DeleteFileOnErrorFilter } from '../filters/delete-file-on-error-filter';
import { IngredientEntity } from '../entities/ingredient.entity';
import { UpdateIngredientDto } from '../dto/update-ingredient-dto';

@Controller('ingredient')
export class IngredientController {
  constructor(private ingredientService: IngredientService) {}

  @Get()
  async getAll(): Promise<IngredientModel[]> {
    return this.ingredientService.getAll();
  }

  @Get(':ingredientId')
  async retrieve(@Param('ingredientId') id: number): Promise<IngredientEntity> {
    return this.ingredientService.getDetail(id);
  }

  @Patch(':ingredientId')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './assets/images/ingredient',
        filename: getUniqueFileName,
      }),
    }),
  )
  async update(
    @Param('ingredientId') id: number,
    @Body() dto: UpdateIngredientDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' })],
        fileIsRequired: false,
      }),
    )
    image?: Express.Multer.File,
  ): Promise<IngredientEntity> {
    return this.ingredientService.update(id, dto, image);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './assets/images/ingredient',
        filename: getUniqueFileName,
      }),
    }),
  )
  @UseFilters(DeleteFileOnErrorFilter)
  async create(
    @Body() dto: CreateIngredientDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' })],
        fileIsRequired: false,
      }),
    )
    image?: Express.Multer.File,
  ): Promise<IngredientEntity> {
    return this.ingredientService.create(dto, image);
  }
}

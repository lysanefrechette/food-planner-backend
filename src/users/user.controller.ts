import {
  Body,
  ClassSerializerInterceptor,
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
import { UsersService } from './users.service';
import { CreateUserDto } from '../dto/create-user-dto';
import { UserEntity } from '../entities/user.entity';
import { UserListObjectEntity } from '../entities/user-list-object.entity';
import { UpdateUserDto } from '../dto/update-user-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { getUniqueFileName } from '../image/constant';
import { DeleteFileOnErrorFilter } from '../filters/delete-file-on-error-filter';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get(':userId')
  async retrieve(@Param('userId') userId): Promise<UserEntity> {
    return await this.userService.getUserDetails(userId);
  }

  @Get()
  async getAll(): Promise<UserListObjectEntity[]> {
    return await this.userService.getAll();
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.userService.createUser(createUserDto);
  }

  @Patch(':userId/profile-picture')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './assets/images/profile-pictures',
        filename: getUniqueFileName,
      }),
    }),
  )
  @UseFilters(new DeleteFileOnErrorFilter())
  async uploadProfilePicture(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' })],
      }),
    )
    image: Express.Multer.File,
    @Param('userId') userId,
  ): Promise<UserEntity> {
    return this.userService.saveImagePathToDatabase(userId, image);
  }

  @Patch(':userId')
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Param('userId') userId,
  ): Promise<UserEntity> {
    return await this.userService.updateUser(updateUserDto, userId);
  }
}

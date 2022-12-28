import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../dto/create-user-dto';
import { UserEntity } from '../entities/user.entity';
import { UserListObjectEntity } from '../entities/user-list-object.entity';

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
}

import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':userId')
  async retrieve(@Param('userId') userId) {
    return await this.userService.getUserDetails(userId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAll() {
    return await this.userService.getAll();
  }
}

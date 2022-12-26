import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserController } from './user.controller';
import { ImageModule } from '../image/image.module';
import { UserInfosModule } from '../user-infos/user-infos.module';
import { RoleModule } from '../role/role.module';

@Module({
  providers: [UsersService],
  imports: [ImageModule, UserInfosModule, RoleModule],
  exports: [UsersService],
  controllers: [UserController],
})
export class UsersModule {}

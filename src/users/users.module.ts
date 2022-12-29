import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserController } from './user.controller';
import { ImageModule } from '../image/image.module';
import { UserInfosModule } from '../user-infos/user-infos.module';
import { RoleModule } from '../role/role.module';
import { IsUsernameAlreadyInUseConstraint } from '../validation/is-username-already-in-use';
import { IsEmailAlreadyInUseConstraint } from '../validation/is-email-already-in-use';
import { RoleExist } from '../validation/role-exist';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  providers: [
    UsersService,
    IsUsernameAlreadyInUseConstraint,
    IsEmailAlreadyInUseConstraint,
    RoleExist,
  ],
  imports: [
    ImageModule,
    UserInfosModule,
    RoleModule,
    MulterModule.register({ dest: './assets/images/profile-pictures' }),
  ],
  exports: [UsersService],
  controllers: [UserController],
})
export class UsersModule {}

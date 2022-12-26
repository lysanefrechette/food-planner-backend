import { Module } from '@nestjs/common';
import { UserInfosService } from './user-infos.service';

@Module({
  providers: [UserInfosService],
  exports: [UserInfosService],
})
export class UserInfosModule {}

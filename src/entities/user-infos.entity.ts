import { UserEntity } from './user.entity';
import { Exclude } from 'class-transformer';

export class UserInfosEntity {
  id: number;

  firstName: string;

  lastName: string;

  @Exclude()
  profilePictureId: number;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}

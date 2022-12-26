import { UserEntity } from './user.entity';
import { Exclude } from 'class-transformer';
import { ImageModel } from '../database/models/image.model';

export class UserInfosEntity {
  id: number;

  firstName: string;

  lastName: string;

  @Exclude()
  profilePictureId: number;

  @Exclude()
  profilePicture: ImageModel;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}

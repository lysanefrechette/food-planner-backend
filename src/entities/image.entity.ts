import { UserEntity } from './user.entity';

export class ImageEntity {
  id: number;
  location: string;
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}

import { UserEntity } from './user.entity';
import { Exclude, Transform } from 'class-transformer';
import { RoleEntity } from './role.entity';

export class UserListObjectEntity {
  id: number;
  username: string;
  email: string;

  @Exclude()
  password: string;

  @Exclude()
  roleId: number;

  @Exclude()
  userInfosId: number;

  @Exclude()
  lastLogin: Date;
  isActive: number;

  @Exclude()
  dateJoined: Date;

  @Transform(({ value }) => value.name)
  role: RoleEntity;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}

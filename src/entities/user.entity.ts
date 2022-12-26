import { Exclude } from 'class-transformer';
import { RoleEntity } from './role.entity';
import { UserInfosEntity } from './user-infos.entity';
export class UserEntity {
  id: number;
  username: string;
  email: string;

  @Exclude()
  password: string;

  @Exclude()
  roleId: number;

  @Exclude()
  userInfosId: number;
  lastLogin: Date;
  isActive: number;
  dateJoined: Date;
  userInfos: UserInfosEntity;
  role: RoleEntity;

  image: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}

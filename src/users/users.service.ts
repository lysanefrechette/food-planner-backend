import {
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ModelClass } from 'objection';
import { UserModel } from '../database/models/user.model';
import { RoleService } from '../role/role.service';
import { UserInfosService } from '../user-infos/user-infos.service';
import { ImageService } from '../image/image.service';
import { UserEntity } from '../entities/user.entity';
import { RoleEntity } from '../entities/role.entity';
import { UserInfosEntity } from '../entities/user-infos.entity';
import { UserListObjectEntity } from '../entities/user-list-object.entity';

@Injectable()
export class UsersService {
  private readonly logger: Logger;

  constructor(
    @Inject('UserModel') private modelClass: ModelClass<UserModel>,
    private readonly roleService: RoleService,
    private readonly userInfosService: UserInfosService,
    private readonly imageService: ImageService,
  ) {}

  findOne(username: string) {
    const user = this.modelClass.query().findOne('username', '=', username);
    if (user == undefined) {
      this.logger.error('User does not exist');
      return null;
    } else {
      return user;
    }
  }

  findById(id: number) {
    const user = this.modelClass.query().findById(id);
    if (user) {
      return user;
    }
    this.logger.error('User does not exist');
    return null;
  }

  async getUserDetails(userId: number) {
    const user = await this.findById(userId).withGraphFetched(
      '[role, userInfos, userInfos.profilePicture]',
    );
    const image = this.imageService.getBase64Image(
      user.userInfos.profilePicture.location,
    );
    return new UserEntity({
      ...user,
      image: image,
      role: new RoleEntity(user.role),
      userInfos: new UserInfosEntity(user.userInfos),
    });
  }

  async getAll() {
    const users = await this.modelClass.query().withGraphJoined('role');
    if (users) {
      return users.map(
        (u) =>
          new UserListObjectEntity({
            ...u,
            role: new RoleEntity(u.role),
          }),
      );
    }
    return [];
  }
}

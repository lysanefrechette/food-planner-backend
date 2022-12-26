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
    const user = await this.findById(userId);
    const role = await this.roleService.getRoleById(user.roleId);
    const userInfos = await this.userInfosService.getUserInfosById(
      user.userInfosId,
    );
    const imageObj = await this.imageService.getImageById(
      userInfos.profilePictureId,
    );
    const image = this.imageService.getBase64Image(imageObj.location);
    return new UserEntity({
      ...user,
      image: image,
      role: new RoleEntity(role),
      userInfos: new UserInfosEntity(userInfos),
    });
  }
}

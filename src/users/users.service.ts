import { Inject, Injectable, Logger } from '@nestjs/common';
import Objection, { ModelClass } from 'objection';
import { UserModel } from '../database/models/user.model';
import { RoleService } from '../role/role.service';
import { UserInfosService } from '../user-infos/user-infos.service';
import { ImageService } from '../image/image.service';
import { UserEntity } from '../entities/user.entity';
import { RoleEntity } from '../entities/role.entity';
import { UserInfosEntity } from '../entities/user-infos.entity';
import { UserListObjectEntity } from '../entities/user-list-object.entity';
import { CreateUserDto } from '../dto/create-user-dto';
import { UserInfosModel } from '../database/models/userInfos.model';
import * as argon2 from 'argon2';
import { UpdateUserDto } from '../dto/update-user-dto';
import { ImageModel } from '../database/models/image.model';
import * as fs from 'fs';

@Injectable()
export class UsersService {
  private readonly logger: Logger;

  constructor(
    @Inject('UserModel') private modelClass: ModelClass<UserModel>,
    private readonly roleService: RoleService,
    private readonly userInfosService: UserInfosService,
    private readonly imageService: ImageService,
  ) {}

  findByUsername(
    username: string,
  ): Objection.QueryBuilder<UserModel, UserModel> {
    const user = this.modelClass.query().findOne('username', '=', username);
    if (user == undefined) {
      this.logger.error('User does not exist');
      return null;
    } else {
      return user;
    }
  }

  findById(id: number): Objection.QueryBuilder<UserModel, UserModel> {
    const user = this.modelClass.query().findById(id);
    if (user) {
      return user;
    }
    this.logger.error('User does not exist');
    return null;
  }

  findByEmail(email: string): Objection.QueryBuilder<UserModel, UserModel> {
    const user = this.modelClass.query().findOne('email', '=', email);
    if (user) {
      return user;
    }
    this.logger.error('User does not exist');
    return null;
  }

  async getUserDetails(userId: number): Promise<UserEntity> {
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

  async getAll(): Promise<UserListObjectEntity[]> {
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

  async saveImagePathToDatabase(
    userId: number,
    image: Express.Multer.File,
  ): Promise<UserEntity> {
    try {
      return await ImageModel.transaction(async () => {
        const imagePath = await ImageModel.query().insert({
          location: image.path,
        });
        const user = await this.findById(userId).withGraphFetched(
          '[role, userInfos, userInfos.profilePicture]',
        );
        const userInfos = await UserInfosModel.query()
          .patchAndFetchById(user.userInfosId, {
            profilePictureId: imagePath.id,
          })
          .withGraphFetched('profilePicture');
        const base64Image = this.imageService.getBase64Image(
          userInfos.profilePicture.location,
        );
        return new UserEntity({
          ...user,
          image: base64Image,
          role: new RoleEntity(user.role),
          userInfos: new UserInfosEntity(user.userInfos),
        });
      });
    } catch (err) {
      this.logger.error(
        'An error occurred while uploading the profile picture.',
      );
      return null;
    }
  }

  async createUser(dto: CreateUserDto): Promise<UserEntity> {
    try {
      return await UserInfosModel.transaction(async () => {
        const userInfos = await UserInfosModel.query().insert({
          firstName: dto.firstName,
          lastName: dto.lastName,
          profilePictureId: 1,
        });
        const user = await this.modelClass.query().insert({
          username: dto.username,
          email: dto.email,
          isActive: dto.isActive,
          roleId: dto.roleId,
          password: await argon2.hash(dto.password),
          dateJoined: new Date(),
          userInfosId: userInfos.id,
          lastLogin: null,
        });
        return new UserEntity({
          ...user,
          role: new RoleEntity(await this.roleService.getRoleById(user.roleId)),
          userInfos: new UserInfosEntity(userInfos),
        });
      });
    } catch (err) {
      this.logger.error('An error occurred while creating the user.');
      return null;
    }
  }
  async updateUser(dto: UpdateUserDto, userId: number): Promise<UserEntity> {
    try {
      return await this.modelClass.transaction(async () => {
        const { username, password, roleId, email, isActive } = dto;
        const dtoUser = { username, password, roleId, email, isActive };
        const user = await this.modelClass.query().patchAndFetchById(userId, {
          ...dtoUser,
        });
        const { firstName, lastName } = dto;
        const userInfosDto = { firstName, lastName };
        let userInfos = await UserInfosModel.query().patchAndFetchById(
          user.userInfosId,
          { ...userInfosDto },
        );
        if (!userInfos) {
          userInfos = await UserInfosModel.query().findById(user.userInfosId);
        }
        return new UserEntity({
          ...user,
          role: new RoleEntity(await this.roleService.getRoleById(user.roleId)),
          userInfos: new UserInfosEntity(userInfos),
        });
      });
    } catch (err) {
      this.logger.error('An error occurred while updating the user');
      return null;
    }
  }
}

import { Inject, Injectable, Logger } from '@nestjs/common';
import { ModelClass } from 'objection';
import { UserInfosModel } from '../database/models/userInfos.model';

@Injectable()
export class UserInfosService {
  private readonly logger: Logger = new Logger();
  constructor(
    @Inject('UserInfosModel') private modelClass: ModelClass<UserInfosModel>,
  ) {}

  getUserInfosById(id: number) {
    const userInfos = this.modelClass.query().findById(id);
    if (userInfos) {
      return userInfos;
    }
    this.logger.error("User Infos don't exist");
    return null;
  }
}

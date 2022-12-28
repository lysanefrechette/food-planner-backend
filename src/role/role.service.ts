import { Inject, Injectable, Logger } from '@nestjs/common';
import Objection, { ModelClass } from 'objection';
import { RoleModel } from '../database/models/role.model';

@Injectable()
export class RoleService {
  private readonly logger: Logger;
  constructor(@Inject('RoleModel') private modelClass: ModelClass<RoleModel>) {}
  getRoleById(id: number): Objection.QueryBuilder<RoleModel, RoleModel> {
    const role = this.modelClass.query().findById(id);
    if (role) {
      return role;
    }
    this.logger.error('Role does not exist');
    return null;
  }
}

import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { RoleService } from '../role/role.service';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ async: true })
@Injectable()
export class RoleExist implements ValidatorConstraintInterface {
  constructor(private readonly roleService: RoleService) {}

  validate(
    roleId: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    return this.roleService.getRoleById(roleId).then((role) => role != null);
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'The role does not exist';
  }
}

export function IsRoleExist(
  validationOptions?: ValidationOptions,
): (object: object, propertyName: string) => void {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: RoleExist,
    });
  };
}

import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from '../users/users.service';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUsernameAlreadyInUseConstraint
  implements ValidatorConstraintInterface
{
  constructor(protected readonly userService: UsersService) {}
  validate(username: string, args: ValidationArguments): Promise<boolean> {
    return this.userService.findByUsername(username).then((user) => !user);
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `The username ${validationArguments.value} is already used.`;
  }
}

export function IsUsernameAlreadyInUse(
  validationOptions?: ValidationOptions,
): (object: object, propertyName: string) => void {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUsernameAlreadyInUseConstraint,
    });
  };
}

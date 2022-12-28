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
export class IsEmailAlreadyInUseConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly userService: UsersService) {}
  validate(
    email: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    return this.userService.findByEmail(email).then((user) => !user);
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `The email ${validationArguments.value} is already used.`;
  }
}

export function IsEmailAlreadyInUse(
  validationOptions?: ValidationOptions,
): (object: object, propertyName: string) => void {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailAlreadyInUseConstraint,
    });
  };
}

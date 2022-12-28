import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';
import { IsUsernameAlreadyInUse } from '../validation/is-username-already-in-use';
import { IsEmailAlreadyInUse } from '../validation/is-email-already-in-use';
import { IsRoleExist } from '../validation/role-exist';

export class CreateUserDto {
  @IsNotEmpty()
  @MaxLength(150)
  @IsUsernameAlreadyInUse()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;

  @IsEmailAlreadyInUse()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsNotEmpty()
  @IsInt()
  isActive: number;

  @IsNotEmpty()
  @IsInt()
  @IsRoleExist()
  roleId: number;

  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
  last_name: string;
}

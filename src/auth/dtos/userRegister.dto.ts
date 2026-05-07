import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  IsArray,
  IsEnum,
} from 'class-validator';

import { UserRole } from '../../users/users.entity';

export class RegisterUserDto {
  @IsNotEmpty()
  @IsArray({ message: 'roles should be array' })
  @IsEnum(UserRole, { each: true })
  roles: UserRole[];

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100, { message: 'email max length is 100' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100, { message: 'password max length is 100' })
  password: string;
}

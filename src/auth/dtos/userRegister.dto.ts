import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  IsArray,
  IsEnum,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../users/users.entity';

export class RegisterUserDto {
  @ApiProperty({
    description: 'List of user roles assigned during registration',
    enum: UserRole,
    isArray: true,
    example: [
      UserRole.ADMIN,
      UserRole.EMPLOYEE,
      UserRole.HR_MANAGER,
      UserRole.FINANCE_OFFICER,
    ],
    default: [],
  })
  @IsNotEmpty()
  @IsArray({ message: 'roles should be array' })
  @IsEnum(UserRole, { each: true })
  roles: UserRole[] = [];

  @ApiProperty({
    description: 'User email address (must be unique)',
    example: 'user@example.com',
    maxLength: 100,
  })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100, { message: 'email max length is 100' })
  email!: string;

  @ApiProperty({
    description: 'Account password (hashed later in service layer)',
    example: 'StrongP@ssw0rd123',
    maxLength: 100,
    minLength: 6,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100, { message: 'password max length is 100' })
  password!: string;
}

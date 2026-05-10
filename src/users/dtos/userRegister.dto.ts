import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  IsArray,
  IsEnum,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../users.entity';

export class RegisterUserDto {
  @ApiProperty({
    description: 'List of roles assigned to the user',
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
    description: 'User email address',
    example: 'user@example.com',
    maxLength: 100,
  })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100, { message: 'email max length is 100' })
  email!: string;

  @ApiProperty({
    description: 'User password (should be hashed in service layer)',
    example: 'StrongP@ssw0rd123',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100, { message: 'password max length is 100' })
  password!: string;
}

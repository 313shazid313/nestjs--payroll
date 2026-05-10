import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'Registered user email address',
    example: 'user@example.com',
    maxLength: 100,
  })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100, { message: 'email max length is 100' })
  email!: string;

  @ApiProperty({
    description: 'User account password',
    example: 'StrongP@ssw0rd123',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100, { message: 'password max length is 100' })
  password!: string;
}

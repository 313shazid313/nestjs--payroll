import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100, { message: 'email max length is 100' })
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100, { message: 'password max length is 100' })
  password!: string;
}

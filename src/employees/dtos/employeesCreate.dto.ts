import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  IsDate,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class EmployeeCreateDto {
  @ApiProperty({
    description: 'Name of the employee',
    example: 'John Doe',
    maxLength: 100,
  })
  @IsNotEmpty({ message: 'name is required' })
  @IsString({ message: 'name must be a string' })
  @MaxLength(100, { message: 'name max length is 100' })
  name!: string;

  @ApiProperty({
    description: 'Email address of the employee',
    example: 'john.doe@example.com',
    maxLength: 100,
  })
  @IsEmail({}, { message: 'email must be a valid email address' })
  @IsNotEmpty({ message: 'email is required' })
  @MaxLength(100, { message: 'email max length is 100' })
  email!: string;

  @ApiProperty({
    description: 'Phone number of the employee',
    example: '+8801712345678',
    maxLength: 20,
  })
  @IsString({ message: 'phone must be a string' })
  @IsNotEmpty({ message: 'phone is required' })
  @MaxLength(20, { message: 'phone max length is 20' })
  phone!: string;

  @ApiProperty({
    description: 'Date when the employee joined',
    example: '2026-05-10',
    type: String,
    format: 'date',
  })
  @IsNotEmpty({ message: 'joiningDate is required' })
  @IsDate({ message: 'joiningDate must be a valid date' })
  @Type(() => Date)
  joiningDate!: Date;

  @ApiProperty({
    description: 'Department ID the employee belongs to',
    example: 1,
  })
  @IsNotEmpty({ message: 'department_id is required' })
  @IsNumber({}, { message: 'department_id must be a number' })
  department_id!: number;

  @ApiProperty({
    description: 'Base salary of the employee',
    example: 50000,
  })
  @IsNotEmpty({ message: 'base_salary is required' })
  @IsNumber({}, { message: 'base_salary must be a number' })
  base_salary!: number;

  @ApiProperty({
    description: 'Employee active status',
    example: true,
  })
  @IsNotEmpty({ message: 'status is required' })
  @IsBoolean({ message: 'status must be a boolean value' })
  status!: boolean;
}

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  IsDate,
  IsBoolean,
} from 'class-validator';

export class EmployeeCreateDto {
  @ApiProperty({ name: 'name', description: 'Name of the employee' })
  @IsNotEmpty({ message: 'name is required' })
  @MaxLength(100, { message: 'name max length is 100' })
  name!: string;

  @ApiProperty({ name: 'email', description: 'Email of the employee' })
  @IsEmail({}, { message: 'email must be a valid email address' })
  @IsNotEmpty({ message: 'email is required' })
  @MaxLength(100, { message: 'email max length is 100' })
  email!: string;

  @ApiProperty({ name: 'phone', description: 'Phone number of the employee' })
  @IsString({ message: 'phone must be a string' })
  @IsNotEmpty({ message: 'phone is required' })
  @MaxLength(100, { message: 'phone max length is 100' })
  phone!: string;

  @ApiProperty({
    name: 'joiningDate',
    description: 'Date when the employee joined',
  })
  @IsNotEmpty({ message: 'joiningDate is required' })
  @IsDate({ message: 'joiningDate must be a valid date' })
  @Type(() => Date)
  joiningDate!: Date;

  @ApiProperty({
    name: 'department_id',
    description: 'ID of the department the employee belongs to',
  })
  @IsNotEmpty({ message: 'department_id is required' })
  department_id!: number;

  @ApiProperty({
    name: 'base_salary',
    description: 'Base salary of the employee',
  })
  @IsNotEmpty({ message: 'base_salary is required' })
  base_salary!: number;

  @ApiProperty({
    name: 'status',
    description: 'Whether the employee is active or not',
  })
  @IsNotEmpty({ message: 'status is required' })
  @IsBoolean({ message: 'status must be a boolean value' })
  status!: boolean;
}

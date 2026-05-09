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
  @IsNotEmpty({ message: 'name is required' })
  @MaxLength(100, { message: 'name max length is 100' })
  name!: string;

  @IsEmail({}, { message: 'email must be a valid email address' })
  @IsNotEmpty({ message: 'email is required' })
  @MaxLength(100, { message: 'email max length is 100' })
  email!: string;

  @IsString({ message: 'phone must be a string' })
  @IsNotEmpty({ message: 'phone is required' })
  @MaxLength(100, { message: 'phone max length is 100' })
  phone!: string;

  @IsNotEmpty({ message: 'joiningDate is required' })
  @IsDate({ message: 'joiningDate must be a valid date' })
  @Type(() => Date)
  joiningDate!: Date;

  @IsNotEmpty({ message: 'department_id is required' })
  department_id!: number;

  @IsNotEmpty({ message: 'base_salary is required' })
  base_salary!: number;

  @IsNotEmpty({ message: 'status is required' })
  @IsBoolean({ message: 'status must be a boolean value' })
  status!: boolean;
}

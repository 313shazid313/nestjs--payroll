import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsDate,
  IsEnum,
  IsArray,
  IsOptional,
} from 'class-validator';
import { AttendanceStatus } from '../attendance.entity';

export class AttendanceCreateDto {
  @IsNotEmpty({ message: 'employee_id is required' })
  employee_id!: number;

  @IsNotEmpty({ message: 'date is required' })
  @IsDate({ message: 'date must be a valid date' })
  @Type(() => Date)
  date!: Date;

  @IsArray({ message: 'status should be array' })
  @IsEnum(AttendanceStatus, { each: true })
  status: AttendanceStatus[] = [];

  @IsOptional()
  @IsDate({ message: 'checkInTime must be a valid date' })
  @Type(() => Date)
  checkInTime?: Date;

  @IsOptional()
  @IsDate({ message: 'checkOutTime must be a valid date' })
  @Type(() => Date)
  checkOutTime?: Date;
}

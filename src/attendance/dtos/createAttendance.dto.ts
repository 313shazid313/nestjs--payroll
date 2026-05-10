import { Type } from 'class-transformer';
import { IsNotEmpty, IsDate, IsEnum, IsArray } from 'class-validator';
import { AttendanceStatus } from '../attendance.entity';

export class AttendanceCreateDto {
  @IsNotEmpty({ message: 'employee_id is required' })
  employee_id!: number;

  @IsNotEmpty({ message: 'date is required' })
  @IsDate({ message: 'date must be a valid date' })
  @Type(() => Date)
  date!: Date;

  @IsNotEmpty()
  @IsArray({ message: 'status should be array' })
  @IsEnum(AttendanceStatus, { each: true })
  status!: AttendanceStatus;

  @IsNotEmpty({ message: 'checkIn is required' })
  checkIn: boolean = true;
}

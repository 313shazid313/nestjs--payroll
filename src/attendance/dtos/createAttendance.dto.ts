import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsDate,
  IsEnum,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { AttendanceStatus } from '../attendance.entity';

export class AttendanceCreateDto {
  @IsNotEmpty()
  employee_id!: number;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  date!: Date;

  @IsEnum(AttendanceStatus)
  status!: AttendanceStatus;

  @IsBoolean()
  @IsOptional()
  checkIn?: boolean;
}

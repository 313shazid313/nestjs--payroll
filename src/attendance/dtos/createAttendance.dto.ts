import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsDate,
  // IsEnum,
  // IsArray,
  // IsOptional,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
// import { AttendanceStatus } from '../attendance.entity';

export class AttendanceCreateDto {
  @ApiProperty({
    example: 101,
    description: 'Employee unique ID',
  })
  @IsNotEmpty({ message: 'employee_id is required' })
  @IsNumber({}, { message: 'employee_id must be a number' })
  employee_id!: number;

  @ApiProperty({
    example: '2026-05-10',
    description: 'Attendance date',
    type: String,
    format: 'date',
  })
  @IsNotEmpty({ message: 'date is required' })
  @IsDate({ message: 'date must be a valid date' })
  @Type(() => Date)
  date: Date = new Date();

  // @ApiProperty({
  //   example: [AttendanceStatus.PRESENT],
  //   enum: AttendanceStatus,
  //   isArray: true,
  //   description: 'Attendance status list',
  // })
  // @IsArray({ message: 'status should be array' })
  // @IsEnum(AttendanceStatus, { each: true })
  // status: AttendanceStatus[] = [];

  // @ApiPropertyOptional({
  //   example: '2026-05-10T09:00:00.000Z',
  //   description: 'Check-in time',
  //   type: String,
  //   format: 'date-time',
  // })
  // @IsOptional()
  // @IsDate({ message: 'checkInTime must be a valid date' })
  // @Type(() => Date)
  // checkInTime?: Date;

  // @ApiPropertyOptional({
  //   example: '2026-05-10T18:00:00.000Z',
  //   description: 'Check-out time',
  //   type: String,
  //   format: 'date-time',
  // })
  // @IsOptional()
  // @IsDate({ message: 'checkOutTime must be a valid date' })
  // @Type(() => Date)
  // checkOutTime?: Date;
}

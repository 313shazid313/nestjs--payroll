import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  MaxLength,
  IsDate,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class HolidayCreateDto {
  @ApiProperty({
    description: 'Name of the holiday',
    example: 'Eid-ul-Fitr',
    maxLength: 100,
  })
  @IsString({ message: 'name must be a string' })
  @IsNotEmpty({ message: 'name should not be empty' })
  @MaxLength(100, { message: 'name max length is 100' })
  name!: string;

  @ApiProperty({
    description: 'Date of the holiday',
    example: '2026-04-10',
    type: String,
    format: 'date',
  })
  @IsNotEmpty({ message: 'date should not be empty' })
  @IsDate({ message: 'date must be a valid date' })
  @Type(() => Date)
  date!: Date;

  @ApiProperty({
    description: 'Type/category of the holiday',
    example: 'Religious',
    required: false,
    maxLength: 255,
  })
  @IsOptional()
  @IsString({ message: 'type must be a string' })
  @MaxLength(255, { message: 'type max length is 255' })
  type?: string;

  @ApiProperty({
    description: 'Whether the holiday is paid or not',
    example: true,
  })
  @IsBoolean({ message: 'isPaid must be a boolean' })
  isPaid!: boolean;
}

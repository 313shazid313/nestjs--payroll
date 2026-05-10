import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';

export class HolidayUpdateDto {
  @ApiPropertyOptional({
    description: 'Name of the holiday',
    example: 'Eid-ul-Adha',
    maxLength: 100,
  })
  @IsOptional()
  @IsString({ message: 'name must be a string' })
  @MaxLength(100, { message: 'name max length is 100' })
  name?: string;

  @ApiPropertyOptional({
    description: 'Date of the holiday',
    example: '2026-06-17',
    type: String,
    format: 'date',
  })
  @IsOptional()
  @IsDate({ message: 'date must be a valid date' })
  @Type(() => Date)
  date?: Date;

  @ApiPropertyOptional({
    description: 'Type/category of the holiday',
    example: 'Religious',
    maxLength: 255,
  })
  @IsOptional()
  @IsString({ message: 'type must be a string' })
  @MaxLength(255, { message: 'type max length is 255' })
  type?: string;

  @ApiPropertyOptional({
    description: 'Whether the holiday is paid or not',
    example: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'isPaid must be a boolean' })
  isPaid?: boolean;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class MakePayrollDto {
  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsNumber()
  id!: number;

  @ApiProperty({ example: 5 })
  @Type(() => Number)
  @IsNumber()
  month!: number;
}

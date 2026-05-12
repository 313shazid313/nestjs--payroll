import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class CreateTaxDto {
  @ApiProperty({
    example: 0,
    description: 'Minimum salary for this tax slab',
  })
  @IsNumber()
  @Min(0)
  minSalary!: number;

  @ApiProperty({
    example: 50000,
    description: 'Maximum salary for this tax slab',
  })
  @IsNumber()
  @Min(0)
  maxSalary!: number;

  @ApiProperty({
    example: 10,
    description: 'Tax percentage for this slab',
  })
  @IsNumber()
  @Min(0)
  percentage!: number;
}

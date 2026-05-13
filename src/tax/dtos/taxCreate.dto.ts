import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min, Max, ValidateIf } from 'class-validator';

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
  @ValidateIf((o) => o.maxSalary !== null && o.maxSalary !== undefined)
  maxSalary!: number;

  @ApiProperty({
    example: 10,
    description: 'Tax percentage for this slab',
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  percentage!: number;
}

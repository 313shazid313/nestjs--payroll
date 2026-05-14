import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, Min } from 'class-validator';

export class CreateSalaryStructureDto {
  @ApiProperty({
    example: 1,
    description: 'Unique employee ID linked to this salary structure',
  })
  @IsNumber()
  @IsPositive()
  employeeId!: number;

  @ApiProperty({
    example: 50000,
    description: 'Basic salary amount (must be >= 0)',
  })
  @IsNumber()
  @Min(0)
  basicSalary!: number;

  @ApiProperty({
    example: 10000,
    description: 'House Rent Allowance (HRA)',
  })
  @IsNumber()
  @Min(0)
  hra!: number;

  @ApiProperty({
    example: 5000,
    description: 'Other additional allowance',
  })
  @IsNumber()
  @Min(0)
  allowance!: number;

  @ApiProperty({
    example: 100,
    description: 'Late Penalty',
  })
  @IsNumber()
  @Min(0)
  latePenalty!: number;
}

import { ApiProperty } from '@nestjs/swagger';

export class MakePayrollDto {
  @ApiProperty({
    example: 1,
    description: 'User ID',
  })
  id!: number;

  @ApiProperty({
    example: 5,
    description: 'Month number',
  })
  month!: number;
}

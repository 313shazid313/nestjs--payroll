import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class HolidayCreateDto {
  @ApiProperty({ name: 'name', description: 'Name of the holiday' })
  @IsString({ message: 'name must be a string' })
  @IsNotEmpty({ message: 'name should not be empty' })
  @MaxLength(100, { message: 'name max length is 100' })
  name!: string;
  @ApiProperty({ name: 'date', description: 'Date of the holiday' })
  @IsNotEmpty({ message: 'date should not be empty' })
  date!: Date;

  @ApiProperty({ name: 'type', description: 'Type of the holiday' })
  @IsString({ message: 'type must be a string' })
  @MaxLength(255, { message: 'type max length is 255' })
  type?: string;

  @ApiProperty({
    name: 'isPaid',
    description: 'Whether the holiday is paid or not',
  })
  @IsBoolean({ message: 'isPaid must be a boolean' })
  isPaid!: boolean;
}

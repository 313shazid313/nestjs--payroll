import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DepartmentDto {
  @ApiProperty({
    description: 'Name of the department',
    example: 'Human Resources',
    maxLength: 100,
  })
  @IsString({ message: 'name must be a string' })
  @IsNotEmpty({ message: 'name should not be empty' })
  @MaxLength(100, { message: 'name max length is 100' })
  name!: string;
}

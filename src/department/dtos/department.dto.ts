import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class DepartmentDto {
  @IsString({ message: 'name must be a string' })
  @IsNotEmpty({ message: 'name should not be empty' })
  @MaxLength(100, { message: 'name max length is 100' })
  name!: string;
}

import { IsBoolean, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class HolidayCreateDto {
  @IsString({ message: 'name must be a string' })
  @IsNotEmpty({ message: 'name should not be empty' })
  @MaxLength(100, { message: 'name max length is 100' })
  name!: string;

  @IsNotEmpty({ message: 'date should not be empty' })
  date!: Date;

  @IsString({ message: 'type must be a string' })
  @MaxLength(255, { message: 'type max length is 255' })
  type?: string;

  @IsBoolean({ message: 'isPaid must be a boolean' })
  isPaid!: boolean;
}

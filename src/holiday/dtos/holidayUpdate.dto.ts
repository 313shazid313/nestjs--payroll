import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class HolidayUpdateDto {
  @IsOptional()
  @IsString({ message: 'name must be a string' })
  @MaxLength(100, { message: 'name max length is 100' })
  name?: string;

  @IsOptional()
  date?: Date;

  @IsOptional()
  @IsString({ message: 'type must be a string' })
  @MaxLength(255, { message: 'type max length is 255' })
  type?: string;

  @IsOptional()
  @IsBoolean({ message: 'isPaid must be a boolean' })
  isPaid?: boolean;
}

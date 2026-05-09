import { Module } from '@nestjs/common';
import { HolidayController } from './holiday.controller';
import { HolidayService } from './holiday.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Holiday } from './holiday.entity';

@Module({
  controllers: [HolidayController],
  providers: [HolidayService],
  imports: [TypeOrmModule.forFeature([Holiday])],
})
export class HolidayModule {}

import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { HolidayService } from './holiday.service';
import { HolidayCreateDto } from './dtos/holidayCreate.dto';

import { ApiOperation } from '@nestjs/swagger';
import { HolidayUpdateDto } from './dtos/holidayUpdate.dto';

@Controller('holiday')
export class HolidayController {
  constructor(private holidayService: HolidayService) {}

  @Post()
  @ApiOperation({ summary: 'Create holiday' })
  createHoliday(@Body() holidayCreateDto: HolidayCreateDto) {
    return this.holidayService.createHoliday(holidayCreateDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all holidays' })
  getAllHolidays() {
    return this.holidayService.getAllHolidays();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get holiday by id' })
  getHolidayById(@Body('id') id: number) {
    return this.holidayService.getHolidayById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update holiday' })
  updateHoliday(
    @Body('id') id: number,
    @Body() holidayUpdateDto: HolidayUpdateDto,
  ) {
    return this.holidayService.updateHoliday(id, holidayUpdateDto);
  }
}

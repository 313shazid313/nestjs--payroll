import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceCreateDto } from './dtos/createAttendance.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}

  @Post()
  createAttendance(@Body() attendanceCreateDto: AttendanceCreateDto) {
    return this.attendanceService.createAttendance(attendanceCreateDto);
  }

  @Get()
  getAllAttendances() {
    return this.attendanceService.getAllAttendances();
  }

  @Get(':id')
  getAttendanceById(id: number) {
    return this.attendanceService.getAttendanceById(id);
  }

  @Get('monthly-working-hours/:id/:month/:year')
  monthlyWorkingHour(
    @Param('id') id: number,
    @Param('month') month: number,
    @Param('year') year: number,
  ) {
    return this.attendanceService.monthlyWorkingHour(id, month, year);
  }

  @Patch('check-out/:id')
  checkOut(@Param('id') id: number) {
    return this.attendanceService.checkOut(id);
  }
}

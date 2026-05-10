import { Controller, Post, Body } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceCreateDto } from './dtos/createAttendance.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}

  @Post()
  createAttendance(@Body() attendanceCreateDto: AttendanceCreateDto) {
    return this.attendanceService.createAttendance(attendanceCreateDto);
  }
}

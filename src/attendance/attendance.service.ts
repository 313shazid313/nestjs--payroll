import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Attendance } from './attendance.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AttendanceCreateDto } from './dtos/createAttendance.dto';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
  ) {}
  createAttendence(attendanceCreateDto: AttendanceCreateDto) {
    
  }
}

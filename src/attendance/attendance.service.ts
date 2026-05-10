import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Attendance } from './attendance.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AttendanceCreateDto } from './dtos/createAttendance.dto';
import { ConflictException } from '@nestjs/common';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
  ) {}

  async createAttendance(attendanceCreateDto: AttendanceCreateDto) {
    const existesAttendance = await this.attendanceRepository.findOne({
      where: {
        date: attendanceCreateDto.date,
      },
    });

    if (existesAttendance) {
      throw new ConflictException(
        'Attendance for this employee on this date already exists in this date',
      );
    }

    const attendance = this.attendanceRepository.create({
      ...attendanceCreateDto,
      employee_id: { id: attendanceCreateDto.employee_id },
    });
    return await this.attendanceRepository.save(attendance);
  }
}

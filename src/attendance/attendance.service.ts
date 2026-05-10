import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Attendance, AttendanceStatus } from './attendance.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AttendanceCreateDto } from './dtos/createAttendance.dto';
import { ConflictException } from '@nestjs/common';

const officeStartTime = new Date();
officeStartTime.setHours(9, 0, 0, 0);

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

    const isHoliday = await this.attendanceRepository.manager.findOne(
      'Holiday',
      {
        where: {
          date: attendanceCreateDto.date,
        },
      },
    );

    if (isHoliday) {
      throw new ConflictException('Attendance cannot be created on a holiday');
    }

    //! Check if the employee is late
    if (attendanceCreateDto.date > officeStartTime && !isHoliday) {
      const attendance = this.attendanceRepository.create({
        ...attendanceCreateDto,
        employee_id: { id: attendanceCreateDto.employee_id },
        status: AttendanceStatus.LATE,
      });
      return await this.attendanceRepository.save(attendance);
    }

    const attendance = this.attendanceRepository.create({
      ...attendanceCreateDto,
      employee_id: { id: attendanceCreateDto.employee_id },
    });
    return await this.attendanceRepository.save(attendance);
  }

  async getAllAttendances() {
    return await this.attendanceRepository.find({
      relations: ['employee_id'],
    });
  }

  async getAttendanceById(id: number) {
    return await this.attendanceRepository.findOne({
      where: { id },
      relations: ['employee_id'],
    });
  }

  async monthlyWorkingHour(id: number) {
    const totalAttendance = await this.attendanceRepository.count({
      where: {
        employee_id: { id },
        checkIn: true,
      },
    });
    return totalAttendance * 8;
  }
}

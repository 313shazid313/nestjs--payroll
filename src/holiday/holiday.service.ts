import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Holiday } from './holiday.entity';
import { HolidayCreateDto } from './dtos/holidayCreate.dto';
import { ConflictException } from '@nestjs/common';
import { HolidayUpdateDto } from './dtos/holidayUpdate.dto';

@Injectable()
export class HolidayService {
  constructor(
    @InjectRepository(Holiday)
    private holidayRepository: Repository<Holiday>,
  ) {}

  async createHoliday(holidayCreateDto: HolidayCreateDto) {
    const existingHoliday = await this.holidayRepository.findOneBy({
      date: holidayCreateDto.date,
    });

    if (existingHoliday) {
      throw new ConflictException('Holiday with this date already exists');
    } else {
      const existingHolidayByName = await this.holidayRepository.findOneBy({
        name: holidayCreateDto.name,
      });
      if (existingHolidayByName) {
        throw new ConflictException('Holiday with this name already exists');
      }
    }
    const holiday = this.holidayRepository.create(holidayCreateDto);
    return this.holidayRepository.save(holiday);
  }

  getAllHolidays() {
    return this.holidayRepository.find();
  }

  getHolidayById(id: number) {
    return this.holidayRepository.findOneBy({ id });
  }

  async updateHoliday(id: number, holidayUpdateDto: HolidayUpdateDto) {
    const holiday = await this.holidayRepository.findOneBy({ id });
    if (!holiday) {
      throw new Error('Holiday not found');
    }
    Object.assign(holiday, holidayUpdateDto);
    return this.holidayRepository.save(holiday);
  }

  async deleteHoliday(id: number) {
    const holiday = await this.holidayRepository.findOneBy({ id });
    if (!holiday) {
      throw new Error('Holiday not found');
    }
    return this.holidayRepository.remove(holiday);
  }
}

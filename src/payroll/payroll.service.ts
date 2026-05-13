import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payroll } from './payroll.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PayrollService {
  constructor(
    @InjectRepository(Payroll)
    private payrollRepository: Repository<Payroll>,
  ) {}

  createPayroll(month: string) {}
}

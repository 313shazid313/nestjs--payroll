import { Body, Controller, Get, Post } from '@nestjs/common';
import { PayrollService } from './payroll.service';

@Controller('payroll')
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) {}

  //! this id is employee id
  @Post()
  createPayroll(@Body('id') id: number, @Body('month') month: number) {
    return this.payrollService.createPayroll(id, month);
  }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { MakePayrollDto } from './dtos/makePayroll.dto';

@Controller('payroll')
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) {}

  //! this id is employee id
  @Post()
  createPayroll(@Body() makePayrollDto: MakePayrollDto) {
    return this.payrollService.createPayroll(
      makePayrollDto.id,
      makePayrollDto.month,
    );
  }
}

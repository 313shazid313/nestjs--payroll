import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { PayrollService } from './payroll.service';
import { MakePayrollDto } from './dtos/makePayroll.dto';

@ApiTags('Payroll')
@Controller('payroll')
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) {}

  //! this id is for employee
  @Post()
  @ApiOperation({
    summary: 'Create payroll for an employee',
    description: 'Generates payroll for a given employee ID and month.',
  })
  @ApiBody({
    type: MakePayrollDto,
    description: 'Payload containing employee id and month',
  })
  @ApiResponse({
    status: 201,
    description: 'Payroll created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async createPayroll(@Body() makePayrollDto: MakePayrollDto) {
    return await this.payrollService.createPayroll(
      makePayrollDto.id,
      makePayrollDto.month,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get employee payroll slip',
    description: 'Returns the payroll slip for a specific employee by ID',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Employee ID',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Payroll slip retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Employee not found',
  })
  async getPayrollSlip(@Param('id') id: number) {
    return this.payrollService.generatePaySlip(id);
  }

  @Get()
  async getAllPayrolls() {
    return this.payrollService.getAllPayrolls();
  }
}

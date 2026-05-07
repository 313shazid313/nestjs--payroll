import { Controller } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Body, Post, Get, Param, Put, Delete } from '@nestjs/common';
import { EmployeeCreateDto } from './dtos/employeesCreate.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private employeesService: EmployeesService) {}

  @Post()
  async createEmployee(@Body() employeesCreateDto: EmployeeCreateDto) {
    return await this.employeesService.createEmployee(employeesCreateDto);
  }

  @Get()
  async getAllEmployees() {
    return await this.employeesService.getAllEmployees();
  }

  @Get(':id')
  async getEmployeeById(@Param('id') id: number) {
    return await this.employeesService.getEmployeeById(id);
  }

  @Put(':id')
  async updateEmployee(
    @Param('id') id: number,
    @Body() employeesCreateDto: EmployeeCreateDto,
  ) {
    return await this.employeesService.updateEmployee(id, employeesCreateDto);
  }

  @Delete(':id')
  async deleteEmployee(@Param('id') id: number) {
    return await this.employeesService.deleteEmployee(id);
  }
}

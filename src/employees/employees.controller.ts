import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { EmployeesService } from './employees.service';
import { EmployeeCreateDto } from './dtos/employeesCreate.dto';

import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from '../users/users.entity';

@ApiTags('Employees')
@Controller('employees')
export class EmployeesController {
  constructor(private employeesService: EmployeesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new employee' })
  @ApiBody({ type: EmployeeCreateDto })
  @ApiResponse({
    status: 201,
    description: 'Employee created successfully',
    schema: {
      example: {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+8801712345678',
        joiningDate: '2026-05-10',
        department_id: 1,
        base_salary: 50000,
        status: true,
      },
    },
  })
  async createEmployee(@Body() employeesCreateDto: EmployeeCreateDto) {
    return this.employeesService.createEmployee(employeesCreateDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.HR_MANAGER)
  @ApiOperation({ summary: 'Get all employees' })
  @ApiResponse({
    status: 200,
    description: 'List of employees',
    // schema: {
    //   example: [
    //     {
    //       id: 1,
    //       name: 'John Doe',
    //       email: 'john@example.com',
    //     },
    //     {
    //       id: 2,
    //       name: 'Jane Smith',
    //       email: 'jane@example.com',
    //     },
    //   ],
    // },
  })
  async getAllEmployees() {
    return this.employeesService.getAllEmployees();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get employee by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Employee ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Employee found',
  })
  @ApiResponse({
    status: 404,
    description: 'Employee not found',
  })
  async getEmployeeById(@Param('id') id: number) {
    return this.employeesService.getEmployeeById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update employee' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
  })
  @ApiBody({ type: EmployeeCreateDto })
  @ApiResponse({
    status: 200,
    description: 'Employee updated successfully',
  })
  async updateEmployee(
    @Param('id') id: number,
    @Body() employeesCreateDto: EmployeeCreateDto,
  ) {
    return this.employeesService.updateEmployee(id, employeesCreateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete employee' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Employee deleted successfully',
    schema: {
      example: {
        message: 'Employee deleted successfully',
      },
    },
  })
  async deleteEmployee(@Param('id') id: number) {
    return this.employeesService.deleteEmployee(id);
  }
}

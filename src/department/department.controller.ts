import {
  Controller,
  Put,
  Delete,
  Post,
  Get,
  Body,
  Param,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentDto } from './dtos/department.dto';

@Controller('department')
export class DepartmentController {
  constructor(private departmentService: DepartmentService) {}

  @Post()
  async createDepartment(@Body() departmentDto: DepartmentDto) {
    return this.departmentService.createDepartment(departmentDto);
  }

  @Get()
  async getAllDepartments() {
    return this.departmentService.getAllDepartments();
  }

  @Get(':id')
  async getDepartmentById(@Param('id') id: number) {
    return this.departmentService.getDepartmentById(id);
  }

  @Put(':id')
  async updateDepartment(
    @Param('id') id: number,
    @Body() departmentDto: DepartmentDto,
  ) {
    return this.departmentService.updateDepartment(id, departmentDto);
  }

  @Delete(':id')
  async deleteDepartment(@Param('id') id: number) {
    return this.departmentService.deleteDepartment(id);
  }
}

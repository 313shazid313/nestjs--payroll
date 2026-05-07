import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './department.entity';
import { Repository } from 'typeorm';
import { DepartmentDto } from './dtos/department.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  async createDepartment(departmentDto: DepartmentDto) {
    const department = this.departmentRepository.create({
      name: departmentDto.name,
    });
    return this.departmentRepository.save(department);
  }

  async getAllDepartments() {
    return this.departmentRepository.find();
  }

  async getDepartmentById(id: number) {
    return this.departmentRepository.findOne({ where: { id } });
  }

  async updateDepartment(id: number, departmentDto: DepartmentDto) {
    const department = await this.departmentRepository.findOne({
      where: { id },
    });
    if (!department) {
      return null;
    }
    department.name = departmentDto.name;
    return this.departmentRepository.save(department);
  }

  async deleteDepartment(id: number) {
    const result = await this.departmentRepository.delete(id);
    return { success: (result.affected ?? 0) > 0 };
  }
}

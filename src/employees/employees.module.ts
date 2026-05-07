import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { Department } from 'src/department/department.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employees } from './employees.entity';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService],
  imports: [TypeOrmModule.forFeature([Employees, Department])],
})
export class EmployeesModule {}

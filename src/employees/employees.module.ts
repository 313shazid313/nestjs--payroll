import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { Department } from 'src/department/department.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employees } from './employees.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService],
  imports: [TypeOrmModule.forFeature([Employees, Department]), AuthModule],
})
export class EmployeesModule {}

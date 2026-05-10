import { Module } from '@nestjs/common';
import { SalaryStructureController } from './salary-structure.controller';
import { SalaryStructureService } from './salary-structure.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalaryStructure } from './salary-structure.entity';
import { Employees } from '../employees/employees.entity';

@Module({
  controllers: [SalaryStructureController],
  providers: [SalaryStructureService],
  imports: [TypeOrmModule.forFeature([SalaryStructure, Employees])],
})
export class SalaryStructureModule {}

import { Module } from '@nestjs/common';
import { SalaryStructureController } from './salary-structure.controller';
import { SalaryStructureService } from './salary-structure.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalaryStructure } from './salary-structure.entity';
import { Employees } from '../employees/employees.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SalaryStructure, Employees])],
  controllers: [SalaryStructureController],
  providers: [SalaryStructureService],
})
export class SalaryStructureModule {}

import { Module } from '@nestjs/common';
import { PayrollController } from './payroll.controller';
import { PayrollService } from './payroll.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payroll } from './payroll.entity';

@Module({
  controllers: [PayrollController],
  providers: [PayrollService],
  imports: [TypeOrmModule.forFeature([Payroll])],
})
export class PayrollModule {}

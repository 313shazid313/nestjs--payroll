import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payroll } from './payroll.entity';
import { Repository } from 'typeorm';
import { SalaryStructure } from 'src/salary-structure/salary-structure.entity';
import { Attendance, AttendanceStatus } from 'src/attendance/attendance.entity';
import { ArrayContains, Raw } from 'typeorm';
import { Employees } from 'src/employees/employees.entity';
import { Tax } from 'src/tax/tax.entity';

@Injectable()
export class PayrollService {
  constructor(
    @InjectRepository(Payroll)
    private payrollRepository: Repository<Payroll>,

    @InjectRepository(Attendance)
    private attendenceRepository: Repository<Attendance>,

    @InjectRepository(SalaryStructure)
    private salaryStructure: Repository<SalaryStructure>,

    @InjectRepository(Employees)
    private employeeRepository: Repository<Employees>,

    @InjectRepository(Tax)
    private taxRepository: Repository<Tax>,
  ) {}

  async createPayroll(id: number, month: number) {
    // console.log(month, id);

    const isPayrollAvailableForThisMonth = await this.payrollRepository.findOne(
      {
        where: { employee_id: { id: id } },
      },
    );

    if (isPayrollAvailableForThisMonth) {
      throw new ConflictException('');
    } else {
      const totalPresentDayOntime = await this.attendenceRepository.count({
        where: {
          employee_id: { id: id },
          //! ArrayContains checks whether a Postgres array column includes the given value(s) in a TypeORM query.
          status: ArrayContains([
            AttendanceStatus.LATE || AttendanceStatus.PRESENT,
          ]),
          date: Raw((alias) => `EXTRACT(MONTH FROM ${alias}) = :month`, {
            month,
          }),
        },
      });

      const salaryStructure = await this.salaryStructure.findOne({
        where: {
          employee_id: { id: id },
        },
      });

      const totalLateDay = await this.attendenceRepository.count({
        where: {
          employee_id: { id: id },
          status: ArrayContains([AttendanceStatus.LATE]),
          date: Raw((alias) => `EXTRACT(MONTH FROM ${alias}) = :month`, {
            month,
          }),
        },
      });

      const findEmployee = await this.employeeRepository.findOne({
        where: { id: id },
      });

      if (!findEmployee) {
        throw new Error('Employee not found');
      }

      const perdaySalary = findEmployee?.base_salary / 30;

      const totalSalary = totalPresentDayOntime * perdaySalary;

      // const totalLatePanalty = totalLateDay*

      const deduction = totalLateDay * perdaySalary;

      const afterDeductionSalary = totalSalary - deduction;

      return salaryStructure;
    }
  }
}

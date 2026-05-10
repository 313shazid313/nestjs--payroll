import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Users } from './users/users.entity';
import { EmployeesModule } from './employees/employees.module';
import { DepartmentModule } from './department/department.module';
import { Department } from './department/department.entity';
import { Employees } from './employees/employees.entity';
import { AttendanceModule } from './attendance/attendance.module';
import { Attendance } from './attendance/attendance.entity';
import { HolidayModule } from './holiday/holiday.module';
import { Holiday } from './holiday/holiday.entity';
import { SalaryStructureModule } from './salary-structure/salary-structure.module';
import { PayrollModule } from './payroll/payroll.module';
import { TaxService } from './tax/tax.service';
import { TaxController } from './tax/tax.controller';
import { TaxModule } from './tax/tax.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        entities: [Users, Department, Employees, Attendance, Holiday], //! add all entities here
        synchronize: true, //! for only development mode it should be true
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '1234', //! needs to be changed
        database: configService.get('payroll'),
      }),
    }),
    EmployeesModule,
    DepartmentModule,
    AttendanceModule,
    HolidayModule,
    SalaryStructureModule,
    PayrollModule,
    TaxModule,
  ],
  controllers: [AppController, TaxController],
  providers: [AppService, TaxService],
})
export class AppModule {}

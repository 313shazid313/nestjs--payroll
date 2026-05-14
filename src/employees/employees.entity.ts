import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Department } from '../department/department.entity';
import { Attendance } from 'src/attendance/attendance.entity';
import { Payroll } from 'src/payroll/payroll.entity';
import { SalaryStructure } from 'src/salary-structure/salary-structure.entity';

@Entity()
export class Employees {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  name!: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  email!: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  phone!: string;

  @ManyToOne(() => Department, (department) => department.id, {
    nullable: false,
  })
  department_id!: Department;

  @Column({
    type: 'int',
    nullable: false,
  })
  base_salary!: number;

  @Column({
    type: 'boolean',
    nullable: false,
  })
  status!: boolean;

  @Column({
    type: 'date',
    nullable: false,
  })
  joiningDate: Date;

  @OneToMany(() => Attendance, (attendance) => attendance.employee_id)
  attendance!: Attendance[];

  @OneToMany(() => Payroll, (payroll) => payroll.employee)
  payrolls!: Payroll[];

  @OneToOne(
    () => SalaryStructure,
    (SalaryStructure) => SalaryStructure.employee_id,
  )
  salaryStructures!: SalaryStructure;

  constructor() {
    this.joiningDate = new Date();
  }

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt!: Date;
}

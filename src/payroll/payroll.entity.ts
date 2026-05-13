import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Employees } from '../employees/employees.entity';

@Entity()
export class Payroll {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => Employees, (employee) => employee.id, {
    nullable: false,
  })
  employee_id!: Employees;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  month!: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  gross!: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  deduction!: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  net!: number;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  status!: boolean;

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

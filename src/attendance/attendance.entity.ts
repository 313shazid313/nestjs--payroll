import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Employees } from '../employees/employees.entity';

export enum AttendanceStatus {
  PRESENT = 'present',
  ABSENT = 'absent',
  LATE = 'late',
}

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Employees, (Employees) => Employees.id, {
    nullable: false,
  })
  employee_id!: Employees;

  @Column({
    type: 'date',
    nullable: false,
  })
  date!: Date;

  @Column({
    type: 'enum',
    array: true,
    enum: AttendanceStatus,
  })
  status!: AttendanceStatus;

  @Column({
    type: 'boolean',
    nullable: false,
  })
  checkIn?: boolean;

  @Column({
    type: 'boolean',
    nullable: false,
  })
  checkOut?: boolean;
}

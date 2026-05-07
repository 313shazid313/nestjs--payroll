import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Department } from '../department/department.entity';

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

  constructor() {
    this.joiningDate = new Date();
  }
}

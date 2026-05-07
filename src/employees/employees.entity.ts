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

  @ManyToOne(() => Department, (department) => department.id, {
    nullable: false,
  })
  department_id!: Department;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  email!: string;

  @Column({
    type: 'number',
    nullable: false,
  })
  base_salary!: string;
}

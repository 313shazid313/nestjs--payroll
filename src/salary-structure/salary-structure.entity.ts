import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SalaryStructure {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
    unique: true,
  })
  email!: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  password!: string;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  HR_MANAGER = 'hrmanager',
  FINANCE_OFFICER = 'financeofficer',
  EMPLOYEE = 'employee',
}

@Entity()
export class Users {
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

  @Column({
    type: 'enum',
    array: true,
    enum: UserRole,
    default: [UserRole.ADMIN],
  })
  roles!: UserRole[];
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Holiday {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
    unique: true,
  })
  name!: string;

  @Column({
    type: 'date',
    nullable: false,
  })
  date!: Date;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 255,
  })
  type?: string;

  @Column({
    type: 'boolean',
    nullable: false,
  })
  isPaid!: boolean;
}

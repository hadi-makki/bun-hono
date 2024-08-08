import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { typeOrm } from './db';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column('text')
  username!: string;
  @Column('timestamp without time zone', { default: new Date().toISOString() })
  dateOfBirth!: Date;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

import { Account } from '../accounts/account.entity';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn({ name: 'customer_id' })
  customerId: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'contact_number' })
  contactNumber: string;

  @Column()
  address: string;

  @CreateDateColumn({ name: 'date_registered' })
  dateRegistered: Date;

  @OneToMany(() => Account, (account) => account.customer)
  accounts: Account[];
}
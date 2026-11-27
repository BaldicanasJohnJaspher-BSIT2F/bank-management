import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Customer } from '../customers/customer.entity';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn({ name: 'account_id' })
  accountId: number;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column({ name: 'account_number', unique: true })
  accountNumber: string;

  @Column({ name: 'account_type' })
  accountType: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  balance: number;

  @Column({ name: 'account_status', default: 'Active' })
  accountStatus: string;

  @CreateDateColumn({ name: 'date_opened' })
  dateOpened: Date;
}
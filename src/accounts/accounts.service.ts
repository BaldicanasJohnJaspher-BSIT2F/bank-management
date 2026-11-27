import { Injectable, NotFoundException } from '@nestjs/common';
import { Account } from './account.entity';
import { AccountRepository } from './account.repository';
import { CustomerRepository } from '../customers/customer.repository';

@Injectable()
export class AccountsService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly customerRepository: CustomerRepository,
  ) {}

  // Create account
  async create(data: any) {
    const customer = await this.customerRepository.findById(data.customerId);

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    const account = this.accountRepository.create({
      accountNumber: data.accountNumber,
      accountType: data.accountType,
      balance: data.balance,
      accountStatus: data.accountStatus || 'Active',
      customer,
    });

    return this.accountRepository.save(account);
  }

  // Get all accounts
  async findAll() {
    return this.accountRepository.findAll();
  }

  // Count all accounts
  async countAccounts() {
    const total = await this.accountRepository.count();

    return {
      totalAccounts: total,
    };
  }

  // Get account by ID
  async findOne(accountId: number) {
    const account = await this.accountRepository.findOne(accountId);

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    return account;
  }

  // Filter accounts by type
  async findByType(type: string) {
    return this.accountRepository.findByType(type);
  }

  // Filter accounts by status
  async findByStatus(status: string) {
    return this.accountRepository.findByStatus(status);
  }

  // Update account
  async update(accountId: number, data: any) {
    const account = await this.findOne(accountId);

    if (data.customerId !== undefined) {
      const customer = await this.customerRepository.findById(data.customerId);

      if (!customer) {
        throw new NotFoundException('Customer not found');
      }

      account.customer = customer;
    }

    Object.assign(account, {
      accountNumber: data.accountNumber ?? account.accountNumber,
      accountType: data.accountType ?? account.accountType,
      balance: data.balance ?? account.balance,
      accountStatus: data.accountStatus ?? account.accountStatus,
    });

    return this.accountRepository.save(account);
  }

  // Update account status
  async updateStatus(accountId: number, status: string) {
    const account = await this.findOne(accountId);

    account.accountStatus = status;

    return this.accountRepository.save(account);
  }

  // Delete account
  async remove(accountId: number) {
    const account = await this.findOne(accountId);

    await this.accountRepository.remove(account);

    return {
      message: 'Account deleted successfully',
    };
  }
}

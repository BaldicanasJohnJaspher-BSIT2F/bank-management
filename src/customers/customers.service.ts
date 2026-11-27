import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from './customer.entity';
import { CustomerRepository } from './customer.repository';

@Injectable()
export class CustomersService {
  constructor(
    private readonly customerRepository: CustomerRepository,
  ) {}

  // Get customer's accounts
  async findCustomerAccounts(customerId: number) {
    const customer = await this.customerRepository.findCustomerAccounts(customerId);

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return customer.accounts;
  }

  // Create customer
  async create(data: Partial<Customer>) {
    const customer = this.customerRepository.create(data);
    return this.customerRepository.save(customer);
  }

  // Get all customers
  async findAll() {
    return this.customerRepository.findAll();
  }

  // Count all customers
  async countCustomers() {
    const total = await this.customerRepository.count();

    return {
      totalCustomers: total,
    };
  }

  // Search customer
  async search(keyword: string) {
    return this.customerRepository.search(keyword);
  }

  // Get customer by ID
  async findOne(customerId: number) {
    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return customer;
  }

  // Update customer
  async update(customerId: number, data: Partial<Customer>) {
    const customer = await this.findOne(customerId);

    Object.assign(customer, data);

    return this.customerRepository.save(customer);
  }

  // Delete customer
  async remove(customerId: number) {
    const customer = await this.findOne(customerId);

    await this.customerRepository.remove(customer);

    return {
      message: 'Customer deleted successfully',
    };
  }
}

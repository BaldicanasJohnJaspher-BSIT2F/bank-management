import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { Customer } from './customer.entity';

@Injectable()
export class CustomerRepository {
  constructor(
    @InjectRepository(Customer)
    private readonly repository: Repository<Customer>,
  ) {}

  findCustomerAccounts(customerId: number) {
    return this.repository.findOne({
      where: { customerId },
      relations: { accounts: true },
    });
  }

  findById(customerId: number) {
    return this.repository.findOneBy({ customerId });
  }

  create(data: Partial<Customer>) {
    return this.repository.create(data);
  }

  findAll() {
    return this.repository.find();
  }

  count() {
    return this.repository.count();
  }

  search(keyword: string) {
    return this.repository.find({
      where: [
        { firstName: Like(`%${keyword}%`) },
        { lastName: Like(`%${keyword}%`) },
        { email: Like(`%${keyword}%`) },
      ],
    });
  }

  save(customer: Customer) {
    return this.repository.save(customer);
  }

  remove(customer: Customer) {
    return this.repository.remove(customer);
  }
}

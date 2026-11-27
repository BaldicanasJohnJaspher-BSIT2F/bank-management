import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Account } from './account.entity';

@Injectable()
export class AccountRepository {
  constructor(
    @InjectRepository(Account)
    private readonly repository: Repository<Account>,
  ) {}

  create(data: Partial<Account>) {
    return this.repository.create(data);
  }

  save(account: Account) {
    return this.repository.save(account);
  }

  findAll() {
    return this.repository.find({ relations: { customer: true } });
  }

  count() {
    return this.repository.count();
  }

  findOne(accountId: number) {
    return this.repository.findOne({
      where: { accountId },
      relations: { customer: true },
    });
  }

  findByType(accountType: string) {
    return this.repository.find({
      where: { accountType },
      relations: { customer: true },
    });
  }

  findByStatus(accountStatus: string) {
    return this.repository.find({
      where: { accountStatus },
      relations: { customer: true },
    });
  }

  remove(account: Account) {
    return this.repository.remove(account);
  }
}

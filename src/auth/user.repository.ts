import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  findByEmail(email: string) {
    return this.repository.findOneBy({ email });
  }

  create(data: Partial<User>) {
    return this.repository.create(data);
  }

  save(user: User) {
    return this.repository.save(user);
  }
}

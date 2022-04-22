import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@src/entities';
import { Repository } from 'typeorm';
import { EncryptService } from '@src/encrypt/encrypt.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
  }

  async findUser(username: string) {
    return await this.userRepository
      .createQueryBuilder('user')
      .select()
      .where('user.username = :username', { username: username })
      .getOne();
  }
}

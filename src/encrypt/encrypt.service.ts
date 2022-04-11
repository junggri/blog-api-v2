import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcrypt';

@Injectable()
export class EncryptService {
  constructor(
    private configService: ConfigService,
  ) {
  }

  async getHash() {
    const hash = await bcrypt.hash(this.configService.get('PASSWORD'), 11);
    return hash;
  }


  async compare(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}

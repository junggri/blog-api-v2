import { Module } from '@nestjs/common';
import { UserResolver } from '@src/user/user.resolver';
import { UserService } from '@src/user/user.service';

@Module({
  imports: [],
  providers: [UserResolver, UserService],
  exports: [],
})

export class UserModule {
}

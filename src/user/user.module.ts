import { Module } from '@nestjs/common';
import { UserService } from '@src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@src/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UserService],
  exports: [UserService],
})

export class UserModule {
}

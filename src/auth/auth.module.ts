import { Module } from '@nestjs/common';
import { AuthResolver } from '@src/auth/auth.resolver';
import { AuthService } from '@src/auth/auth.service';

@Module({
  imports: [],
  providers: [AuthResolver, AuthService],
  exports: [],
})

export class AuthModule {

}

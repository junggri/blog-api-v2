import { Module } from '@nestjs/common';
import { AuthResolver } from '@src/auth/auth.resolver';
import { AuthService } from '@src/auth/auth.service';
import { EncryptService } from '@src/encrypt/encrypt.service';
import { EncryptModule } from '@src/encrypt/encrypt.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from '@src/auth/strategy/jwt.strategy';
import { UserModule } from '@src/user/user.module';

@Module({
  imports: [
    UserModule,
    EncryptModule,
    ConfigService,
    JwtModule.registerAsync({
      imports: [ConfigService],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          secret: config.get('JWT_SECRETKEY'),
          signOptions: { expiresIn: '3d' },
        };
      },
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    JwtStrategy,
  ],
  exports: [
    AuthService,
  ],
})

export class AuthModule {

}

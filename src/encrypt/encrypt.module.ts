import { Module } from '@nestjs/common';
import { EncryptService } from '@src/encrypt/encrypt.service';

@Module({
  imports: [],
  providers: [EncryptService],
  exports: [EncryptService],
})

export class EncryptModule {

}

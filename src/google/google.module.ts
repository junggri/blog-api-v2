import { Module } from '@nestjs/common';
import { GoogleResolver } from '@src/google/google.resolver';
import { GoogleService } from '@src/google/google.service';

@Module({
  imports: [],
  providers: [GoogleResolver, GoogleService],
  exports: [],
})

export class GoogleModule {

}

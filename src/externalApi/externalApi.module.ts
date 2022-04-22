import { Module } from '@nestjs/common';
import { ExternalApiService } from '@src/externalApi/externalApi.service';

@Module({
  imports: [],
  providers: [ExternalApiService],
  exports: [ExternalApiService],
})


export class ExternalApiModule {
}

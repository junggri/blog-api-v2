import { Module } from '@nestjs/common';
import { VisitService } from '@src/visit/visit.service';
import { VisitResolver } from '@src/visit/visit.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visit } from '@src/entities';
import { ExternalApiModule } from '@src/externalApi/externalApi.module';
import { DateModule } from '@src/date/date.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Visit]),
    DateModule,
    ExternalApiModule,
  ],
  providers: [VisitService, VisitResolver],
  exports: [],
})

export class VisitModule {
}

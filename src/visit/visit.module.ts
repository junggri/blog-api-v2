import { Module } from '@nestjs/common';
import { VisitService } from '@src/visit/visit.service';
import { VisitResolver } from '@src/visit/visit.resolver';

@Module({
  imports: [],
  exports: [VisitService, VisitResolver],
  providers: [],
})

export class VisitModule {
}

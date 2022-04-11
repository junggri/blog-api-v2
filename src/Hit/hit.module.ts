import { Module } from '@nestjs/common';
import { HitResolver } from '@src/Hit/hit.resolver';
import { HitService } from '@src/Hit/hit.service';

@Module({
  imports: [],
  providers: [HitResolver, HitService],
  exports: [],
})

export class HitModule {
}

import { Module } from '@nestjs/common';
import { HitResolver } from '@src/Hit/hit.resolver';
import { HitService } from '@src/Hit/hit.service';
import { Hit } from '@src/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from '@src/post/post.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Hit]),
    PostModule,
  ],
  providers: [
    HitResolver,
    HitService,
  ],
  exports: [
    HitService,
  ],
})

export class HitModule {
}

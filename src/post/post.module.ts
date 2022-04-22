import { Module } from '@nestjs/common';
import { PostResolver } from '@src/post/post.resolver';
import { PostService } from '@src/post/post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '@src/entities';
import { FileModule } from '@src/file/file.module';
import { PaginationModule } from '@src/pagination/pagination.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    FileModule,
    PaginationModule,
  ],
  providers: [PostResolver, PostService],
  exports: [
    PostService,
  ],
})

export class PostModule {
}

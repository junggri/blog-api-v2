import { Module } from '@nestjs/common';
import { PostResolver } from '@src/post/post.resolver';
import { PostService } from '@src/post/post.service';

@Module({
  imports: [],
  providers: [PostResolver, PostService],
  exports: [],
})

export class PostModule {
}

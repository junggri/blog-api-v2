import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostService } from '@src/post/post.service';
import { Post } from '@src/entities';
import { PaginationInput } from '@src/pagination/input/pagination.input';
import { PaginatedPost } from '@src/entities/pagination';
import { PostInput } from '@src/post/input/post.input';
import { GraphQLUpload } from 'graphql-upload';
import { FileUpload } from '@src/file/input/file.input';

@Resolver()
export class PostResolver {

  constructor(
    private readonly postService: PostService,
  ) {
  }

  @Query(() => PaginatedPost, { nullable: true })
  async getPaginationPost(@Args('data') data: PaginationInput) {
    return await this.postService.getPaginationPost(data);
  }

  @Query(() => Post)
  async getPost(@Args('data') data: number) {
    return await this.postService.getPost(data);

  }

  @Mutation(() => Post)
  async upsertPost(
    @Args('data') data: PostInput,
    @Args('file', { type: () => GraphQLUpload, nullable: true }) file: FileUpload,
  ) {
    return await this.postService.upsertPost(data, file);
  }


  @Mutation(() => String)
  async changePostState() {
  }

}

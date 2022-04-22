import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostService } from '@src/post/post.service';
import { Post } from '@src/entities';
import { PaginationInput } from '@src/pagination/input/pagination.input';
import { PaginatedPost } from '@src/entities/pagination';

@Resolver()
export class PostResolver {

  constructor(
    private readonly postService: PostService,
  ) {
  }

  @Query(() => [PaginatedPost], { nullable: true })
  async getPaginationPost(@Args('data') data: PaginationInput) {
    return this.postService.getPaginationPost(data);

  }

  @Query(() => Post)
  async getPost() {

  }

  @Mutation(() => Post)
  async upsertPost() {
  }

  @Mutation(() => String)
  async deletePost() {

  }

  @Mutation(() => String)
  async changePostState() {
  }

}

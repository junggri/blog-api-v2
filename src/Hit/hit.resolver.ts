import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { HitService } from '@src/Hit/hit.service';
import { ctx } from '@decorator/gqlContext.decorator';
import { Response } from 'express';
import { HitInput } from '@src/Hit/input/hit.input';

@Resolver()
export class HitResolver {
  constructor(
    private readonly hitService: HitService,
  ) {
  }

  @Mutation(() => String, { nullable: true })
  async createHit(@ctx() res: Response, @Args('data') data: HitInput) {
    return this.hitService.createHit(res, data);
  }
}

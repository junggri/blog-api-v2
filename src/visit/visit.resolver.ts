import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ctx } from '@decorator/gqlContext.decorator';
import { VisitInput } from '@src/visit/input/visit.input';
import { Response } from 'express';
import { DashBoardInput } from '@src/Hit/input/hit.input';
import { VisitService } from '@src/visit/visit.service';
import { Visit } from '@src/entities';

@Resolver()
export class VisitResolver {
  constructor(
    private readonly visitService: VisitService,
  ) {
  }

  @Query(() => [Visit], { nullable: true })
  async getVisitDashBoard(@Args('data') data: DashBoardInput) {
    return this.visitService.getVisitorDashBoard(data);
  }

  @Mutation(() => Int)
  async createVisit(@ctx() response: Response, @Args('data')data: VisitInput) {

  }
}

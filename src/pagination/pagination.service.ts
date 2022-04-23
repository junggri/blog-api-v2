import { Injectable } from '@nestjs/common';
import { PaginationInput } from '@src/pagination/input/pagination.input';
import { SelectQueryBuilder } from 'typeorm';
import { Post } from '@src/entities';
import { PageInfo } from '@src/entities/pagination';

@Injectable()
export class PaginationService {
  constructor() {
  }

  async pagination(
    { first, after, filter }: PaginationInput,
    //first start page id
    //after stop page id
    query: SelectQueryBuilder<Post>,
  ): Promise<{ leftCount: number, edges: { cursor: number, node: Post }[], pageInfo: PageInfo }> {
    const countQuery = query.clone();

    query.take(first);
    query.orderBy('post.id', 'DESC');

    //open 공개
    //is_published 저장 임시저장

    const openFlag = filter === 'open' ? 1 : 0;

    query.where('open = :open', { open: openFlag });

    if (after) {
      query.where('post.id < :id', { id: after });
    }

    const result = await query.getMany();

    const endCursorId = result.length > 0 ? result[result.length - 1].id : null;

    await countQuery
      .where('post.id < :id', { id: endCursorId });
    const countQueryOpenFlag = filter === 'open' ? 1 : 0;

    countQuery.andWhere('open = :open', { open: countQueryOpenFlag });

    const leftCount = await countQuery.getCount();

    const edges = result.map((e) => {
      return {
        cursor: e.id,
        node: e,
      };
    });

    const pageInfo = new PageInfo();
    pageInfo.endCursor = edges.length ? edges[edges.length - 1].cursor : null;
    pageInfo.hasNextPage = leftCount > 0;

    return { leftCount, edges, pageInfo };

  }
}

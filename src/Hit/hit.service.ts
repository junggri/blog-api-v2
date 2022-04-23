import { Inject, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { HitInput } from '@src/Hit/input/hit.input';
import { v4 } from 'uuid';
import { Hit } from '@src/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PostService } from '@src/post/post.service';
import { ONE_YEAR } from '../../core/constant';

@Injectable()
export class HitService {
  constructor(
    @InjectRepository(Hit) private hitRepository: Repository<Hit>,
    private readonly postService: PostService,
  ) {
  }

  parseCookie(value: string | undefined) {
    if (!value) {
      return [];
    }

    return Buffer.from(unescape(value), 'base64')
      .toString('ascii')
      .split(/_/g)
      .filter((i) => i);
  }

  async createHit(res: Response, data: HitInput) {
    const hitIdentifier = res.req.cookies['identifier'];
    const identifier = hitIdentifier || v4();

    const hitPost = this.parseCookie(
      res.req.cookies['viewed_post'],
    );

    if (hitPost.length > 100) {
      hitPost.splice(0, 1);
    }

    if (hitPost.indexOf(String(data.postId)) !== -1) {
      return null;
    }

    const post = await this.postService.getPost(data.postId);

    const insertResult = await this.hitRepository
      .createQueryBuilder('hit')
      .insert()
      .into(Hit)
      .values({
        postId: data.postId,
        identifier,
      })
      .execute();

    const hit = await this.hitRepository
      .createQueryBuilder('hit')
      .select()
      .where('hit.id = :id', { id: insertResult.identifiers[0].id })
      .getOne();

    if (hit) {
      res.cookie(
        'viewed_post',
        Buffer.from([...hitPost, data.postId].join('_')).toString('base64'),
        { maxAge: ONE_YEAR },
      );
    }

    if (!hitIdentifier) {
      res.cookie('identifier', identifier, { maxAge: ONE_YEAR });
    }

    return 'created';
  }
}

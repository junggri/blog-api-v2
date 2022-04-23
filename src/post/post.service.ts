import { Injectable } from '@nestjs/common';
import { Post } from '@src/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FileService } from '@src/file/file.service';
import { PaginationService } from '@src/pagination/pagination.service';
import { PaginationInput } from '@src/pagination/input/pagination.input';
import { PostInput } from '@src/post/input/post.input';
import { FileUpload } from '@src/file/input/file.input';
import path from 'path';


@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    private readonly fileService: FileService,
    private readonly paginationService: PaginationService,
  ) {
  }

  async getPaginationPost(data: PaginationInput) {
    const posts = await this.postRepository.createQueryBuilder('post').getMany();

    if (!posts.length) return null;

    const query = this.postRepository.createQueryBuilder('post');

    const { pageInfo, leftCount, edges } = await this.paginationService.pagination(data, query);

    const contentTable = {};

    const promises = edges.map((e) => {
      return new Promise((res, rej) => {
        res(this.fileService.getS3Data({
          path: 'content',
          data: e.node.id,
        }));
      });
    });

    const contents = await Promise.all(promises);

    contents.forEach((e: { postId: number, data: string }) => {
      contentTable[e.postId] = e.data;
    });

    edges.map((e) => {
      e.node.content = contentTable[e.node.id];
    });

    return { leftCount, edges, pageInfo };
  }

  async getPost(data: number) {
    //data is postid
    const post = await this.fileService.getS3Data({
      path: 'content',
      data: data,
    });

    const result = await this.postRepository
      .createQueryBuilder('post')
      .select()
      .where('post.id = :id', { id: data })
      .getOne();

    if (!result) {
      throw new Error('유효하지 않은 접근입니다.');
    }

    result.content = post.data;
    return result;
  }

  async upsertPost(data: PostInput, file: FileUpload) {
    let s3ImageName = data.thumbnail;
    let postId = data.id;

    if (file) {
      s3ImageName = s3ImageName || new Date().valueOf() + path.extname(file.filename);
      await this.fileService.upsertImage({ ...file, filename: s3ImageName });
    }

    if (data.id) {
      const post = await this.postRepository
        .createQueryBuilder('post')
        .select()
        .where('post.id = :id', { id: postId })
        .getOne();

      if (!post) {
        throw new Error('존재하지 않는 글입니다.');
      }

      await this.postRepository
        .createQueryBuilder('post')
        .update()
        .where('post.id = :id', { id: data.id })
        .set({
          title: data.title,
          description: data.description,
          open: data.open,
          isPublished: data.isPublished,
          type: data.type,
          thumbnail: s3ImageName,
        })
        .execute();

    } else {
      const result = await this.postRepository
        .createQueryBuilder('post')
        .insert()
        .into(Post)
        .values({
          title: data.title,
          description: data.description,
          open: data.open,
          isPublished: data.isPublished,
          type: data.type,
          thumbnail: s3ImageName,
        })
        .execute();

      postId = result.identifiers[0].id;
    }

    await this.fileService.upsertContent(data.content, data.id);

    const upsertPost = await this.postRepository
      .createQueryBuilder('post')
      .select()
      .where('post.id = :id', { id: postId })
      .getOne();

    return upsertPost;
  }


  async changePostState() {
  }

  async onApplicationBootstrap(): Promise<void> {
    if (process.env.NODE_ENV === 'production') return;
    for (let i = 0; i < 50; i++) {
      await this.postRepository
        .createQueryBuilder('post')
        .insert()
        .into(Post)
        .values({
          title: 'test',
          description: 'tset',
          isPublished: true,
          open: true,
          thumbnail: null,
          type: 'post',
        }).execute();

      await this.fileService.upsertContent('test', i + 1);
    }
  }


}

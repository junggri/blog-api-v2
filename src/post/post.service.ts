import { Injectable } from '@nestjs/common';
import { Post } from '@src/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FileService } from '@src/file/file.service';
import { PaginationService } from '@src/pagination/pagination.service';
import { PaginationInput } from '@src/pagination/input/pagination.input';

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


  }

  async getPost() {
  }

  async upsertPost() {
  }

  async deletePost() {
  }

  async changePostState() {
  }
}

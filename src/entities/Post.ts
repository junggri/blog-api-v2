import { Base } from '@src/entities/BaseEntity';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';

@ObjectType()
@Entity()
export class Post extends Base {
  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  isPublished: boolean;

  @Field()
  @Column()
  open: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  thumbnail?: string;

  @Column()
  @Field()
  type: 'post' | 'log';

  @Field()
  content: string;
}


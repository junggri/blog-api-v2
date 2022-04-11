import { Base } from '@src/entities/BaseEntity';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';


@ObjectType()
@Entity()
export class Hit extends Base {
  @Column({ type: 'int', nullable: false })
  postId: number;
}

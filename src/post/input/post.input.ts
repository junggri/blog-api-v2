import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class PostInput {
  @Field(() => ID, { nullable: true })
  id?: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field({ defaultValue: true })
  isPublished: boolean;

  @Field({ defaultValue: true })
  open: boolean;

  @Field({ nullable: true, defaultValue: null })
  thumbnail: string;

  @Field()
  type: 'post' | 'log';

  @Field()
  content: string;
}

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class VisitInput {
  @Field()
  lat: string;

  @Field()
  lon: string;
}

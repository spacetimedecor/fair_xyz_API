import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field() email: string;
}

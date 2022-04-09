import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUser {
  @Field() email: string;
}

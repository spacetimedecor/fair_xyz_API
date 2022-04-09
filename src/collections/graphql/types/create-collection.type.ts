import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCollection {
  @Field() name: string;
  @Field() launchDate?: Date;
}

import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field((type) => String, { nullable: false })
  email: string;
}

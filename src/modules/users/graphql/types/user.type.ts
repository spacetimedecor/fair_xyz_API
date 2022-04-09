import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field((type) => Int, { description: 'User ID' })
  id: number;

  @Field((type) => String, { description: 'User Email' })
  email: string;
}

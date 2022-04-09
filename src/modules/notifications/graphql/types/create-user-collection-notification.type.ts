import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserCollectionNotification {
  @Field() userEmail: string;
  @Field() collectionId: number;
}

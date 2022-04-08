import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CollectionType {
  @Field(() => ID, { description: 'Collection ID' })
  id: number;

  @Field({ description: 'Collection Name' })
  name: string;
}

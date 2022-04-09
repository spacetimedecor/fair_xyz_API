import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CollectionType {
  @Field(() => Int, { description: 'Collection ID' })
  id: number;

  @Field({ description: 'Collection Name' })
  name: string;

  @Field({ description: 'Collection Launch Date', nullable: true })
  launch_date?: Date;
}

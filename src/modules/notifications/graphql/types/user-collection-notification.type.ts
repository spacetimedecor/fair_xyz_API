import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserType } from '../../../users/graphql/types/user.type';
import { CollectionType } from '../../../collections/graphql/types/collection.type';

@ObjectType()
export class UserCollectionNotificationType {
  @Field((type) => Int, { description: 'User Collection Notification ID' })
  id: number;

  @Field({ description: 'User ID' })
  userId: number; // TODO: Shouldn't be number, should be int or id???

  @Field({ description: 'Collection ID' })
  collectionId: number;

  @Field(() => UserType, { description: 'User' })
  user: UserType;

  @Field(() => CollectionType, { description: 'Collection' })
  collection: CollectionType;
}

import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateCollection } from './create-collection.type';

@InputType()
export class UpdateCollection extends PartialType(CreateCollection) {
  @Field() id: number;
}

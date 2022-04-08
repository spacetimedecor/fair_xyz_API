import { Query, Resolver } from '@nestjs/graphql';
import { CollectionsService } from '../../collections.service';
import { CollectionType } from '../types/collection.type';

@Resolver((of) => CollectionType)
export class CollectionsResolver {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Query((returns) => [CollectionType])
  findAll() {
    return this.collectionsService.findAll({});
  }
}

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CollectionsService } from '../../collections.service';
import { CollectionType } from '../types/collection.type';
import { Injectable } from '@nestjs/common';
import { UpdateCollection } from '../types/update-collection.type';

@Resolver((of) => CollectionType)
@Injectable()
export class CollectionsResolver {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Query((returns) => [CollectionType], { name: 'collections' })
  async findAll() {
    return await this.collectionsService.findAll();
  }

  @Mutation((returns) => CollectionType, { name: 'updateCollection' })
  async updateCollection(@Args('collectionData') collection: UpdateCollection) {
    return await this.collectionsService.update({
      where: {
        id: collection.id,
      },
      data: collection,
    });
  }
}

import { Query, Resolver } from '@nestjs/graphql';
import { CollectionsService } from '../../collections.service';
import { CollectionType } from '../types/collection.type';
import { Injectable } from '@nestjs/common';

@Resolver((of) => CollectionType)
@Injectable()
export class CollectionsResolver {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Query((returns) => [CollectionType], { name: 'collections' })
  async findAll() {
    return await this.collectionsService.findAll();
  }
}

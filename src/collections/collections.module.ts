import { Module } from '@nestjs/common';
import { CollectionsResolver } from './graphql/resolvers/collections.resolver';
import { PrismaModule } from '../prisma/prisma.module';
import { CollectionsService } from './collections.service';

@Module({
  imports: [PrismaModule],
  providers: [CollectionsResolver, CollectionsService],
})
export class CollectionsModule {}

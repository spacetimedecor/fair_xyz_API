import { Module } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CollectionsResolver } from './graphql/resolvers/collections.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CollectionsResolver, CollectionsService],
})
export class CollectionsModule {}

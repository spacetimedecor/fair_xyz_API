import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { NotificationsService } from './notifications.service';
import { UserCollectionNotificationsResolver } from './graphql/resolvers/user-collection-notifications.resolver';

@Module({
  imports: [PrismaModule],
  providers: [NotificationsService, UserCollectionNotificationsResolver],
})
export class NotificationsModule {}

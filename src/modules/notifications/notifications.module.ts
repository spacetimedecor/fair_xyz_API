import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { NotificationsService } from './notifications.service';
import { UserCollectionNotificationsResolver } from './graphql/resolvers/user-collection-notifications.resolver';
import { MailModule } from '../mail/mail.module';
import { CollectionsModule } from '../collections/collections.module';
import { CollectionsService } from '../collections/collections.service';

@Module({
  imports: [PrismaModule, MailModule, CollectionsModule],
  providers: [
    NotificationsService,
    UserCollectionNotificationsResolver,
    CollectionsService,
  ],
})
export class NotificationsModule {}

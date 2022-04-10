import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  Prisma,
  UserCollectionNotification as UserCollectionNotificationModel,
  Collection as CollectionModel,
} from '@prisma/client';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MailService } from '../mail/mail.service';
import { CollectionsService } from '../collections/collections.service';
import * as moment from 'moment';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
    private readonly collectionsService: CollectionsService,
  ) {}

  async createUserCollectionNotification(
    data: Prisma.UserCollectionNotificationCreateInput,
  ): Promise<UserCollectionNotificationModel> {
    return await this.prisma.userCollectionNotification.create({
      data,
      include: {
        collection: true,
        user: true,
      },
    });
  }

  async forCollectionsLaunching({ in: { amount, unit } }) {
    // Find all collections launching in 30 minutes:
    const collectionsLaunchingInTimeRange =
      await this.collectionsService.findAllInTimeRange({
        amount: 30,
        unit: 'minutes',
      });

    // Find all users subscribed to these collections
    for (const collection of collectionsLaunchingInTimeRange) {
      console.log(`Launching in ${amount} ${unit}:`);
      console.log(collection.name);

      const usersSubscribedToCollection =
        await this.prisma.userCollectionNotification.findMany({
          where: {
            collectionId: collection.id,
          },
          include: {
            user: true,
          },
        });

      // Notify each user
      for (const { user } of usersSubscribedToCollection) {
        this.mailService.sendLaunchNotificationEmail({
          userEmail: user.email,
          timeUntilLaunch: `${amount} ${unit}`,
          collectionName: collection.name,
        });
      }
    }
  }

  @Cron(CronExpression.EVERY_30_MINUTES, {
    timeZone: 'Europe/Paris',
  })
  checkHalfHourly() {
    this.forCollectionsLaunching({ in: { amount: 30, unit: 'minutes' } });
  }

  @Cron(CronExpression.EVERY_HOUR, {
    timeZone: 'Europe/Paris',
  })
  checkHourly() {
    this.forCollectionsLaunching({ in: { amount: 1, unit: 'hour' } });
  }

  @Cron(CronExpression.EVERY_DAY_AT_4AM, {
    timeZone: 'Europe/Paris',
  })
  checkDaily() {
    this.forCollectionsLaunching({ in: { amount: 1, unit: 'day' } });
  }
}

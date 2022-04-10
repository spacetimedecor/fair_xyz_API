import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  Prisma,
  UserCollectionNotification as UserCollectionNotificationModel,
} from '@prisma/client';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MailService } from '../mail/mail.service';
import { CollectionsService } from '../collections/collections.service';

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

  async checkForCollectionsLaunching({ in: { amount, unit } }) {
    // Find all collections launching in 30 minutes:
    const collectionsLaunchingInTimeRange =
      await this.collectionsService.findAllInTimeRange({
        amount,
        unit,
      });

    // Find all users subscribed to these collections
    for (const collection of collectionsLaunchingInTimeRange) {
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

  // @Cron(CronExpression.EVERY_30_MINUTES, {
  //   timeZone: 'Europe/Paris',
  // })
  // halfHourly() {
  //   this.checkForCollectionsLaunching({ in: { amount: 30, unit: 'minutes' } });
  // }

  @Cron(CronExpression.EVERY_SECOND, {
    timeZone: 'Europe/Paris',
  })
  hourly() {
    this.checkForCollectionsLaunching({ in: { amount: 1, unit: 'hour' } });
  }

  // @Cron(CronExpression.EVERY_DAY_AT_4AM, {
  //   timeZone: 'Europe/Paris',
  // })
  // daily() {
  //   this.checkForCollectionsLaunching({ in: { amount: 1, unit: 'day' } });
  // }
}

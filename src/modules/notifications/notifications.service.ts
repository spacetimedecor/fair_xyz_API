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

  async notifyAboutCollectionsLaunching({
    in: { amount, unit },
    notificationFlag,
  }) {
    // Find all collections launching in range:
    const collectionsLaunchingInTimeRange =
      await this.collectionsService.findAllInTimeRange({
        amount,
        unit,
        notificationFlag,
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

      // and notify each user
      for (const { user } of usersSubscribedToCollection) {
        await this.mailService.sendLaunchNotificationEmail({
          userEmail: user.email,
          timeUntilLaunch: `${amount} ${unit}`,
          collectionName: collection.name,
        });
      }
    }

    // Then set respective collection notification flags
    for (const collection of collectionsLaunchingInTimeRange) {
      await this.collectionsService.update({
        where: {
          id: collection.id,
        },
        data: {
          [notificationFlag]: true,
        },
      });
    }

    return collectionsLaunchingInTimeRange;
  }

  @Cron(CronExpression.EVERY_MINUTE)
  minutely() {
    this.notifyAboutCollectionsLaunching({
      in: { amount: 1, unit: 'minute' },
      notificationFlag: 'launch_notification_final_sent',
    });

    this.notifyAboutCollectionsLaunching({
      in: { amount: 1, unit: 'hour' },
      notificationFlag: 'launch_notification_hourly_sent',
    });
  }

  @Cron(CronExpression.EVERY_DAY_AT_4AM)
  daily() {
    this.notifyAboutCollectionsLaunching({
      in: { amount: 1, unit: 'day' },
      notificationFlag: 'launch_notification_daily_sent',
    });
  }
}

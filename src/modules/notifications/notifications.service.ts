import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  Prisma,
  UserCollectionNotification as UserCollectionNotificationModel,
} from '@prisma/client';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MailService } from '../mail/mail.service';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
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

  @Cron(CronExpression.EVERY_30_SECONDS, {
    timeZone: 'Europe/Paris',
  })
  checkHalfHourly() {
    this.mailService.sendLaunchNotificationEmail({
      userEmail: 'spacetimedecor@gmail.com',
      timeUntilLaunch: '1day',
      collectionName: 'OIT',
    });
  }

  // @Cron(CronExpression.EVERY_HOUR, {
  //   timeZone: 'Europe/Paris',
  // })
  // checkHourly() {}
  //
  // @Cron(CronExpression.EVERY_DAY_AT_4AM, {
  //   timeZone: 'Europe/Paris',
  // })
  // checkDaily() {}
}

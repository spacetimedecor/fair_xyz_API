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

  @Cron(CronExpression.EVERY_30_MINUTES, {
    timeZone: 'Europe/Paris',
  })
  async checkHalfHourly() {
    const sent: boolean = await this.mailService.sendTestEmail('OIT');
    const test = 1;
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

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  Prisma,
  UserCollectionNotify as UserCollectionNotifyModel,
} from '@prisma/client';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async createUserCollectionNotify(
    data: Prisma.UserCollectionNotifyCreateInput,
  ): Promise<UserCollectionNotifyModel> {
    return await this.prisma.userCollectionNotify.create({
      data,
      include: {
        collection: true,
        user: true,
      },
    });
  }
}

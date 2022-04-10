import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Collection as CollectionModel, Prisma } from '@prisma/client';
import * as moment from 'moment';
import { unitOfTime } from 'moment';
import { notificationSentFlags } from '../notifications/notifications.service';

@Injectable()
export class CollectionsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.CollectionCreateInput): Promise<CollectionModel> {
    return this.prisma.collection.create({ data });
  }

  update(params: {
    where: Prisma.CollectionWhereUniqueInput;
    data: Prisma.CollectionUpdateInput;
  }): Promise<CollectionModel> {
    const { data, where } = params;
    return this.prisma.collection.update({
      data,
      where,
    });
  }

  findAll(args?: Prisma.CollectionFindManyArgs): Promise<CollectionModel[]> {
    return this.prisma.collection.findMany(args);
  }

  async findAllInTimeRange({ in: { amount, unit }, notificationSentFlag }) {
    const now = moment();
    let fromNow = moment().add(amount, unit);

    // Account for daylight savings
    if (now.isDST()) fromNow = fromNow.add(1, 'hour');

    return await this.findAll({
      where: {
        AND: [
          // If we're only sending once, check for sent flag:
          ...(notificationSentFlag
            ? [
                {
                  [notificationSentFlag]: {
                    equals: false,
                  },
                },
              ]
            : []),
          {
            launch_date: {
              gte: now.toDate(),
            },
          },
          {
            launch_date: {
              lte: fromNow.toDate(),
            },
          },
        ],
      },
    });
  }

  findOne(data: Prisma.CollectionWhereUniqueInput): Promise<CollectionModel> {
    return this.prisma.collection.findUnique({ where: data });
  }
}

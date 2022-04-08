import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Collection as CollectionModel, Prisma } from '@prisma/client';

@Injectable()
export class CollectionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.CollectionCreateInput): Promise<CollectionModel> {
    return await this.prisma.collection.create({ data });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CollectionWhereUniqueInput;
    where?: Prisma.CollectionWhereInput;
    orderBy?: Prisma.CollectionOrderByWithRelationInput;
  }): Promise<CollectionModel[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.collection.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async update(params: {
    where: Prisma.CollectionWhereUniqueInput;
    data: Prisma.CollectionUpdateInput;
  }): Promise<CollectionModel> {
    const { data, where } = params;
    return this.prisma.collection.update({
      data,
      where,
    });
  }
}

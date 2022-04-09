import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Collection as CollectionModel, Prisma } from '@prisma/client';

@Injectable()
export class CollectionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.CollectionCreateInput): Promise<CollectionModel> {
    return await this.prisma.collection.create({ data });
  }

  async findAll(): Promise<CollectionModel[]> {
    return this.prisma.collection.findMany();
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

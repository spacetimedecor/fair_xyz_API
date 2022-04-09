import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Collection as CollectionModel, Prisma } from '@prisma/client';

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

  findAll(): Promise<CollectionModel[]> {
    return this.prisma.collection.findMany();
  }

  findOne(data: Prisma.CollectionWhereUniqueInput): Promise<CollectionModel> {
    return this.prisma.collection.findUnique({ where: data });
  }
}

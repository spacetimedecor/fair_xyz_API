import { Injectable } from '@nestjs/common';
import { Prisma, User as UserModel } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput) {
    const { email } = data;
    // Check exists
    const user: UserModel | null = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    // If exists, return
    if (user) return user;

    // Otherwise, create and return
    return this.prisma.user.create({ data });
  }

  async findAll(): Promise<UserModel[]> {
    return this.prisma.user.findMany();
  }

  findOne(data: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({ where: data });
  }
}

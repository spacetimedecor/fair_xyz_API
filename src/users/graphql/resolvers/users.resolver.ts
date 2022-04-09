import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users.service';
import { UserType } from '../types/user.type';
import { UserInput } from '../types/create-user.type';

@Resolver((of) => UserType)
@Injectable()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation((returns) => UserType, { name: 'createUser' })
  async createUser(@Args('userData') user: UserInput) {
    return await this.usersService.create(user);
  }
}

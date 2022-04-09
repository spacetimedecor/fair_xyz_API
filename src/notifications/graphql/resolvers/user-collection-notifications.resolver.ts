import { UserCollectionNotificationType } from '../types/user-collection-notification.type';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { NotificationsService } from '../../notifications.service';
import { CreateUserCollectionNotification } from '../types/create-user-collection-notification.type';

@Resolver((of) => UserCollectionNotificationType)
@Injectable()
export class UserCollectionNotificationsResolver {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Mutation((returns) => UserCollectionNotificationType, {
    name: 'createNotification',
  })
  async createUserCollectionNotification(
    @Args('userCollectionNotificationData')
    createUserCollectionNotification: CreateUserCollectionNotification,
  ) {
    const { userEmail, collectionId } = createUserCollectionNotification;

    return await this.notificationsService.createUserCollectionNotify({
      user: {
        connectOrCreate: {
          where: { email: userEmail },
          create: { email: userEmail },
        },
      },
      collection: {
        connect: { id: collectionId },
      },
    });
  }
}

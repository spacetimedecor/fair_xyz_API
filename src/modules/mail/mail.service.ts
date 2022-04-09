import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class MailService {
  constructor(
    @InjectQueue('emails')
    private mailQueue: Queue,
  ) {}

  async sendLaunchNotificationEmail(launchNotificationEmailData: {
    userEmail: string;
    timeUntilLaunch: string;
    collectionName: string;
  }): Promise<boolean> {
    try {
      await this.mailQueue.add(launchNotificationEmailData);
      return true;
    } catch (error) {
      return false;
    }
  }
}

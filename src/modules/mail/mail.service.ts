import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class MailService {
  constructor(
    @InjectQueue('emails')
    private mailQueue: Queue,
  ) {}

  /** Send email confirmation link to new user account. */
  async sendTestEmail(userId: string): Promise<boolean> {
    try {
      await this.mailQueue.add('test', {
        userId,
      });
      return true;
    } catch (error) {
      // this.logger.error(`Error queueing confirmation email to user ${user.email}`)
      return false;
    }
  }
}

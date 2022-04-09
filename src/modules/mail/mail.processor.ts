import { MailerService } from '@nestjs-modules/mailer';
import { Logger } from '@nestjs/common';
import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { ConfigService } from '@nestjs/config';

@Processor('emails')
export class MailProcessor {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.debug(
      `Processing job ${job.id} of type ${job.name}. Data: ${JSON.stringify(
        job.data,
      )}`,
    );
  }

  @OnQueueCompleted()
  onComplete(job: Job, result: any) {
    this.logger.debug(
      `Completed job ${job.id} of type ${job.name}. Result: ${JSON.stringify(
        result,
      )}`,
    );
  }

  @OnQueueFailed()
  onError(job: Job<any>, error: any) {
    this.logger.error(
      `Failed job ${job.id} of type ${job.name}: ${error.message}`,
      error.stack,
    );
  }

  @Process()
  async sendLaunchNotificationEmail(
    job: Job<{
      userEmail: string;
      timeUntilLaunch: string;
      collectionName: string;
    }>,
  ): Promise<any> {
    const { userEmail, timeUntilLaunch, collectionName } = job.data;
    this.logger.log(`Sending test email to '${userEmail}'`);

    try {
      return await this.mailerService.sendMail({
        template: 'LaunchNotification',
        context: job.data,
        subject: `REMINDER - THE COLLECTION ${collectionName} LAUNCHES IN ${timeUntilLaunch}`,
        to: userEmail,
      });
    } catch (error) {
      this.logger.error(
        `Failed to send confirmation email to '${collectionName}'`,
        error.stack,
      );
      throw error;
    }
  }
}

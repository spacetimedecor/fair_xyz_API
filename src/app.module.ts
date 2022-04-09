import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './modules/prisma/prisma.service';
import { UsersModule } from './modules/users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CollectionsModule } from './modules/collections/collections.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MailModule } from './modules/mail/mail.module';
import { BullModule } from '@nestjs/bull';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true,
    }),
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('mail.host'),
          port: configService.get('mail.port'),
          secure: configService.get<boolean>('mail.secure'),
          tls: { ciphers: 'SSLv3' }, // gmail
          auth: {
            user: configService.get('mail.user'),
            pass: configService.get('mail.pass'),
          },
        },
        defaults: {
          from: configService.get('mail.from'),
        },
        template: {
          dir: __dirname + '/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get('redis.host'),
          port: configService.get('redis.port'),
          db: 0,
          password: configService.get('redis.password'),
        },
        defaultJobOptions: {
          attempts: 5,
          removeOnComplete: true,
          removeOnFail: false,
        },
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    ScheduleModule.forRoot(),
    NotificationsModule,
    UsersModule,
    CollectionsModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

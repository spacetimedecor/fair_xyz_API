-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "launch_notification_daily_sent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "launch_notification_final_sent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "launch_notification_hourly_sent" BOOLEAN NOT NULL DEFAULT false;

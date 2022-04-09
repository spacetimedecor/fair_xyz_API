/*
  Warnings:

  - You are about to drop the `UserCollectionNotify` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserCollectionNotify" DROP CONSTRAINT "UserCollectionNotify_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "UserCollectionNotify" DROP CONSTRAINT "UserCollectionNotify_userId_fkey";

-- DropTable
DROP TABLE "UserCollectionNotify";

-- CreateTable
CREATE TABLE "UserCollectionNotification" (
    "userId" INTEGER NOT NULL,
    "collectionId" INTEGER NOT NULL,

    CONSTRAINT "UserCollectionNotification_pkey" PRIMARY KEY ("userId","collectionId")
);

-- AddForeignKey
ALTER TABLE "UserCollectionNotification" ADD CONSTRAINT "UserCollectionNotification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCollectionNotification" ADD CONSTRAINT "UserCollectionNotification_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

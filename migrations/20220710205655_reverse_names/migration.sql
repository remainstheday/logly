/*
  Warnings:

  - You are about to drop the column `posterImage` on the `SiteContent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SiteContent" DROP COLUMN "posterImage",
ADD COLUMN     "staticPageImages" TEXT NOT NULL DEFAULT E'';

/*
  Warnings:

  - The `logoWidth` column on the `SiteContent` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `logoHeight` column on the `SiteContent` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "SiteContent" DROP COLUMN "logoWidth",
ADD COLUMN     "logoWidth" INTEGER,
DROP COLUMN "logoHeight",
ADD COLUMN     "logoHeight" INTEGER;

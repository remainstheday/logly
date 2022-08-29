-- AlterTable
ALTER TABLE "Artifact" ADD COLUMN     "altText" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "caption" TEXT NOT NULL DEFAULT E'';

-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "altText" TEXT NOT NULL DEFAULT E'';

-- CreateEnum
CREATE TYPE "ExperienceStatusType" AS ENUM ('published', 'draft');

-- CreateEnum
CREATE TYPE "ArtifactStatusType" AS ENUM ('published', 'draft');

-- CreateTable
CREATE TABLE "Site" (
    "id" UUID NOT NULL,
    "siteId" TEXT NOT NULL DEFAULT E'',
    "title" TEXT NOT NULL DEFAULT E'',
    "url" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "Site_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" UUID NOT NULL,
    "status" "ExperienceStatusType" NOT NULL DEFAULT E'draft',
    "title" TEXT NOT NULL DEFAULT E'',
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "experienceImages" TEXT NOT NULL DEFAULT E'',
    "description" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',
    "url" TEXT NOT NULL DEFAULT E'',
    "siteId" TEXT NOT NULL DEFAULT E'',
    "qrCodes" JSONB DEFAULT '[]',

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artifact" (
    "id" UUID NOT NULL,
    "status" "ArtifactStatusType" NOT NULL DEFAULT E'draft',
    "title" TEXT NOT NULL DEFAULT E'',
    "artist" TEXT NOT NULL DEFAULT E'',
    "artifactImages" TEXT NOT NULL DEFAULT E'',
    "audioFile" TEXT NOT NULL DEFAULT E'',
    "description" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',
    "url" TEXT NOT NULL DEFAULT E'',
    "siteId" TEXT NOT NULL DEFAULT E'',
    "qrCodes" JSONB DEFAULT '[]',

    CONSTRAINT "Artifact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "siteId" TEXT NOT NULL DEFAULT E'',
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL DEFAULT E'',
    "email" TEXT NOT NULL DEFAULT E'',
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteContent" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "title" TEXT NOT NULL DEFAULT E'',
    "staticPageImages" TEXT NOT NULL DEFAULT E'',
    "description" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',
    "url" TEXT NOT NULL DEFAULT E'',
    "siteId" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "SiteContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" UUID NOT NULL,
    "timestamp" TIMESTAMP(3),
    "username" TEXT NOT NULL DEFAULT E'',
    "image" TEXT NOT NULL DEFAULT E'',
    "comment" TEXT NOT NULL DEFAULT E'',
    "experienceURL" TEXT NOT NULL DEFAULT E'',
    "artifactURL" TEXT NOT NULL DEFAULT E'',
    "siteId" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Artifact_relatedExperiences" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Site_url_key" ON "Site"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Experience_url_key" ON "Experience"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Artifact_url_key" ON "Artifact"("url");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SiteContent_url_key" ON "SiteContent"("url");

-- CreateIndex
CREATE UNIQUE INDEX "_Artifact_relatedExperiences_AB_unique" ON "_Artifact_relatedExperiences"("A", "B");

-- CreateIndex
CREATE INDEX "_Artifact_relatedExperiences_B_index" ON "_Artifact_relatedExperiences"("B");

-- AddForeignKey
ALTER TABLE "_Artifact_relatedExperiences" ADD FOREIGN KEY ("A") REFERENCES "Artifact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Artifact_relatedExperiences" ADD FOREIGN KEY ("B") REFERENCES "Experience"("id") ON DELETE CASCADE ON UPDATE CASCADE;

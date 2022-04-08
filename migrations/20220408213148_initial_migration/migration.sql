-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "email" TEXT NOT NULL DEFAULT E'',
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StaticContent" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "title" TEXT NOT NULL DEFAULT E'',
    "poster" JSONB,
    "slug" TEXT NOT NULL DEFAULT E'',
    "description" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "StaticContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL DEFAULT E'',
    "slug" TEXT NOT NULL DEFAULT E'',
    "poster" JSONB,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "status" TEXT DEFAULT E'draft',
    "description" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artwork" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL DEFAULT E'',
    "artist" TEXT NOT NULL DEFAULT E'',
    "slug" TEXT NOT NULL DEFAULT E'',
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "status" TEXT DEFAULT E'draft',
    "audioFile_filesize" INTEGER,
    "audioFile_mode" TEXT,
    "audioFile_filename" TEXT,
    "images" JSONB,
    "description" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "Artwork_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Artwork_experiences" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "StaticContent_slug_key" ON "StaticContent"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Experience_slug_key" ON "Experience"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Artwork_slug_key" ON "Artwork"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "_Artwork_experiences_AB_unique" ON "_Artwork_experiences"("A", "B");

-- CreateIndex
CREATE INDEX "_Artwork_experiences_B_index" ON "_Artwork_experiences"("B");

-- AddForeignKey
ALTER TABLE "_Artwork_experiences" ADD FOREIGN KEY ("A") REFERENCES "Artwork"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Artwork_experiences" ADD FOREIGN KEY ("B") REFERENCES "Experience"("id") ON DELETE CASCADE ON UPDATE CASCADE;

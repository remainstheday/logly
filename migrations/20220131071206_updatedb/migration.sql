-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "email" TEXT NOT NULL DEFAULT E'',
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL DEFAULT E'',
    "slug" TEXT NOT NULL DEFAULT E'',
    "poster_filesize" INTEGER,
    "poster_extension" TEXT,
    "poster_width" INTEGER,
    "poster_height" INTEGER,
    "poster_mode" TEXT,
    "poster_id" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "status" TEXT DEFAULT E'draft',
    "content" JSONB NOT NULL DEFAULT E'[{"type":"paragraph","children":[{"text":""}]}]',

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
    "spotifyUrl" TEXT NOT NULL DEFAULT E'',
    "soundcloudUrl" TEXT NOT NULL DEFAULT E'',
    "audioFile_filesize" INTEGER,
    "audioFile_mode" TEXT,
    "audioFile_filename" TEXT,
    "images_filesize" INTEGER,
    "images_extension" TEXT,
    "images_width" INTEGER,
    "images_height" INTEGER,
    "images_mode" TEXT,
    "images_id" TEXT,
    "overview" JSONB NOT NULL DEFAULT E'[{"type":"paragraph","children":[{"text":""}]}]',

    CONSTRAINT "Artwork_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Experience_artworks" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Experience_slug_key" ON "Experience"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Artwork_slug_key" ON "Artwork"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "_Experience_artworks_AB_unique" ON "_Experience_artworks"("A", "B");

-- CreateIndex
CREATE INDEX "_Experience_artworks_B_index" ON "_Experience_artworks"("B");

-- AddForeignKey
ALTER TABLE "_Experience_artworks" ADD FOREIGN KEY ("A") REFERENCES "Artwork"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Experience_artworks" ADD FOREIGN KEY ("B") REFERENCES "Experience"("id") ON DELETE CASCADE ON UPDATE CASCADE;

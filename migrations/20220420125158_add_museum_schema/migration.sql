-- CreateTable
CREATE TABLE "Museum" (
    "id" UUID NOT NULL,
    "Title" TEXT NOT NULL DEFAULT E'',
    "slug" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "Museum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" UUID NOT NULL,
    "comment" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

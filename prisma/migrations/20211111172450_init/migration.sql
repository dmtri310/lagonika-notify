-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "post_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT,
    "price" TEXT,
    "image" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "is_expired" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_post_id_key" ON "Post"("post_id");

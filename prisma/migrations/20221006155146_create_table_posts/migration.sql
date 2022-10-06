-- CreateEnum
CREATE TYPE "Type" AS ENUM ('created', 'entered');

-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "chatroomId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" "Type" NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_chatroomId_fkey" FOREIGN KEY ("chatroomId") REFERENCES "chatrooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

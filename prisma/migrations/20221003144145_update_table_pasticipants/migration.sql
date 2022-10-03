/*
  Warnings:

  - Added the required column `lastStatus` to the `participants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "participants" ADD COLUMN     "lastStatus" BIGINT NOT NULL;

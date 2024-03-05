/*
  Warnings:

  - Added the required column `locale` to the `TranslationItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TranslationItem" ADD COLUMN     "locale" TEXT NOT NULL;

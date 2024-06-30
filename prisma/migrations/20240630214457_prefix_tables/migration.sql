/*
  Warnings:

  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Translation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TranslationItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "Translation" DROP CONSTRAINT "Translation_projectId_fkey";

-- DropForeignKey
ALTER TABLE "TranslationItem" DROP CONSTRAINT "TranslationItem_translationId_fkey";

-- DropTable
DROP TABLE "Project";

-- DropTable
DROP TABLE "Translation";

-- DropTable
DROP TABLE "TranslationItem";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "i18n_editor_User" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "i18n_editor_User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "i18n_editor_Project" (
    "id" SERIAL NOT NULL,
    "createdBy" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "locales" TEXT[],

    CONSTRAINT "i18n_editor_Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "i18n_editor_Translation" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "key" TEXT NOT NULL,

    CONSTRAINT "i18n_editor_Translation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "i18n_editor_TranslationItem" (
    "id" SERIAL NOT NULL,
    "translationId" INTEGER NOT NULL,
    "locale" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "i18n_editor_TranslationItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "i18n_editor_User_uuid_key" ON "i18n_editor_User"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "i18n_editor_User_name_key" ON "i18n_editor_User"("name");

-- AddForeignKey
ALTER TABLE "i18n_editor_Project" ADD CONSTRAINT "i18n_editor_Project_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "i18n_editor_User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "i18n_editor_Translation" ADD CONSTRAINT "i18n_editor_Translation_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "i18n_editor_Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "i18n_editor_TranslationItem" ADD CONSTRAINT "i18n_editor_TranslationItem_translationId_fkey" FOREIGN KEY ("translationId") REFERENCES "i18n_editor_Translation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

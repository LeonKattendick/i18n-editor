/*
  Warnings:

  - Changed the type of `createdBy` on the `Project` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_createdBy_fkey";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "createdBy",
ADD COLUMN     "createdBy" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

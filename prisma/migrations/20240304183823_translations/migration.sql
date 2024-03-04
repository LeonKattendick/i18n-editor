-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "locales" TEXT[];

-- CreateTable
CREATE TABLE "Translation" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "key" TEXT NOT NULL,

    CONSTRAINT "Translation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TranslationItem" (
    "id" SERIAL NOT NULL,
    "translationId" INTEGER NOT NULL,

    CONSTRAINT "TranslationItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Translation_key_key" ON "Translation"("key");

-- AddForeignKey
ALTER TABLE "Translation" ADD CONSTRAINT "Translation_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TranslationItem" ADD CONSTRAINT "TranslationItem_translationId_fkey" FOREIGN KEY ("translationId") REFERENCES "Translation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

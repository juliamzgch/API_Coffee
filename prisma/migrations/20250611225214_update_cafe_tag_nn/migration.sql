/*
  Warnings:

  - You are about to drop the `TagCafe` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TagCafe" DROP CONSTRAINT "TagCafe_cafeId_fkey";

-- DropTable
DROP TABLE "TagCafe";

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CafeTags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CafeTags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_nome_key" ON "Tag"("nome");

-- CreateIndex
CREATE INDEX "_CafeTags_B_index" ON "_CafeTags"("B");

-- AddForeignKey
ALTER TABLE "_CafeTags" ADD CONSTRAINT "_CafeTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Cafe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CafeTags" ADD CONSTRAINT "_CafeTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

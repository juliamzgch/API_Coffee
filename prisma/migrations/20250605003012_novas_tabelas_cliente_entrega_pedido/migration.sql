/*
  Warnings:

  - You are about to drop the column `nome` on the `ItemPedido` table. All the data in the column will be lost.
  - Added the required column `cafeId` to the `ItemPedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precoUnitario` to the `ItemPedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantidade` to the `ItemPedido` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pendente', 'emTransito', 'entregue');

-- DropForeignKey
ALTER TABLE "ItemPedido" DROP CONSTRAINT "ItemPedido_pedidoId_fkey";

-- AlterTable
ALTER TABLE "ItemPedido" DROP COLUMN "nome",
ADD COLUMN     "cafeId" INTEGER NOT NULL,
ADD COLUMN     "precoUnitario" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "quantidade" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "CPF" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pedido" (
    "id" SERIAL NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "dataPedido" TEXT NOT NULL,
    "totalPedido" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entrega" (
    "id" SERIAL NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'pendente',
    "enderecoEntrega" TEXT NOT NULL,
    "dataEntrega" TEXT NOT NULL,
    "pedidoId" INTEGER NOT NULL,

    CONSTRAINT "Entrega_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_email_key" ON "Cliente"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_CPF_key" ON "Cliente"("CPF");

-- CreateIndex
CREATE UNIQUE INDEX "Entrega_pedidoId_key" ON "Entrega"("pedidoId");

-- AddForeignKey
ALTER TABLE "ItemPedido" ADD CONSTRAINT "ItemPedido_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemPedido" ADD CONSTRAINT "ItemPedido_cafeId_fkey" FOREIGN KEY ("cafeId") REFERENCES "Cafe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entrega" ADD CONSTRAINT "Entrega_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

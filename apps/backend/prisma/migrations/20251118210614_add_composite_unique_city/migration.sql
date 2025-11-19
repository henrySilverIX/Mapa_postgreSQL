/*
  Warnings:

  - A unique constraint covering the columns `[nome,paisId]` on the table `Cidades` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Cidades_nome_paisId_key" ON "Cidades"("nome", "paisId");

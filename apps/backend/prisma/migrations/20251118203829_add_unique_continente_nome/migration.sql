/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `Continente` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[codigoISO3]` on the table `Pais` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `codigoISO3` to the `Pais` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pais" ADD COLUMN     "codigoISO3" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Continente_nome_key" ON "Continente"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Pais_codigoISO3_key" ON "Pais"("codigoISO3");

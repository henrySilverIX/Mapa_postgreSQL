-- CreateTable
CREATE TABLE "Continente" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "Continente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pais" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "populacao" INTEGER NOT NULL,
    "idioma_oficial" TEXT NOT NULL,
    "moeda" TEXT NOT NULL,
    "continenteId" INTEGER NOT NULL,

    CONSTRAINT "Pais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cidades" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "populacao" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "paisId" INTEGER NOT NULL,

    CONSTRAINT "Cidades_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pais" ADD CONSTRAINT "Pais_continenteId_fkey" FOREIGN KEY ("continenteId") REFERENCES "Continente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cidades" ADD CONSTRAINT "Cidades_paisId_fkey" FOREIGN KEY ("paisId") REFERENCES "Pais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

import {PrismaClient} from "@prisma/client";

export const prisma = new PrismaClient();

// Fechar a conexão com o banco de dados ao encerrar o aplicativo
process.on("beforeExit", async () => {
    await prisma.$disconnect();
});
import { prisma } from '../db';


export class ContinenteService {
    async criar(nome: string, descricao: string){
        return prisma.continente.create({
            data: { nome, descricao }
        });
    }

    async listar() {
        return prisma.continente.findMany({
            include: {
                paises: true,
            }
        });
    }

    async buscarPorId(id: number) {
        return prisma.continente.findUnique({
            where: { id },
            include: {
                paises: true,
            }
        });
    }

    async atualizar(id: number, nome: string, descricao: string) {
        try {
            return prisma.continente.update({
            where: { id },
            data: {
                nome,
                descricao: descricao ?? ""
            }
            });
        } catch (err: any) {
            if (err.code === "P2002") {
            throw new Error("Já existe um continente com esse nome");
            }
            throw err;
        }
    }



    async deletar(id: number) {
    // Buscar países associados ao continente
    const paises = await prisma.pais.findMany({
        where: { continenteId: id },
        include: { cidades: true }
    });

    // Excluir cidades de cada país
    for (const pais of paises) {
        await prisma.cidades.deleteMany({
        where: { paisId: pais.id }
        });
    }

    // Agora excluir os países
    await prisma.pais.deleteMany({
        where: { continenteId: id }
    });

    // Por fim, excluir o continente
    return prisma.continente.delete({
        where: { id }
    });
    }

}


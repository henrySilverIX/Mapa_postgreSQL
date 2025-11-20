import { prisma } from  "../db";


export class PaisService {
    
    
    async criar(data: {
        codigoISO3: string;
        nome: string;
        populacao: number;
        idioma_oficial: string;
        moeda: string;
        continenteId: number;
    }) {
        return prisma.pais.create({
            data
        });
    }

    async listar() {
        return prisma.pais.findMany({
            include: {
                continente: true,
                cidades: true
            }
        });
    }

    async buscarPorId(id: number){
        return prisma.pais.findUnique({
            where: { id },
            include: {
                continente: true,
                cidades: true
            }
        });
    }

    async atualizar(id: number, data: {
    codigoISO3?: string;
    nome?: string;
    populacao?: number;
    idioma_oficial?: string;
    moeda?: string;
    continenteId?: number;
    }) {
        return prisma.pais.update({
            where: { id },
            data: {
                codigoISO3: data.codigoISO3?.toUpperCase(),
                nome: data.nome,
                populacao: Number(data.populacao),
                idioma_oficial: data.idioma_oficial,
                moeda: data.moeda,
                continenteId: Number(data.continenteId)
            }
        });
    }

    async deletar(id: number) {
    // apaga cidades antes (para não violar FK)
    await prisma.cidades.deleteMany({
        where: { paisId: id }
    });

    // agora apaga o país
    return prisma.pais.delete({
        where: { id }
    });
    }
}
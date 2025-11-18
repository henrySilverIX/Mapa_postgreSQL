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
            data
        });
    }

    async deletar(id: number) {
        return prisma.pais.delete({
            where: { id }
        });
    }
}
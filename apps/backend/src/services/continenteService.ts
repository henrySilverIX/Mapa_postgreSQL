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
        return prisma.continente.update({
            where: { id },
            data: { nome, descricao }
        });
    }

    async deletar(id: number) {
        return prisma.continente.delete({
            where: { id }
        });
    }
}


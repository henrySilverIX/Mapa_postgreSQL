import { prisma } from "../db";

export class CidadeService {

  async criar(data: {
    nome: string;
    populacao: number;
    latitude: number;
    longitude: number;
    paisId: number;
  }) {
    return prisma.cidades.create({
      data
    });
  }

  async listar() {
    return prisma.cidades.findMany({
      include: {
        pais: true
      }
    });
  }

  async buscarPorId(id: number) {
    return prisma.cidades.findUnique({
      where: { id },
      include: {
        pais: true
      }
    });
  }

  async atualizar(id: number, data: {
    nome?: string;
    populacao?: number;
    latitude?: number;
    longitude?: number;
    paisId?: number;
  }) {
    return prisma.cidades.update({
      where: { id },
      data
    });
  }

  async deletar(id: number) {
    return prisma.cidades.delete({
      where: { id }
    });
  }
}

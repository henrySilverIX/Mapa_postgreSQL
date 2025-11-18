import { Request, Response } from 'express';
import { PaisService } from '../services/paisService';


const service = new PaisService();

export class PaisController {
    async criar (req: Request, res: Response) {
        const { codigoISO3, nome, populacao, idioma_oficial, moeda, continenteId } = req.body;

        try {
            const pais = await service.criar({
                codigoISO3,
                nome,
                populacao,
                idioma_oficial,
                moeda,
                continenteId
            });

            return res.status(201).json(pais);
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: 'Erro ao criar país' });
        }
    }

    async listar (req: Request, res: Response) {
        const paises = await service.listar();
        return res.json(paises);
    }

    async buscarPorId (req: Request, res: Response) {
        const id = Number(req.params.id);
        const pais = await service.buscarPorId(id);

        if (!pais) {
            return res.status(404).json({ error: 'País não encontrado' });
        }

        return res.json(pais);
    }

    async atualizar (req: Request, res: Response) {
        const id = Number(req.params.id);
        const dados = req.body;

        try {
            const atualizado = await service.atualizar(id, dados);
            return res.json(atualizado);
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao atualizar país' });
        }
    }


    async deletar (req: Request, res: Response) {
        const id = Number(req.params.id);

        try {
            await service.deletar(id);
            return res.sendStatus(204);
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao deletar país' });
        }
    }
}
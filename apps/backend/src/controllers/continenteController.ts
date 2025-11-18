import { Request, Response } from 'express';
import { ContinenteService } from '../services/continenteService';

const service = new ContinenteService();

export class ContinenteController {
    async criar(req: Request, res: Response) {
        const { nome, descricao } = req.body;
        const continente = await service.criar(nome, descricao);
        res.status(201).json(continente);
    }

    async listar(req: Request, res: Response) {
        const continentes = await service.listar();
        res.json(continentes);
    }

    async buscarPorId(req: Request, res: Response) {
        const id = Number(req.params.id);
        const continente = await service.buscarPorId(id);
        res.json(continente);
    }

    async atualizar(req: Request, res: Response) {
        const id = Number(req.params.id);
        const { nome, descricao } = req.body;
        const atualizado = await service.atualizar(id, nome, descricao);
        res.json(atualizado);
    }
    
    async deletar(req: Request, res: Response) {
        const id = Number(req.params.id);
        await service.deletar(id);
        res.sendStatus(204);
    }
}
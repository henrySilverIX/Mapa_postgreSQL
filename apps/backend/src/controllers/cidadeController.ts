import { Request, Response } from "express";
import { CidadeService } from "../services/cidadeService";

const service = new CidadeService();

export class CidadeController {
  
  async criar(req: Request, res: Response) {
    const { nome, populacao, latitude, longitude, paisId } = req.body;

    try {
      const cidade = await service.criar({
        nome,
        populacao,
        latitude,
        longitude,
        paisId
      });

      return res.status(201).json(cidade);

    } catch (err) {
      console.error(err);
      return res.status(400).json({ error: "Erro ao criar cidade" });
    }
  }

  async listar(req: Request, res: Response) {
    const cidades = await service.listar();
    return res.json(cidades);
  }

  async buscarPorId(req: Request, res: Response) {
    const id = Number(req.params.id);
    const cidade = await service.buscarPorId(id);

    if (!cidade) {
      return res.status(404).json({ error: "Cidade não encontrada" });
    }

    return res.json(cidade);
  }

  async atualizar(req: Request, res: Response) {
    const id = Number(req.params.id);
    const dados = req.body;

    try {
      const atualizada = await service.atualizar(id, dados);
      return res.json(atualizada);

    } catch (err) {
      return res.status(400).json({ error: "Erro ao atualizar cidade" });
    }
  }

  async deletar(req: Request, res: Response) {
    const id = Number(req.params.id);

    try {
      await service.deletar(id);
      return res.sendStatus(204);

    } catch (err) {
      return res.status(400).json({ error: "Erro ao deletar cidade" });
    }
  }
}

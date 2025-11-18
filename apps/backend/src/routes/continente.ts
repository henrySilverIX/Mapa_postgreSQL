import { Router } from 'express';
import { ContinenteController } from '../controllers/continenteController';

const router = Router();
const controller = new ContinenteController();

router.post("/", controller.criar);
router.get("/", controller.listar);
router.get("/:id", controller.buscarPorId);
router.put("/:id", controller.atualizar);
router.delete("/:id", controller.deletar);

export default router;
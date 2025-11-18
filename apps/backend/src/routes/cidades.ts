import { Router } from "express";
import { CidadeController } from "../controllers/cidadeController";

const router = Router();
const controller = new CidadeController();

router.post("/", controller.criar);
router.get("/", controller.listar);
router.get("/:id", controller.buscarPorId);
router.put("/:id", controller.atualizar);
router.delete("/:id", controller.deletar);

export default router;

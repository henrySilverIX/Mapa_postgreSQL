import { Router } from "express";
import { PaisController } from "../controllers/paisController";

const router = Router();
const controller = new PaisController();

router.post("/", controller.criar);
router.get("/", controller.listar);
router.get("/codigo/:iso3", controller.buscarPorCodigoISO3);

router.get("/:id", controller.buscarPorId);
router.put("/:id", controller.atualizar);
router.delete("/:id", controller.deletar);

export default router;

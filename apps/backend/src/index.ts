import express from "express";
import {prisma} from "./db";

const router = express.Router();

router.get("/continents", async (req, res) => {
    try {
        const continents = await prisma.continente.findMany();
        res.json(continents);
} catch (error){
    res.status(500).json({error: "Erro ao buscar continentes"});
}
});

router.get("/", (_req, res) => {
    res.send("API rodando com Prisma e PostgreSQL");
});

export default router;
import express from "express";
import { listarAvaliacoes, criarAvaliacao } from "../controllers/avaliacoes.controller.js";

const router = express.Router();

// Rota para listar todas as avaliações
router.get("/", listarAvaliacoes);

// Rota para criar uma nova avaliação
router.post("/", criarAvaliacao);

export default router;
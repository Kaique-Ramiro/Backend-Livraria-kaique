import express from "express";
import {
  listarLivros,
  obterLivro,
  criarLivro,
  atualizarLivro,
  deletarLivro
} from "../controllers/livro.controllers.js";

const router = express.Router();

router.get("/", listarLivros);
router.post("/", criarLivro);
router.get("/:id", obterLivro);
router.put("/:id", atualizarLivro);
router.delete("/:id", deletarLivro);

export default router;


import express from "express";
import {
  listarLivros,
  obterLivro,
  criarLivro,
  atualizarLivro,
  deletarLivro,
} from "../controllers/livro.controllers.js";

const router = express.Router();

// Retorna todos os livros
router.get("/", listarLivros);

// Retorna um livro específico pelo ID
router.get("/:id", obterLivro);

// Cria um novo livro
router.post("/", criarLivro);

// Atualiza os dados de um livro existente
router.put("/:id", atualizarLivro);

// Exclui um livro pelo ID
router.delete("/:id", deletarLivro);

export default router;
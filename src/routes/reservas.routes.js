import express from "express";
import {
  listarReservas,
  criarReserva,
  excluirReserva
} from "../controllers/reservas.controller.js";

const router = express.Router();

router.get("/", listarReservas);     // lista todas as reservas
router.post("/", criarReserva);      // cria uma nova reserva
router.delete("/:id", excluirReserva); // exclui reserva pelo ID

export default router;
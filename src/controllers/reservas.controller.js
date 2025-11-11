import { db } from "../config/db.js";

// LISTAR RESERVAS

export const listarReservas = async (req, res) => {
  try {
    const sql = `
      SELECT 
        r.id AS id_reserva,
        r.data_reserva,
        u.nome AS nome_usuario,
        l.titulo AS titulo_livro
      FROM reservas r
      JOIN usuarios u ON r.usuario_id = u.id
      JOIN livros l ON r.livro_id = l.id
      ORDER BY r.id DESC
    `;
    const [rows] = await db.query(sql);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Erro ao listar reservas:", error);
    res.status(500).json({ message: "Erro ao buscar reservas" });
  }
};


// CRIAR RESERVA

export const criarReserva = async (req, res) => {
  try {
    const { usuario_id, livro_id, data_reserva } = req.body;

    // validação simples
    if (!usuario_id || !livro_id) {
      return res
        .status(400)
        .json({ message: "Preencha os campos obrigatórios: usuario_id e livro_id" });
    }

    const sql = `
      INSERT INTO reservas (usuario_id, livro_id, data_reserva)
      VALUES (?, ?, ?)
    `;
    await db.query(sql, [usuario_id, livro_id, data_reserva || new Date()]);

    res.status(201).json({ message: "Reserva criada com sucesso!" });
  } catch (error) {
    console.error("Erro ao criar reserva:", error);
    res.status(500).json({ message: "Erro ao criar reserva" });
  }
};

// EXCLUIR RESERVA

export const excluirReserva = async (req, res) => {
  try {
    const { id } = req.params;

    const sql = "DELETE FROM reservas WHERE id = ?";
    const [result] = await db.query(sql, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Reserva não encontrada" });
    }

    res.status(200).json({ message: "Reserva excluída com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir reserva:", error);
    res.status(500).json({ message: "Erro ao excluir reserva" });
  }
};

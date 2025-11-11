import { db } from "../config/db.js";

// LISTAR FAVORITOS

export const listarFavoritos = async (req, res) => {
  try {
    const sql = `
      SELECT 
        f.id AS id_favorito,
        u.nome AS nome_usuario,
        l.titulo AS titulo_livro
      FROM favoritos f
      JOIN usuarios u ON f.usuario_id = u.id
      JOIN livros l ON f.livro_id = l.id
    `;

    const [rows] = await db.query(sql);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Erro ao listar favoritos:", error);
    res.status(500).json({ mensagem: "Erro ao buscar favoritos" });
  }
};


// CRIAR FAVORITO

export const criarFavorito = async (req, res) => {
  try {
    const { usuario_id, livro_id } = req.body;

    if (!usuario_id || !livro_id) {
      return res.status(400).json({ mensagem: "Informe usuario_id e livro_id" });
    }

    const sql = `
      INSERT INTO favoritos (usuario_id, livro_id)
      VALUES (?, ?)
    `;
    await db.query(sql, [usuario_id, livro_id]);

    res.status(201).json({ mensagem: "Livro adicionado aos favoritos!" });
  } catch (error) {
    console.error("Erro ao adicionar favorito:", error);
    res.status(500).json({ mensagem: "Erro ao criar favorito" });
  }
};


// EXCLUIR FAVORITO

export const excluirFavorito = async (req, res) => {
  try {
    const { id } = req.params;

    const sql = `DELETE FROM favoritos WHERE id = ?`;
    const [resultado] = await db.query(sql, [id]);

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensagem: "Favorito não encontrado" });
    }

    res.status(200).json({ mensagem: "Favorito removido com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir favorito:", error);
    res.status(500).json({ mensagem: "Erro ao excluir favorito" });
  }
};
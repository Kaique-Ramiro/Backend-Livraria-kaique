import { db } from "../config/db.js"; // importa a conexão com o banco

// ============================
// LISTAR AVALIAÇÕES
// ============================
export const listarAvaliacoes = async (req, res) => {
  try {
    const sql = `
      SELECT 
        a.id AS id_avaliacao,
        a.comentario,
        a.nota,
        u.nome AS nome_usuario,
        l.titulo AS titulo_livro
      FROM avaliacoes a
      JOIN usuarios u ON a.usuario_id = u.id
      JOIN livros l ON a.livro_id = l.id
    `;

    const [rows] = await db.query(sql);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Erro ao listar avaliações:", error);
    res.status(500).json({ message: "Erro ao buscar avaliações" });
  }
};

// ============================
// CRIAR AVALIAÇÃO
// ============================
export const criarAvaliacao = async (req, res) => {
  try {
    const { usuario_id, livro_id, comentario, nota } = req.body;

    // validação simples
    if (!usuario_id || !livro_id || !comentario || !nota) {
      return res
        .status(400)
        .json({ message: "Preencha todos os campos: usuario_id, livro_id, comentario e nota" });
    }

    const sql = `
      INSERT INTO avaliacoes (usuario_id, livro_id, comentario, nota)
      VALUES (?, ?, ?, ?)
    `;
    await db.query(sql, [usuario_id, livro_id, comentario, nota]);

    res.status(201).json({ message: "Avaliação criada com sucesso!" });
  } catch (error) {
    console.error("Erro ao criar avaliação:", error);
    res.status(500).json({ message: "Erro ao criar avaliação" });
  }
};
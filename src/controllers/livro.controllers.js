import { db } from "../config/db.js";


// LISTAR LIVROS

export const listarLivros = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM livros");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Erro ao listar livros:", error);
    res.status(500).json({ message: "Erro ao buscar livros" });
  }
};


// OBTER LIVRO POR ID

export const obterLivro = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query("SELECT * FROM livros WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Livro não encontrado" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Erro ao buscar livro:", error);
    res.status(500).json({ message: "Erro ao buscar livro" });
  }
};


// CRIAR LIVRO

export const criarLivro = async (req, res) => {
  try {
    const { titulo, autor } = req.body;

    if (!titulo || !autor) {
      return res.status(400).json({ message: "Título e autor são obrigatórios" });
    }

    const sql = "INSERT INTO livros (titulo, autor) VALUES (?, ?)";
    const [result] = await db.query(sql, [titulo, autor]);

    res.status(201).json({
      id: result.insertId,
      titulo,
      autor
    });
  } catch (error) {
    console.error("Erro ao criar livro:", error);
    res.status(500).json({ message: "Erro ao criar livro" });
  }
};


// ATUALIZAR LIVRO

export const atualizarLivro = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, autor } = req.body;

    const [livroExistente] = await db.query("SELECT * FROM livros WHERE id = ?", [id]);
    if (livroExistente.length === 0) {
      return res.status(404).json({ message: "Livro não encontrado" });
    }

    const sql = "UPDATE livros SET titulo = ?, autor = ? WHERE id = ?";
    await db.query(sql, [titulo || livroExistente[0].titulo, autor || livroExistente[0].autor, id]);

    res.status(200).json({ id, titulo, autor });
  } catch (error) {
    console.error("Erro ao atualizar livro:", error);
    res.status(500).json({ message: "Erro ao atualizar livro" });
  }
};


// DELETAR LIVRO

export const deletarLivro = async (req, res) => {
  try {
    const { id } = req.params;
    const [livroExistente] = await db.query("SELECT * FROM livros WHERE id = ?", [id]);

    if (livroExistente.length === 0) {
      return res.status(404).json({ message: "Livro não encontrado" });
    }

    await db.query("DELETE FROM livros WHERE id = ?", [id]);
    res.status(204).send();
  } catch (error) {
    console.error("Erro ao excluir livro:", error);
    res.status(500).json({ message: "Erro ao excluir livro" });
  }
};

let livros = [
  { id: 1, titulo: "Dom Casmurro", autor: "Machado de Assis" },
  { id: 2, titulo: "O Cortiço", autor: "Aluísio Azevedo" }
];

// Listar todos os livros
export const listarLivros = async (req, res) => {
  try {
    res.status(200).json(livros);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao listar os livros." });
  }
};

// Obter um livro específico pelo ID
export const obterLivro = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const livro = livros.find(l => l.id === id);

    if (!livro) {
      return res.status(404).json({ erro: "Livro não encontrado." });
    }

    res.status(200).json(livro);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar o livro." });
  }
};

// Criar um novo livro
export const criarLivro = async (req, res) => {
  try {
    const novoLivro = {
      id: livros.length + 1,
      titulo: req.body.titulo,
      autor: req.body.autor
    };

    livros.push(novoLivro);
    res.status(201).json(novoLivro);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao criar o livro." });
  }
};

// Atualizar um livro existente
export const atualizarLivro = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const livro = livros.find(l => l.id === id);

    if (!livro) {
      return res.status(404).json({ erro: "Livro não encontrado." });
    }

    livro.titulo = req.body.titulo || livro.titulo;
    livro.autor = req.body.autor || livro.autor;

    res.status(200).json(livro);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar o livro." });
  }
};

// Deletar um livro pelo ID
export const deletarLivro = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = livros.findIndex(l => l.id === id);

    if (index === -1) {
      return res.status(404).json({ erro: "Livro não encontrado." });
    }

    livros.splice(index, 1);
    res.status(204).send(); // sem conteúdo
  } catch (error) {
    res.status(500).json({ erro: "Erro ao excluir o livro." });
  }
};
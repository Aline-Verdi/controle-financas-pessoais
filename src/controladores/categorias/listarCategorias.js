const pool = require('../../config/conexao');

const listarCategorias = async (_req, res) => {

    try {
        const queryListarCategorias = 'SELECT * FROM categorias';
        const { rows } = await pool.query(queryListarCategorias);

        return res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor!' });
    }
    
};

module.exports = { listarCategorias };
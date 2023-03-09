const pool = require('../../config/conexao');

const excluirTransacao = async (req, res) => {
    const { id } = req.params;
    const { usuarioLogado } = req;

    try {
        const queryIdTransacao = 'SELECT * FROM transacoes WHERE usuario_id = $1 AND id = $2';
        const { rowCount } = await pool.query(queryIdTransacao, [usuarioLogado.id, id]);

        if (!rowCount) {
            return res.status(400).json({ mensagem: 'Transação não encontrada!' });
        }

        const queryExcluirTransacao = 'DELETE FROM transacoes WHERE id = $1';
        const { rowCount: resultadoExcluirTransacao } = await pool.query(queryExcluirTransacao, [id]);

        if (!resultadoExcluirTransacao) {
            return res.status(400).json({ mensagem: 'Erro interno do servidor!' });
        }

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor!' });
    }
};

module.exports = { excluirTransacao };
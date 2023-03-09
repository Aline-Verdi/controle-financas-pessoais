const pool = require('../../config/conexao');

const detalharTransacao = async (req, res) => {
    const { id } = req.params;
    const { usuarioLogado } = req;

    try {
        const queryDetalharTransacao = `SELECT transacoes.id, transacoes.tipo, transacoes.descricao, transacoes.valor, transacoes.data,
        transacoes.usuario_id, transacoes.categoria_id, categorias.descricao AS categoria_nome FROM transacoes
        JOIN categorias ON ( categorias.id = transacoes.categoria_id) WHERE transacoes.id = $1 AND transacoes.usuario_id = $2`;
        const { rows, rowCount } = await pool.query(queryDetalharTransacao, [id, usuarioLogado.id]);

        if (!rowCount) {
            return res.status(400).json({ mensagem: 'Transação não encontrada!' });
        }

        return res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor!' });
    }
};

module.exports = { detalharTransacao };
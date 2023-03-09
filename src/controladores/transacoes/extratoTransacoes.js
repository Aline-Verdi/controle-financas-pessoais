const pool = require('../../config/conexao');

const extratoTransacoes = async (req, res) => {
    const { id } = req.usuarioLogado;

    try {
        const queryExtrato = 'SELECT SUM(valor) AS valor FROM transacoes WHERE usuario_id = $1 AND tipo = $2';
        const resultadoEntrada = await pool.query(queryExtrato, [id, 'entrada']);
        const resultadoSaida = await pool.query(queryExtrato, [id, 'saida']);

        if (resultadoEntrada.rowCount > 0) {
            entrada = resultadoEntrada.rows[0];
        }

        if (resultadoSaida.rowCount > 0) {
            saida = resultadoSaida.rows[0];
        }

        const resultadoTotal = {
            entrada: Number(entrada.valor),
            saida: Number(saida.valor)
        };

        return res.status(200).json(resultadoTotal);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor!' });
    }
};

module.exports = { extratoTransacoes };
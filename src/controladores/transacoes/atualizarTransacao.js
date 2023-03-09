const pool = require('../../config/conexao');

const atualizarTransacao = async (req, res) => {
    const { descricao, valor, data, categoria_id, tipo } = req.body;
    const { id } = req.params;
    const { usuarioLogado } = req;

    if (!descricao) {
        return res.status(400).json({ mensagem: 'O campo descrição é obrigatório!' });
    }

    if (!valor) {
        return res.status(400).json({ mensagem: 'O campo valor é obrigatório!' });
    }

    if (!data) {
        return res.status(400).json({ mensagem: 'O campo data é obrigatório!' });
    }

    if (!categoria_id) {
        return res.status(400).json({ mensagem: 'O campo id da categoria é obrigatório!' });
    }

    if (!tipo) {
        return res.status(400).json({ mensagem: 'O campo tipo é obrigatório!' });
    }

    if (tipo !== 'entrada' && tipo !== 'saida') {
        return res.status(400).json({ mensagem: "O campo 'tipo' deverá ser preeenchido com 'entrada' ou 'saida'!" });
    }

    try {
        const queryIdTransacao = 'SELECT * FROM transacoes WHERE usuario_id = $1 AND id = $2';
        const { rowCount } = await pool.query(queryIdTransacao, [usuarioLogado.id, id]);

        if (!rowCount) {
            return res.status(400).json({ mensagem: 'Transação não encontrada!' });
        }

        const queryIdCategoria = 'SELECT * FROM categorias WHERE id = $1';
        const { rowCount: resultadoIDCategoria } = await pool.query(queryIdCategoria, [categoria_id]);

        if (!resultadoIDCategoria) {
            return res.status(400).json({ mensagem: 'Não existe o ID cadastrado na categoria!' });
        }

        const queryAtualizarTransacao = `UPDATE transacoes SET descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5
        WHERE id = $6`;
        const paramAtualizarTransacao = [descricao, valor, data, categoria_id, tipo, id];
        const { rowCount: resultadoAtualizarTransacao } = await pool.query(queryAtualizarTransacao, paramAtualizarTransacao);

        if (!resultadoAtualizarTransacao) {
            return res.status(400).json({ mensagem: 'Erro interno do servidor!' });
        }

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor!' });
    }
};

module.exports = { atualizarTransacao };
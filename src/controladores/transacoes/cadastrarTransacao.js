const pool = require('../../config/conexao');

const cadastrarTransacao = async (req, res) => {
    const { descricao, valor, data, categoria_id, tipo } = req.body;
    const { id } = req.usuarioLogado;

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
        const queryIdCategoria = 'SELECT * FROM categorias WHERE id = $1';
        const { rowCount: resultadoIDCategoria } = await pool.query(queryIdCategoria, [categoria_id]);

        if (!resultadoIDCategoria) {
            return res.status(400).json({ mensagem: 'Não existe o ID cadastrado na categoria!' });
        }

        const queryCadastrarTransacao = `INSERT INTO transacoes
        (descricao, valor, data, categoria_id, usuario_id, tipo)
        values ($1, $2, $3, $4, $5, $6) returning *`;
        const paramCadastrarTransacao = [descricao, valor, data, categoria_id, id, tipo];
        const { rows: transacao, rowCount: resultadoCadastrarTransacao } = await pool.query(queryCadastrarTransacao, paramCadastrarTransacao);

        if (!resultadoCadastrarTransacao) {
            return res.status(500).json({ mensagem: 'Erro interno do servidor!' });
        }

        const transacaoCadastrada = transacao[0].id;

        const queryCategorias = `SELECT transacoes.id, transacoes.tipo, transacoes.descricao, transacoes.valor, transacoes.data,
        transacoes.usuario_id, transacoes.categoria_id, categorias.descricao AS categoria_nome FROM transacoes
        JOIN categorias ON ( categorias.id = transacoes.categoria_id) WHERE transacoes.id = $1`;
        const { rows, rowCount } = await pool.query(queryCategorias, [transacaoCadastrada]);

        if (!rowCount) {
            return res.status(400).json({ mensagem: 'Erro interno do servidor!' });
        }

        return res.status(201).json(rows[0]);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor!' });
    }
};

module.exports = { cadastrarTransacao };
const pool = require('../../config/conexao');

const listarTransacoes = async (req, res) => {
    const { id } = req.usuarioLogado;
    const { filtro } = req.query;

    try {
        const pesquisa = ' categorias.descricao ilike ';
        let pesquisaDois = '';
        let resultadoPesquisa = '';

        if (filtro) {
            for (let i = 0; i < filtro.length; i++) {
                if (i === filtro.length - 1) {
                    pesquisaDois += pesquisa + `'%${filtro[i]}%'`;
                } else {
                    pesquisaDois += pesquisa + `'%${filtro[i]}%' OR `;
                }
            }
            resultadoPesquisa = 'AND (' + pesquisaDois + ')';
        }

        const queryListarTransacoes = `SELECT transacoes.id, transacoes.tipo, transacoes.descricao, transacoes.valor, transacoes.data,
        transacoes.usuario_id, transacoes.categoria_id, categorias.descricao AS categoria_nome FROM transacoes
        JOIN categorias ON ( categorias.id = transacoes.categoria_id) WHERE transacoes.usuario_id = $1 ${resultadoPesquisa}`;
        const { rows } = await pool.query(queryListarTransacoes, [id]);

        return res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor!' });
    }
};

module.exports = { listarTransacoes };
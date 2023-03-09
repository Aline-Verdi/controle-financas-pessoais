const jwt = require('jsonwebtoken');
const pool = require('../config/conexao');

const verificarLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ mensagem: 'Não autorizado!' });
    }

    const token = authorization.split(' ')[1];

    try {
        const { id } = jwt.verify(token, process.env.SENHA_TOKEN);

        const queryVerificarId = 'SELECT * FROM usuarios WHERE id = $1';
        const resultadoConsulta = await pool.query(queryVerificarId, [id]);

        if (!resultadoConsulta.rowCount) {
            return res.status(401).json({ mensagem: 'Não autorizado!' });
        }

        const usuarioLogado = resultadoConsulta.rows[0];
        const { senha: _, ...dadosUsuarioLogado } = usuarioLogado;

        req.usuarioLogado = dadosUsuarioLogado;
        return next();
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor!' });
    }
};

module.exports = { verificarLogin };
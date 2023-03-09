const pool = require('../../config/conexao');
const bcrypt = require('bcrypt');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome) {
        return res.status(400).json({ mensagem: 'O campo nome é obrigatório!' });
    }

    if (!email) {
        return res.status(400).json({ mensagem: 'O campo email é obrigatório!' });
    }

    if (!senha) {
        return res.status(400).json({ mensagem: 'O campo senha é obrigatório!' });
    }

    try {
        const queryValidarEmail = 'SELECT * FROM usuarios WHERE email = $1';
        const { rowCount: validarExisteEmail } = await pool.query(queryValidarEmail, [email]);

        if (validarExisteEmail > 0) {
            return res.status(400).json({ mensagem: 'E-mail ou senha inválidos!' });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const queryCadastroUsuario = 'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) returning *';
        const paramCadastroUsuario = [nome.trim(), email.trim(), senhaCriptografada];
        const { rows, rowCount } = await pool.query(queryCadastroUsuario, paramCadastroUsuario);

        if (!rowCount) {
            return res.status(500).json({ mensagem: 'Erro interno do servidor!' });
        }

        const usuarioCadastrado = rows[0];

        const { senha: _, ...dadosUsuarioCadastrado } = usuarioCadastrado;

        return res.status(201).json(dadosUsuarioCadastrado);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor!' });
    }
};

module.exports = { cadastrarUsuario };
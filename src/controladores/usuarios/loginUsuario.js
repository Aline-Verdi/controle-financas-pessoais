const pool = require('../../config/conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginDoUsuario = async (req, res) => {
    const { email, senha } = req.body;

    if (!email) {
        return res.status(400).json({ mensagem: 'O campo email é obrigatório!' });
    }

    if (!senha) {
        return res.status(400).json({ mensagem: 'O campo senha é obrigatório!' });
    }

    try {
        const queryVerificarEmailExiste = 'SELECT * FROM usuarios WHERE email = $1';
        const resultadoConsulta = await pool.query(queryVerificarEmailExiste, [email.trim()]);

        if (!resultadoConsulta.rowCount) {
            return res.status(400).json({ mensagem: 'E-mail ou senha inválidos!' });
        }

        const usuarioCadastrado = resultadoConsulta.rows[0];
        const verificarSenha = await bcrypt.compare(senha, usuarioCadastrado.senha);

        if (!verificarSenha) {
            return res.status(400).json({ mensagem: 'E-mail ou senha inválidos!' });
        }

        const token = jwt.sign({ id: usuarioCadastrado.id }, process.env.SENHA_TOKEN, { expiresIn: '1h' });

        const { senha: _, ...dadosUsuarioCadastrado } = usuarioCadastrado;

        return res.status(200).json({ usuario: dadosUsuarioCadastrado, token });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor!' });
    }
};

module.exports = { loginDoUsuario };
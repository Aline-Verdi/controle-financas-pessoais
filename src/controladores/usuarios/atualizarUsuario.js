const pool = require('../../config/conexao');
const bcrypt = require('bcrypt');

const atualizarUsuario = async (req, res) => {
    const { id } = req.usuarioLogado;
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
            return res.status(400).json({ mensagem: 'O e-mail informado já está sendo utilizado por outro usuário!' });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const queryAtualizarUsuario = 'UPDATE usuarios SET nome = $1, email = $2, senha = $3 WHERE id = $4';
        const paramAtualizarUsuario = [nome.trim(), email.trim(), senhaCriptografada, id];
        const { rowCount: atualizarUsuario } = await pool.query(queryAtualizarUsuario, paramAtualizarUsuario);

        if (!atualizarUsuario) {
            return res.status(400).json({ mensagem: 'Usuário não encontrado!' });
        }

        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor!' });
    }
};

module.exports = { atualizarUsuario };

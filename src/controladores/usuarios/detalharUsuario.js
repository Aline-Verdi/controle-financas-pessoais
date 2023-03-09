const detalharUsuario = async (req, res) => {
    return res.status(200).json(req.usuarioLogado);
};

module.exports = { detalharUsuario };
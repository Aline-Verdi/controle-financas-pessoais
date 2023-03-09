const express = require('express');
const { loginDoUsuario } = require('./controladores/usuarios/loginUsuario');
const { listarTransacoes } = require('./controladores/transacoes/listarTransacoes');
const { detalharTransacao } = require('./controladores/transacoes/detalharTransacao');
const { verificarLogin } = require('./intermediario/loginIntermediario');
const { detalharUsuario } = require('./controladores/usuarios/detalharUsuario');
const { cadastrarUsuario } = require('./controladores/usuarios/cadastrarUsuario');
const { atualizarUsuario } = require('./controladores/usuarios/atualizarUsuario');
const { atualizarTransacao } = require('./controladores/transacoes/atualizarTransacao');
const { cadastrarTransacao } = require('./controladores/transacoes/cadastrarTransacao');
const { listarCategorias } = require('./controladores/categorias/listarCategorias');
const { excluirTransacao } = require('./controladores/transacoes/excluirTransacao');
const { extratoTransacoes } = require('./controladores/transacoes/extratoTransacoes');

const rotas = express();

rotas.post('/usuario', cadastrarUsuario);
rotas.post('/login', loginDoUsuario);

rotas.use(verificarLogin);

rotas.put('/usuario', atualizarUsuario);
rotas.get('/usuario', detalharUsuario);

rotas.post('/transacao', cadastrarTransacao);
rotas.get('/transacao', listarTransacoes);
rotas.get('/transacao/extrato', extratoTransacoes);
rotas.get('/transacao/:id', detalharTransacao);
rotas.put('/transacao/:id', atualizarTransacao);
rotas.delete('/transacao/:id', excluirTransacao);

rotas.get('/categoria', listarCategorias);

module.exports = rotas;
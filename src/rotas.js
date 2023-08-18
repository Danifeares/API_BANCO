const express = require('express')
const controladorBanco = require('./controladores/contas')
const {validarSenha} = require("./intermediarios")
const rotas = express()

rotas.get('/contas', validarSenha, controladorBanco.listarContas)

rotas.post('/contas', controladorBanco.criarConta)

rotas.put('/contas/:numeroConta', controladorBanco.atualizarDadosUsuario)

rotas.delete('/contas/:numeroConta', controladorBanco.excluirConta)

rotas.post('/transacoes/depositar', controladorBanco.depositar)

module.exports = rotas

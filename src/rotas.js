const express = require('express')
const controladorBanco = require('./controladores/contas')
const {validarSenha} = require("./intermediarios")
const rotas = express()

rotas.get('/contas', validarSenha, controladorBanco.listarContas)

rotas.post('/contas', controladorBanco.criarConta)

rotas.put('/contas/:numeroConta/usuario', controladorBanco.atualizarDadosUsuario)

module.exports = rotas

const express = require('express')
const controladorBanco = require('./controladores/contas')
const {validarSenha} = require("./intermediarios")
const rotas = express()

rotas.get('/contas', validarSenha, controladorBanco.listarContas)

rotas.post('/contas', controladorBanco.criarConta)

rotas.put('/contas/:numeroConta/usuario', controladorBanco.atualizarDadosUsuario)

rotas.delete('/contas/:numeroConta', controladorBanco.excluirConta)

rotas.post('/transacoes/depositar', controladorBanco.depositar)

rotas.post('/transacoes/sacar', controladorBanco.sacar)

rotas.post('/transacoes/transferir', controladorBanco.transferir)

rotas.get('/contas/saldo', controladorBanco.saldo)

rotas.get('/contas/extrato', controladorBanco.extrato)

module.exports = rotas

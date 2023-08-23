const express = require('express')
const controladorBanco = require('./controladores/contas')
const { validarSenha,
  validarEmailOuCPF,
  validarSenhaDaContaBODY,
  validarSenhaDaContaQUERY,
  validarIDParams,
  validarIDBody,
  validarIDQuery
} = require("./intermediarios")

const rotas = express()

rotas.get('/contas', validarSenha, controladorBanco.listarContas)

rotas.post('/contas', validarEmailOuCPF, controladorBanco.criarConta)

rotas.put('/contas/:numeroConta/usuario', validarIDParams, validarEmailOuCPF, controladorBanco.atualizarDadosUsuario)

rotas.delete('/contas/:numeroConta', validarIDParams, controladorBanco.excluirConta)

rotas.post('/transacoes/depositar', validarIDBody, controladorBanco.depositar)

rotas.post('/transacoes/sacar', validarIDBody, validarSenhaDaContaBODY, controladorBanco.sacar)

rotas.post('/transacoes/transferir', controladorBanco.transferir)

rotas.get('/contas/saldo', validarIDQuery, validarSenhaDaContaQUERY, controladorBanco.saldo)

rotas.get('/contas/extrato', validarIDQuery, validarSenhaDaContaQUERY, controladorBanco.extrato)

module.exports = rotas

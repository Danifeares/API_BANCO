let bancoDeDados = require('../bancodedados')

function localizarID(id) {
  return bancoDeDados.contas.find((conta) => {
    return conta.numero === Number(id)
  })

}

function localizarCPF(cpf) {
  return bancoDeDados.contas.find((conta) => {
    return conta.usuario.cpf === cpf
  })
}

function localizarEmail(email) {
  return bancoDeDados.contas.find((conta) => {
    return conta.usuario.email === email
  })
}

module.exports = {
  localizarCPF,
  localizarEmail,
  localizarID
}
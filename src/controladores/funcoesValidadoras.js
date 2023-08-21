let { contas } = require('../bancodedados')

function localizarID (id) {
  return contas.find((conta) => {
    return conta.numero === Number(id)
  })

}
function verificadoraDeID (req, res, id) {
  const idLocalizado = localizarID(id)
  if (!idLocalizado) {
    return res.status(400).json({
      mensagem: 'O número da conta informado é inválido'
    })
  }
  return idLocalizado
}

function localizarCPF (cpf) {
  return contas.find((conta) => {
    return conta.usuario.cpf === cpf
  })
} 

function localizarEmail (email) {
  return contas.find((conta) => {
    return conta.usuario.email === email
  })
}

module.exports = {
  verificadoraDeID,
  localizarCPF,
  localizarEmail
}
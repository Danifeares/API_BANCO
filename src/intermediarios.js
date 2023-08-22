const { localizarCPF, localizarEmail } = require('./controladores/funcoesValidadoras')
const validarSenha = (req, res, next) => {
  const { senha_banco } = req.query
  if (!senha_banco) {
    return res.status(400).json({
      "mensagem": "A senha do banco não foi informada."
    })
  }
  if (senha_banco !== 'Cubos123Bank') {
    return res.status(401).json({
      "mensagem": "A senha do banco informada é inválida!"
    })
  }
  next()
}

const validarEmailOuCPF = (req, res, next) => {
  const { cpf, email } = req.body

  const cpfJaExiste = localizarCPF(cpf)
  const emailJaExiste = localizarEmail(email)

  if (cpfJaExiste && emailJaExiste) {
    return res.status(404).json({
      mensagem: "O CPF e o email informados já existem!"
    })
  }
  if (cpfJaExiste) {
    return res.status(404).json({
      mensagem: "O CPF informado já existe cadastrado!"
    })
  }
  if (emailJaExiste) {
    return res.status(404).json({
      mensagem: "O email informado já existe cadastrado!"
    })
  }
  next()
}

module.exports = { validarSenha, validarEmailOuCPF }
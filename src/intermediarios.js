const { localizarCPF, localizarEmail, localizarID } = require('./controladores/funcoesLocalizadoras')
const validarSenhaBanco = (req, res, next) => {
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

const validarIDParams = (req, res, next) => {
  const { numeroConta } = req.params
  const idLocalizado = localizarID(numeroConta)
  if (!idLocalizado) {
    return res.status(400).json({
      mensagem: 'O número da conta informado é inválido'
    })
  }
  next()
}

const validarIDBody = (req, res, next) => {
  const { numero_conta } = req.body
  const idLocalizado = localizarID(numero_conta)
  if (!idLocalizado) {
    return res.status(400).json({
      mensagem: 'O número da conta informado é inválido'
    })
  }
  next()
}

const validarIDContasOrigemEDestino = (req, res, next) => {
  const { numero_conta_origem, numero_conta_destino } = req.body
  const idLocalizadoORIGEM = localizarID(numero_conta_origem)
  const idLocalizadoDESTINO = localizarID(numero_conta_destino)

  if (!idLocalizadoORIGEM && !idLocalizadoDESTINO) {
    return res.status(400).json({
      mensagem: 'As contas informadas não foram localizadas.'
    })
  }
  if (!idLocalizadoORIGEM) {
    return res.status(400).json({
      mensagem: 'O número da conta de origem informado é inválido.'
    })
  }
  if (!idLocalizadoDESTINO) {
    return res.status(400).json({
      mensagem: 'O número da conta de destino informado é inválido.'
    })
  }
  next()
}

const validarIDQuery = (req, res, next) => {
  const { numero_conta } = req.query
  const idLocalizado = localizarID(numero_conta)
  if (!idLocalizado) {
    return res.status(400).json({
      mensagem: 'O número da conta informado é inválido'
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

const validarSenhaDaContaBODY = (req, res, next) => {
  const { senha, numero_conta } = req.body
  const contaExiste = localizarID(numero_conta)
  if (senha !== contaExiste.usuario.senha) {
    return res.status(401).json({ mensagem: 'A senha informada é inválida.' })
  }
  next()
}

const validarSenhaDaContaQUERY = (req, res, next) => {
  const { senha, numero_conta } = req.query
  const contaExiste = localizarID(numero_conta)
  if (senha !== contaExiste.usuario.senha) {
    return res.status(401).json({ mensagem: 'A senha informada é inválida.' })
  }
  next()
}

const validarSenhaDaContaOrigem = (req, res, next) => {
  const { senha, numero_conta_origem } = req.body
  const contaExiste = localizarID(numero_conta_origem)
  if (senha !== contaExiste.usuario.senha) {
    return res.status(401).json({ mensagem: 'A senha informada é inválida.' })
  }
  next()
}


module.exports = {
  validarSenhaBanco,
  validarEmailOuCPF,
  validarSenhaDaContaBODY,
  validarSenhaDaContaQUERY,
  validarIDParams,
  validarIDBody,
  validarIDQuery,
  validarIDContasOrigemEDestino,
  validarSenhaDaContaOrigem
}
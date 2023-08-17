let { contas, numeroConta } = require('../bancodedados')

const listarContas = (req, res) => {
  res.status(200).json(contas)
}

const criarConta = (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body
  if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
    return res.status(400).json({ mensagem: "Os dados inseridos estão incompletos." })
  }

  const contaJaExiste = contas.find((conta) => {
    return conta.cpf === cpf || conta.email === email
  })

  if (contaJaExiste) {
    return res.status(403).json({
      "mensagem": "Já existe uma conta com o cpf ou e-mail informado!"
    })
  }
  const contaNova = {
    numero: numeroConta++,
    saldo: 0,
    nome,
    cpf,
    data_nascimento,
    telefone,
    email,
    senha
  }
  contas.push(contaNova)
  return res.status(201).send()
}

const atualizarDadosUsuario = (req, res) => {

}

module.exports = {
  listarContas,
  criarConta,
  atualizarDadosUsuario
}
let { contas, idConta } = require('../bancodedados')

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
    return res.status(404).json({
      "mensagem": "Já existe uma conta com o cpf ou e-mail informado!"
    })
  }
  const contaNova = {
    numero: idConta++,
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
  const {numeroConta} = req.params
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body
  if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
    return res.status(400).json({ mensagem: "Os dados inseridos estão incompletos." })
  } 
  const contaEncontrada = contas.find((conta) => {
    return conta.numero === Number(numeroConta)
  })
  if (!contaEncontrada) {
    return res.status(400).json({
      mensagem: 'O número da conta informado é inválido'
    })
  }
  const cpfJaExiste = contas.find((conta) => {
    return conta.cpf === cpf
  })
  if (cpfJaExiste) {
    return res.status(404).json({
      "mensagem": "O CPF informado já existe cadastrado!"
  })
  }
  const emailJaExiste = contas.find((conta) => {
    return conta.email === email
  })
  if (emailJaExiste) {
    return res.status(404).json({
      "mensagem": "O email informado já existe cadastrado!"
  })
  }
  contaEncontrada.nome = nome
  contaEncontrada.cpf = cpf
  contaEncontrada.data_nascimento = data_nascimento
  contaEncontrada.telefone = telefone
  contaEncontrada.email = email
  contaEncontrada.senha = senha
  return res.status(200).send()
}

module.exports = {
  listarContas,
  criarConta,
  atualizarDadosUsuario
}
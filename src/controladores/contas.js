let { contas, idConta, depositos, saques, transferencias } = require('../bancodedados')
const {format} = require('date-fns')

const listarContas = (req, res) => {
  res.status(200).json(contas)
}

const criarConta = (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body
  try {
    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
      return res.status(400).json({ mensagem: "Os dados inseridos estão incompletos." })
    }

    const contaJaExiste = contas.find((conta) => {
      return conta.usuario.cpf === cpf || conta.usuario.email === email
    })

    if (contaJaExiste) {
      return res.status(404).json({
        mensagem: "Já existe uma conta com o cpf ou e-mail informado!"
      })
    }
    const contaNova = {
      numero: idConta++,
      saldo: 0,
      usuario: {
        nome,
        cpf,
        data_nascimento,
        telefone,
        email,
        senha
      }
    }
    contas.push(contaNova)
    return res.status(201).send()
  } catch (erro) {
    return res.status(500).json({ mensagem: 'erro inesperado' })
  }
}

const atualizarDadosUsuario = (req, res) => {
  const { numeroConta } = req.params
  try {
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
      return conta.usuario.cpf === cpf
    })
    if (cpfJaExiste) {
      return res.status(404).json({
        mensagem: "O CPF informado já existe cadastrado!"
      })
    }
    const emailJaExiste = contas.find((conta) => {
      return conta.usuario.email === email
    })
    if (emailJaExiste) {
      return res.status(404).json({
        mensagem: "O email informado já existe cadastrado!"
      })
    }
    contaEncontrada.usuario.nome = nome
    contaEncontrada.usuario.cpf = cpf
    contaEncontrada.usuario.data_nascimento = data_nascimento
    contaEncontrada.usuario.telefone = telefone
    contaEncontrada.usuario.email = email
    contaEncontrada.usuario.senha = senha
    return res.status(204).json()

  } catch (erro) {
    return res.status(500).json({ mensagem: 'erro inesperado' })
  }
}


const excluirConta = (req, res) => {
  const { numeroConta } = req.params
  try {
    const contaEncontrada = contas.find((conta) => {
      return conta.numero === Number(numeroConta)
    })
    if (!contaEncontrada) {
      return res.status(400).json({
        mensagem: 'O número da conta informado é inválido'
      })
    }
    if (contaEncontrada.saldo !== 0) {
      return res.status(404).json({
        mensagem: "A conta só pode ser removida se o saldo for zero!"
      })
    }
    contas = contas.filter((conta) => {
      return conta.numero !== Number(numeroConta)
    })
    return res.status(204).json()
  } catch (erro) {
    return res.status(500).json({ mensagem: 'erro inesperado' })
  }
}

const depositar = (req, res) => {
  const { numero_conta, valor } = req.body
  try {
    if (!numero_conta || !valor) {
      return res.status(404).json({
        mensagem: "O número da conta e o valor são obrigatórios!"
      })
    }
    if (Number(valor) <= 0) {
      return res.status(400).json({ mensagem: 'O valor a ser depositado não pode ser negativo!' })
    }
    const contaEncontrada = contas.find((conta) => {
      return conta.numero === Number(numero_conta)
    })
    if (!contaEncontrada) {
      return res.status(400).json({ mensagem: 'Não foi encontrada conta com o número informado.' })
    }

    contaEncontrada.saldo += Number(valor)

    depositos.push({
      data: format(new Date(), "yyyy'-'MM'-'dd HH':'mm':'ss"),
      numero_conta,
      valor
    })

    return res.status(204).json()

  } catch (erro) {
    return res.status(500).json({ mensagem: 'erro inesperado' })
  }
}

const sacar = (req, res) => {
  const { numero_conta, valor, senha } = req.body
  try {
    if (!numero_conta || !valor || !senha) {
      return res.status(404).json({
        mensagem: "O número da conta, o valor e a senha são obrigatórios!"
      })
    }
    const contaEncontrada = contas.find((conta) => {
      return conta.numero === Number(numero_conta)
    })
    if (!contaEncontrada) {
      return res.status(400).json({ mensagem: 'Não foi encontrada conta com o número informado.' })
    }
    if (senha !== contaEncontrada.usuario.senha) {
      return res.status(401).json({ mensagem: 'A senha informada é inválida.' })
    }
    if (Number(valor) > contaEncontrada.saldo) {
      return res.status(400).json({ mensagem: 'Saldo indisponível para saque.' })
    }

    contaEncontrada.saldo -= Number(valor)

    saques.push({
      data: format(new Date(), "yyyy'-'MM'-'dd HH':'mm':'ss"),
      numero_conta,
      valor
    })

    return res.status(204).json()

  } catch (erro) {
    return res.status(500).json({ mensagem: 'erro inesperado' })
  }
}

const transferir = (req, res) => {
  const {numero_conta_origem, numero_conta_destino, valor, senha} = req.body
  try {
    if (!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
      return res.status(404).json({
        mensagem: "Os números das contas, o valor da transferência e a senha do banco de origem são obrigatórios!"
      })
    }
    const contaDeOrigemEncontrada = contas.find((conta) => {
      return conta.numero === Number(numero_conta_origem)
    })
    const contaDeDestinoEncontrada = contas.find((conta) => {
      return conta.numero === Number(numero_conta_destino)
    })
    if (!contaDeOrigemEncontrada || !contaDeDestinoEncontrada) {
      return res.status(400).json({ mensagem: 'Não foi possível encontrar conta(s) com o(s) número(s) informado(s).' })
    }
    if (senha !== contaDeOrigemEncontrada.usuario.senha) {
      return res.status(401).json({ mensagem: 'A senha informada é inválida.' })
    }
    if (Number(valor) > contaDeOrigemEncontrada.saldo) {
      return res.status(400).json({ mensagem: 'Saldo indisponível para saque.' })
    }

    contaDeOrigemEncontrada.saldo -= Number(valor)
    contaDeDestinoEncontrada.saldo += Number(valor)

    transferencias.push({
      data: format(new Date(), "yyyy'-'MM'-'dd HH':'mm':'ss"),
      numero_conta_origem,
      numero_conta_destino,
      valor
    })

    return res.status(204).json()
    
  } catch (erro) {
    return res.status(500).json({ mensagem: 'erro inesperado' })
  }
}

module.exports = {
  listarContas,
  criarConta,
  atualizarDadosUsuario,
  excluirConta,
  depositar,
  sacar,
  transferir
}
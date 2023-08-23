let bancoDeDados = require('../bancodedados')
const { format } = require('date-fns')
const { verificadoraDeID, localizarID } = require('./funcoesValidadoras')
let { idConta, depositos, saques, transferencias } = bancoDeDados

const listarContas = (req, res) => {
  res.status(200).json(bancoDeDados.contas)
}

const criarConta = (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body
  try {
    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
      return res.status(400).json({ mensagem: "Os dados inseridos estão incompletos." })
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
    bancoDeDados.contas.push(contaNova)

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

    let contaEncontrada = localizarID(numeroConta)

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

    let contaEncontrada = localizarID(numeroConta)

    if (contaEncontrada.saldo !== 0) {
      return res.status(404).json({
        mensagem: "A conta só pode ser removida se o saldo for zero!"
      })
    }
    bancoDeDados.contas = bancoDeDados.contas.filter((conta) => {
      return conta.numero !== Number(contaEncontrada.numero)
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
    let contaEncontrada = localizarID(numero_conta)

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

    let contaEncontrada = localizarID(numero_conta)

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
  const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body
  try {
    if (!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
      return res.status(404).json({
        mensagem: "Os números das contas, o valor da transferência e a senha do banco de origem são obrigatórios!"
      })
    }

    let contaDeOrigemEncontrada = verificadoraDeID(req, res, numero_conta_origem)

    let contaDeDestinoEncontrada = verificadoraDeID(req, res, numero_conta_destino)

    if (senha !== contaDeOrigemEncontrada.usuario.senha) {
      return res.status(401).json({ mensagem: 'A senha informada é inválida.' })
    }
    if (Number(valor) > contaDeOrigemEncontrada.saldo) {
      return res.status(400).json({ mensagem: 'Saldo indisponível em conta.' })
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

const saldo = (req, res) => {
  const { numero_conta, senha } = req.query
  try {
    if (!numero_conta || !senha) {
      return res.status(404).json({
        mensagem: "O número da conta e a senha são obrigatórios!"
      })
    }

    let contaEncontrada = localizarID(numero_conta)

    res.status(200).json({ saldo: contaEncontrada.saldo })

  } catch (erro) {
    return res.status(500).json({ mensagem: 'erro inesperado' })
  }
}

const extrato = (req, res) => {
  const { numero_conta, senha } = req.query
  try {
    if (!numero_conta || !senha) {
      return res.status(404).json({
        mensagem: "O número da conta e a senha são obrigatórios!"
      })
    }

    const depositosConta = depositos.filter((deposito) => {
      return deposito.numero_conta === numero_conta
    })

    const saquesConta = saques.filter((saque) => {
      return saque.numero_conta === numero_conta
    })

    const transferenciasEnviadas = transferencias.filter((enviado) => {
      return enviado.numero_conta_origem === numero_conta
    })

    const transfenciasRecebidas = transferencias.filter((recebido) => {
      return recebido.numero_conta_destino === numero_conta
    })

    const extrato = {
      depositos: depositosConta,
      saques: saquesConta,
      transferenciasEnviadas,
      transfenciasRecebidas
    }

    res.status(200).json(extrato)

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
  transferir,
  saldo,
  extrato
}
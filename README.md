![](https://i.imgur.com/xG74tOh.png)

# Desafio Módulo 2 - Back-end

## Descrição do desafio

O desafio consiste na criação de um banco digital, utilizando conceitos de API REST.

## Como rodar o projeto? 

###### Requisitos: `NodeJS`

- Faça o clone do projeto para sua máquina.
- Passe o comando **npm install** no terminal, dentro da pasta do projeto.
- Para iniciar o servidor, digite **npm run start** no terminal. Você pode derrubar o servidor a qualquer momento dando um **ctrl + c**, ou **comand + c**.
- Os testes apresentados logo abaixo foram realizados por meio da plataforma **Insominia**, mas é possível rodar por meio do seu navegador também. 

## A aplicação realiza as seguintes funções:

-   Criar conta bancária:
    Por meio da rota **post**: http://localhost:3333/contas
    <img src="/assets/rotaPOST.gif">

-   Listar contas bancárias:
    Por meio da rota **get**: http://localhost:3333/contas?senha_banco=Cubos123Bank
    ###### É passado como parâmetro a senha do banco.
    <img src="/assets/rotaGET.gif">

-   Atualizar os dados do usuário da conta bancária:
    Por meio da rota **put**: http://localhost:3333/contas/1/usuario
    ###### é passado como parâmetro o id (numero) da conta para localização da mesma.
    <img src="/assets/rotaPUT.gif">

-   Excluir uma conta bancária:
    Por meio da rota **delete**: http://localhost:3333/contas/1
    ###### é passado como parâmetro do id da conta para localização da mesma.
    <img src="/assets/rotaDELETE.gif">

-   Depositar em uma conta bancária:
    Por meio da rota **post**: http://localhost:3333/transacoes/depositar
    ###### No body da requisição, são passados como parâmetros o numero da conta e o valor a ser depositado, que deve ser maior que zero.
    <img src="/assets/rotaDEPOSITO.gif">

-   Sacar de uma conta bancária:
    Por meio da rota **post**: http://localhost:3333/transacoes/sacar
    ###### No body da requisição, são passados como parâmetros o numero da conta, o valor a ser sacado, e a senha da conta. O saque não pode ser maior que o valor disponível em saldo na conta.
    <img src="/assets/rotaSAQUE.gif">

-   Transferir valores entre contas bancárias:
    Por meio da rota **post**: http://localhost:3333/transacoes/transferir
    ###### No body da requisição, são passados como parâmetros o numero da conta de origem, numero da conta de destino, o valor a ser transferido, e a senha da conta de origem. A transferência não pode ser maior que o valor disponível em saldo na conta de origem.
    <img src="/assets/rotaTRANSFERIR.gif">

-   Consultar saldo da conta bancária:
    Por meio da rota **get**: http://localhost:3333/contas/saldo?numero_conta=1&senha=12345
    ###### É passado como parâmetro o numero da conta e a senha da conta.
    <img src="/assets/rotaSALDO.gif">

-   Emitir extrato bancário:
    Por meio da rota **get**: http://localhost:3333/contas/extrato?numero_conta=1&senha=12345
    ###### é passado como parâmetro o numero da conta e a senha da conta.
    <img src="/assets/rotaEXTRATO.gif">

###### tags: `back-end` `módulo 2` `nodeJS` `API REST` `desafio`

![](https://i.imgur.com/xG74tOh.png)

# Desafio Módulo 2 - Back-end

## Descrição do desafio

O desafio consiste na criação de um banco digital, utilizando conceitos de API REST.

## Como rodar o projeto? 

###### Requisitos: `NodeJS`

- Faça o clone do projeto para sua máquina.
- Abra a pasta no seu editor de código de preferência (ex: VScode).
- Abra o terminal dentro da pasta do projeto (localize na barra superior o comando **new terminal**, ou digite **ctrl/comand + '**).
- Passe o comando **npm install** no terminal.
- Para iniciar o servidor, digite **npm run start** no terminal. Você pode derrubar o servidor a qualquer momento dando um **ctrl + c**, ou **comand + c**.
- Os testes apresentados logo abaixo foram realizados por meio da plataforma **Insominia**, mas é possível rodar por meio de outras plataformas ou do seu navegador também. 

## A aplicação realiza as seguintes funções:

-   Criar conta bancária: <br/>
    Por meio da rota **post**: http://localhost:3333/contas
    ###### Observações e verificações presentes na aplicação: `CPF deve ser um campo único.` `E-mail deve ser um campo único.` `Verificar se todos os campos foram informados (todos são obrigatórios)` `Definir o saldo inicial da conta como 0`

    ###### São passados como parâmetros no body da requisição as informações da conta, no seguinte formato:

     ```
    {
    "nome": "Foo Bar 2",
    "cpf": "00011122234",
    "data_nascimento": "2021-03-15",
    "telefone": "71999998888",
    "email": "foo@bar2.com",
    "senha": "12345"
     }
     ```
    <img src="/assets/rotaPOST.gif">


-   Listar contas bancárias: <br/>
    Por meio da rota **get**: http://localhost:3333/contas?senha_banco=Cubos123Bank

    ###### Observações e verificações presentes na aplicação: `Verificar se a senha do banco foi informada (passado como query params na url)` `Validar se a senha do banco está correta`

    <img src="/assets/rotaGET.gif">

-   Atualizar os dados do usuário da conta bancária: <br/>
    Por meio da rota **put**: http://localhost:3333/contas/1/usuario
    ###### Observações e verificações presentes na aplicação: `Verificar se foi passado todos os campos no body da requisição` `Verificar se o numero da conta passado como parametro na URL é válida` `Se o CPF for informado, verificar se já existe outro registro com o mesmo CPF` `Se o E-mail for informado, verificar se já existe outro registro com o mesmo E-mail` `Atualizar os dados do usuário de uma conta bancária`

    ###### São passados como parâmetros o id (numero) da conta para localização da mesma, e os dados a serem atualizados no body da requisição:

    ```
    {
    "nome": "Foo Bar 3",
    "cpf": "99911122234",
    "data_nascimento": "2021-03-15",
    "telefone": "71999998888",
    "email": "foo@bar3.com",
    "senha": "12345"
    }
    ```
    <img src="/assets/rotaPUT.gif">

-   Excluir uma conta bancária: <br/>
    Por meio da rota **delete**: http://localhost:3333/contas/1
    ###### Observações e verificações presentes na aplicação: `Verificar se o numero da conta passado como parametro na URL é válido` `Permitir excluir uma conta bancária apenas se o saldo for 0 (zero)` `Remover a conta do objeto de persistência de dados.`


    ###### É passado como parâmetro do id da conta para localização da mesma.

    <img src="/assets/rotaDELETE.gif">

-   Depositar em uma conta bancária: <br/>
    Por meio da rota **post**: http://localhost:3333/transacoes/depositar
    ###### Observações e verificações presentes na aplicação: `Verificar se o numero da conta e o valor do deposito foram informados no body` `Verificar se a conta bancária informada existe` `Não permitir depósitos com valores negativos ou zerados` `Somar o valor de depósito ao saldo da conta encontrada`

    ###### No body da requisição, são passados como parâmetros o numero da conta e o valor a ser depositado, que deve ser maior que zero. O depósito ficará registrado com a data e horário em que foi efetuado.

    ```
    {
	"numero_conta": "1",
	"valor": 1900
    }
    ```
    <img src="/assets/rotaDEPOSITO.gif">

-   Sacar de uma conta bancária: <br/>
    Por meio da rota **post**: http://localhost:3333/transacoes/sacar
    ###### Observações e verificações presentes na aplicação: `Verificar se o numero da conta, o valor do saque e a senha foram informados no body` `Verificar se a conta bancária informada existe` `Verificar se a senha informada é uma senha válida para a conta informada` `Verificar se há saldo disponível para saque` `Subtrair o valor sacado do saldo da conta encontrada`
    ###### No body da requisição, são passados como parâmetros o numero da conta, o valor a ser sacado, e a senha da conta. O saque ficará registrado com a data e horário que foi feito.
    ```
    {
	"numero_conta": "1",
	"valor": 1900,
    "senha": "123456"
    }
    ```
    <img src="/assets/rotaSAQUE.gif">

-   Transferir valores entre contas bancárias: <br/>
    Por meio da rota **post**: http://localhost:3333/transacoes/transferir
    ###### Observações e verificações presentes na aplicação: `Verificar se o número da conta de origem, de destino, senha da conta de origem e valor da transferência foram informados no body` `Verificar se a conta bancária de origem informada existe` `Verificar se a conta bancária de destino informada existe` `Verificar se a senha informada é uma senha válida para a conta de origem informada` `Verificar se há saldo disponível na conta de origem para a transferência` `Subtrair o valor da transfência do saldo na conta de origem` `Somar o valor da transferência no saldo da conta de destino`

    ###### No body da requisição, são passados como parâmetros o numero da conta de origem, numero da conta de destino, o valor a ser transferido, e a senha da conta de origem. A transferência ficará registrada com a data e horário que foi feita.
    ```
    {
	"numero_conta_origem": "1",
	"numero_conta_destino": "2",
	"valor": 200,
	"senha": "123456"
    }
    ```
    <img src="/assets/rotaTRANSFERIR.gif">

-   Consultar saldo da conta bancária: <br/>
    Por meio da rota **get**: http://localhost:3333/contas/saldo?numero_conta=1&senha=12345
    ###### Observações e verificações presentes na aplicação: `Verificar se o numero da conta e a senha foram informadas (passado como query params na url)` `Verificar se a conta bancária informada existe` `Verificar se a senha informada é uma senha válida` `Exibir o saldo da conta bancária em questão`
    <img src="/assets/rotaSALDO.gif">

-   Emitir extrato bancário: <br/>
    Por meio da rota **get**: http://localhost:3333/contas/extrato?numero_conta=1&senha=12345
    ###### Observações e verificações presentes na aplicação: `Verificar se o numero da conta e a senha foram informadas (passado como query params na url)` `Verificar se a conta bancária informada existe` `Verificar se a senha informada é uma senha válida` `Retornar a lista de transferências, depósitos e saques da conta em questão.`
    <img src="/assets/rotaEXTRATO.gif">

###### tags: `back-end` `módulo 2` `nodeJS` `API REST` `desafio`

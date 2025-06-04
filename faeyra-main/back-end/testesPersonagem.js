const Cliente = require ('./clienteClasse')
const calculoSatisfacao = require('./satisfacao')
const Produto = require('./produtoClasse')
const Jogador = require ('./jogadorClasse')

function quantProduto (){
    let result = Math.floor(Math.random * (10 - 1 + 1)) + 1
    return console.log(result)
}

let primeiroCliente = new Cliente('Alina', 1, 10, 20, 'Bruxa', 10)
let primeiroProduto = new Produto('Olho', 30)
let primeiroJogador = new Jogador('Minirubens', 3000, 3)
function compra() {
    console.log(`${primeiroCliente.nome_cliente}: Quero ${primeiroProduto.nome}.`)
    
}

compra()
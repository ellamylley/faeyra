const Produto = require('./produtoClasse');

class Estoque {
    #preco_cliente;
    #quantidade;

    constructor(codigo, nome, preco, preco_cliente, quantidade) {
        super(codigo, nome, preco); 
        this.#preco_cliente = preco_cliente;
        this.#quantidade = quantidade;
    }

    get precoCliente() {
        return this.#preco_cliente;
    }

    get quantidade() {
        return this.#quantidade;
    }

    set precoCliente(novoPrecoCliente) {
        this.#preco_cliente = novoPrecoCliente;
    }

    set quantidade(novaQuantidade) {
        this.#quantidade = novaQuantidade;
    }
}

module.exports = Estoque;

const Produto = require('./produtoClasse');

class Estoque {
    #id_estoque;
    #id_produto;
    #id_jogador;
    #quantidade;
    #preco_cliente;

    constructor( id_produto, id_jogador, quantidade, preco_cliente) {
        this.#id_estoque;
        this.#id_produto = id_produto;
        this.#id_jogador = id_jogador;
        this.#quantidade = quantidade;
        this.#preco_cliente = preco_cliente
    }
    get id_estoque() {
        return this.#id_estoque;
    }

    get id_produto() {
        return this.#id_produto;
    }

    get id_jogador() {
        return this.#id_jogador;
    }

    get quantidade() {
        return this.#quantidade;
    }

    get preco_cliente() {
        return this.#preco_cliente;
    }


    set quantidade(novaQuantidade) {
        this.#quantidade = novaQuantidade;
    }

    set preco_cliente(novoPrecoCliente) {
        this.#preco_cliente = novoPrecoCliente;
    }

}

module.exports = Estoque;

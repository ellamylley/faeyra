class Produto {
    #id_produto;
    #nome_produto;
    #preco;

    constructor(nome_produto, preco) {
        this.#id_produto;
        this.#nome_produto = nome_produto;
        this.#preco = preco;
    }

    get id_produto() {
        return this.#id_produto;
    }

    get nome_produto() {
        return this.#nome_produto;
    }

    get preco() {
        return this.#preco;
    }

    set nome_produto(novoNome) {
        this.#nome_produto = novoNome;
    }

    set preco(novoPreco) {
        this.#preco = novoPreco;
    }
}

module.exports = Produto;

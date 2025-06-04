class Produto {
    #id_produto;
    #nome_produto;
    #preco;

    constructor(nome_produto, preco) {
        this.#id_produto = 1;
        this.#nome_produto = nome_produto;
        this.#preco = preco;
    }

    get id_produto() {
        return this.#id_produto;
    }

    get nome() {
        return this.#nome_produto;
    }

    get preco() {
        return this.#preco;
    }

    set nome(novoNome) {
        this.#nome_produto = novoNome;
    }

    set preco(novoPreco) {
        this.#preco = novoPreco;
    }
}

module.exports = Produto;

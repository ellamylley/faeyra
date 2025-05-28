class Produto {
    #codigo;
    #nome;
    #preco;

    constructor(codigo, nome, preco) {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#preco = preco;
    }

    get codigo() {
        return this.#codigo;
    }

    get nome() {
        return this.#nome;
    }

    get preco() {
        return this.#preco;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

    set preco(novoPreco) {
        this.#preco = novoPreco;
    }
}

module.exports = Produto;

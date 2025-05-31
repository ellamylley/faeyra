class Jogador {
    #id;
    #nome;
    #dinheiro;

    constructor(nome, dinheiro) {
        this.#id;
        this.#nome = nome;
        this.#dinheiro = dinheiro;
    }

    get id() {
        return this.#id;
    }

    get nome() {
        return this.#nome;
    }

    get dinheiro() {
        return this.#dinheiro;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

    set dinheiro(novoDinheiro) {
        this.#dinheiro = novoDinheiro;
    }
}

module.exports = Jogador;
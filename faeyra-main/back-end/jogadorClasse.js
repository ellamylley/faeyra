class Jogador {
    #id;
    #nome;
    #dinheiro;
    #chances;

    constructor(nome, dinheiro, chances) {
        this.#id;
        this.#nome = nome;
        this.#dinheiro = dinheiro;
        this.#chances = chances
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

    get chances() {
        return this.#chances;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

    set dinheiro(novoDinheiro) {
        this.#dinheiro = novoDinheiro;
    }
}

module.exports = Jogador;
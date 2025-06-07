class Jogador {
    #id;
    #nome;
    #senha;
    #dinheiro;
    #chances;

    constructor(nome, senha, dinheiro, chances) {
        this.#id;
        this.#nome = nome;
        this.#senha = senha
        this.#dinheiro = dinheiro;
        this.#chances = chances
    }

    get id() {
        return this.#id;
    }

    get nome() {
        return this.#nome;
    }

    get senha() {
        return this.#senha
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

    set senha(novaSenha) {
        this.#senha = novaSenha
    }

    set dinheiro(novoDinheiro) {
        this.#dinheiro = novoDinheiro;
    }

    set chances(novasChances){
        this.#chances = novasChances;
    }
}


module.exports = Jogador;
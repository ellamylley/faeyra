class Especie {
    #nome_especie;
    #id_especie;
    #satisfacao_minima;
    

    constructor(nome_especie, satisfacao_minima) {
        this.#nome_especie = nome_especie;
        this.#id_especie;
        this.#satisfacao_minima = satisfacao_minima;
    }

    get nome_especie() {
        return this.#nome_especie;
    }

    get id_especie() {
        return this.#id_especie;
    }

    get satisfacao_minima() {
        return this.#satisfacao_minima;
    }

    set nome_especie(novoNome) {
        this.#nome_especie = novoNome;
    }

    set satisfacao_minima(novaSatisfacaoMinima){
        this.#satisfacao_minima = novaSatisfacaoMinima;
    }
}

module.exports = Especie;
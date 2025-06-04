class Especie {
    #nome_especie;
    #id_especie;
    #raiva;
    #felicidade;
    #satisfacaoMinima
    

    constructor(nome_especie, raiva, felicidade, id_especie, satisfacaoMinima) {
        this.#nome_especie = nome_especie;
        this.#id_especie = 1;
        this.#raiva = raiva;
        this.#felicidade = felicidade;
        this.satisfacaoMinima = satisfacaoMinima
    }

    getNome() {
        return this.#nome_especie;
    }

    getId() {
        return this.#id_especie;
    }

    getRaiva() {
        return this.#raiva;
    }

    getFelicidade() {
        return this.#felicidade;
    }

    getSatisfacaoMinima() {
        return this.#satisfacaoMinima
    }

    setNome(novoNome) {
        this.#nome_especie = novoNome;
    }

    setRaiva(novaRaiva) {
        this.#raiva = novaRaiva;
    }

    setFelicidade(novaFelicidade) {
        this.#felicidade = novaFelicidade;
    }
}

module.exports = Especie
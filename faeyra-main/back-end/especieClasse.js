class Especie {
    #nome;
    #id;
    #raiva;
    #felicidade;

    constructor(nome_especie, raiva, felicidade, id_especie, satisfacaoMinima) {
        this.#nome_especie = nome_especie;
        this.#id_especie = id_especie;
        this.#raiva = raiva;
        this.#felicidade = felicidade;
        this.#satisfacaoMinima = satisfacaoMinima
    }

    getNome() {
        return this.#nome;
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
        this.#nome = novoNome;
    }

    setRaiva(novaRaiva) {
        this.#raiva = novaRaiva;
    }

    setFelicidade(novaFelicidade) {
        this.#felicidade = novaFelicidade;
    }
}

module.exports = Especie
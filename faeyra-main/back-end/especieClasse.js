class Especie {
    #nome;
    #id;
    #raiva;
    #felicidade;

    constructor(nome_especie, raiva, felicidade, id_especie) {
        this.#nome_especie = nome_especie;
        this.#id_especie = id_especie;
        this.#raiva = raiva;
        this.#felicidade = felicidade;
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

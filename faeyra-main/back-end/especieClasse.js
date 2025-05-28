class Especie {
    #nome;
    #id;
    #raiva;
    #felicidade;

    constructor(nomeDaEspecie, raiva, felicidade, id) {
        this.#nome = nomeDaEspecie;
        this.#id = id;
        this.#raiva = raiva;
        this.#felicidade = felicidade;
    }

    getNome() {
        return this.#nome;
    }

    getId() {
        return this.#id;
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

class Cliente {
    #id;
    #nome;
    #id_especie;

    constructor(id, nome, id_especie) {
        this.#id = id;
        this.#nome = nome;
        this.#id_especie = id_especie;
    }

    get id() {
        return this.#id;
    }

    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

    get idEspecie() {
        return this.#id_especie;
    }
    
}

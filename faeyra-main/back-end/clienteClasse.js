class Cliente extends Especie {
    #id_cliente;
    #nome;
    #id_especie;

    constructor(id_cliente, nome_cliente, id_especie, raiva, felicidade, nome_especie, satisfacaoMinima) {
        super(id_especie, raiva, felicidade, nome_especie)
        this.#id_cliente = id_cliente;
        this.#nome_cliente = nome_cliente;
    }

    get id_cliente() {
        return this.#id_cliente;
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

module.exports = Cliente
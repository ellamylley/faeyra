const Especie = require('./especieClasse')

class Cliente extends Especie {
    #id_cliente;
    #nome_cliente;
    #id_especie;

    constructor(nome_cliente, id_especie, raiva, felicidade, nome_especie, satisfacaoMinima) {
        super(id_especie, raiva, felicidade, nome_especie)
        this.#id_cliente = 1;
        this.#nome_cliente = nome_cliente;
    }

    get id_cliente() {
        return this.#id_cliente;
    }

    get nome_cliente() {
        return this.#nome_cliente;
    }

    set nome(novoNome) {
        this.#nome_cliente = novoNome;
    }

    get idEspecie() {
        return this.#id_especie;
    }
    
}

module.exports = Cliente
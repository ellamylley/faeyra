class Resposta {
    #id_pergunta;
    #id_resposta;
    #texto;
    constructor(id_pergunta, texto) {
        this.#id_pergunta = id_pergunta;
        this.#id_resposta;
        this.#texto = texto;
    }

    get id_resposta() {
        return this.#id_resposta;
    }

    get id_pergunta(){
        return this.#id_pergunta;
    }

    get texto() {
        return this.#texto;
    }
    set id_resposta(novaresposta) {
        this.#id_resposta = novaresposta;
    }
    
}

module.exports = Resposta;
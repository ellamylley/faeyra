class Pergunta {
    #id_pergunta;
    #texto;
    constructor(texto) {
        this.#id_pergunta;
        this.#texto = texto;
    }

    get id_pergunta() {
        return this.#id_pergunta;
    }

    get texto() {
        return this.#texto;
    }
    set id_pergunta(novaPergunta) {
        this.#id_pergunta = novaPergunta;
    }

}

module.exports = Pergunta;
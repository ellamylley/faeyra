class Resposta {
    #id_pergunta;
    #id_resposta;
    #texto;
    #peso_satisfacao;
    constructor(id_pergunta, texto, peso_satisfacao) {
        this.#id_pergunta = id_pergunta;
        this.#id_resposta;
        this.#texto = texto;
        this.#peso_satisfacao = peso_satisfacao;
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

    get peso_satisfacao(){
        return this.#peso_satisfacao;
    }
    set id_resposta(novaresposta) {
        this.#id_resposta = novaresposta;
    }
    
}

module.exports = Resposta;
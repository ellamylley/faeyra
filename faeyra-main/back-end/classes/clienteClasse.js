const Especie = require('./especieClasse');

class Cliente {
  #id_cliente;
  #id_jogador;
  #id_especie;
  #nome_cliente;
  #satisfacao_atual;

  constructor(id_especie, id_jogador, nome_cliente,  satisfacao_atual) {
    this.#id_especie = id_especie;
    this.#id_jogador = id_jogador;
    this.#nome_cliente = nome_cliente;
    this.#satisfacao_atual = satisfacao_atual;
  }

  get id_cliente() {
    return this.#id_cliente;
  }

  get id_especie() {
    return this.#id_especie;
  }

  get id_jogador() {
    return this.#id_jogador;
  }

  get nome_cliente() {
    return this.#nome_cliente;
  }

  get satisfacao_atual() {
    return this.#satisfacao_atual;
  }

  set id_cliente(id) {
    this.#id_cliente = id;
  }

  set nome_cliente(novoNome) {
    this.#nome_cliente = novoNome;
  }

  set satisfacao_atual(novaSatisfacao) {
    this.#satisfacao_atual = novaSatisfacao;
  }
}

module.exports = Cliente;

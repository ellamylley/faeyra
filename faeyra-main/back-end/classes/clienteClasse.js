const Especie = require('./especieClasse');

class Cliente {
  #id_cliente;
  #id_jogador;
  #id_especie;
  #nome_cliente;

  constructor(id_especie, id_jogador, nome_cliente) {
    this.#id_especie = id_especie;
    this.#id_jogador = id_jogador;
    this.#nome_cliente = nome_cliente;
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

  set id_cliente(id) {
    this.#id_cliente = id;
  }

  set nome_cliente(novoNome) {
    this.#nome_cliente = novoNome;
  }
}

module.exports = Cliente;

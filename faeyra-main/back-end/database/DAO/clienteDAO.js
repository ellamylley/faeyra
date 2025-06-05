const Especie = require('../../classes/especieClasse');
const Cliente = require('../../classes/clienteClasse');
class ClienteDAO {
    constructor(connection) {
        this.connection = connection;
    }

    criarTabela(callback) {
        const sql = `
      CREATE TABLE IF NOT EXISTS cliente (
        id_cliente BIGINT AUTO_INCREMENT PRIMARY KEY,
        id_especie BIGINT,
        id_jogador BIGINT,
        nome_cliente VARCHAR(20),
        FOREIGN KEY (id_especie) REFERENCES especie(id_especie)
      );`;
        this.connection.query(sql, callback);
    }

    inserir(cliente, callback) {
        const sql = `
      INSERT INTO cliente(id_especie, id_jogador, nome_cliente)
      VALUES (?, ?, ?);`;
        this.connection.query(sql, [
            cliente.id_especie,
            cliente.id_jogador,
            cliente.nome_cliente
        ], callback);
    }

    listar(callback) {
        const sql = ` SELECT * FROM cliente`;
        this.connection.query(sql, callback);
    }

    apagarTabela(callback) {
        const sql = 'DROP TABLE IF EXISTS cliente;';
        this.connection.query(sql, callback);
    }
}

module.exports = ClienteDAO;

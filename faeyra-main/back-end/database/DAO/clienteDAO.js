const Especie = require('../../especieClasse');
const Cliente = require('../../clienteClasse');
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
      INSERT INTO cliente (id_especie, id_jogador, nome_cliente)
      VALUES (?, ?, ?);`;
        this.connection.query(sql, [
            cliente.especie.id_especie,
            cliente.id_jogador,
            cliente.nome_cliente
        ], callback);
    }

    listar(callback) {
        const sql = `
      SELECT c.id_cliente, c.id_jogador, c.nome_cliente,
             e.id_especie, e.nome_especie, e.satisfacao_minima
      FROM cliente c
      JOIN especie e ON c.id_especie = e.id_especie;
    `;
        this.connection.query(sql, (err, results) => {
            if (err) return callback(err);

            const clientes = results.map(linha => {
                const especie = new Especie(linha.nome_especie, linha.satisfacao_minima);
                especie.id_especie = linha.id_especie; 

                const cliente = new Cliente(linha.id_cliente, especie, linha.id_jogador, linha.nome_cliente

                );
                return cliente;
            });

            callback(null, clientes);
        });
    }

    apagarTabela(callback) {
        const sql = 'DROP TABLE IF EXISTS cliente;';
        this.connection.query(sql, callback);
    }
}

module.exports = ClienteDAO;

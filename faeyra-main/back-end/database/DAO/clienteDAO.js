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
        nome_cliente VARCHAR(20),
        satisfacao_atual INT,
        FOREIGN KEY (id_especie) REFERENCES especie(id_especie)
      );`;
        this.connection.query(sql, callback);
    }

    inserir(cliente, callback) {
        const sql = `
      INSERT INTO cliente(id_especie, nome_cliente, satisfacao_atual)
      VALUES (?, ?, ?);`;
        this.connection.query(sql, [
            cliente.id_especie,
            cliente.nome_cliente,
            cliente.satisfacao_atual
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

    buscarAleatorio(callback) {
    const sql = `
        SELECT c.*, e.satisfacao_minima 
        FROM cliente c 
        JOIN especie e ON c.id_especie = e.id_especie 
        ORDER BY RAND() LIMIT 1;
    `;
    this.connection.query(sql, (err, results) => {
        if (err) return callback(err);
        if (results.length === 0) return callback(null, null); 
        callback(null, results[0]);
    });
}


}

module.exports = ClienteDAO;

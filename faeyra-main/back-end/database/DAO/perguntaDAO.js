class PerguntaDAO {
    constructor(connection) {
        this.connection = connection;
    }

    criarTabela(callback) {
        const sql = `
      CREATE TABLE IF NOT EXISTS pergunta (
        id_pergunta BIGINT NOT NULL AUTO_INCREMENT,
        texto VARCHAR(100),
        PRIMARY KEY (id_pergunta)
      );`;
        this.connection.query(sql, callback);
    }

    inserir(pergunta, callback) {
        const sql = 'INSERT INTO pergunta(texto) VALUES (?);';
        this.connection.query(sql, [pergunta.texto], callback);
    }

    listar(callback) {
        const sql = 'SELECT * FROM pergunta;';
        this.connection.query(sql, callback);
    }

    apagarTabela(callback) {
        const sql = 'DROP TABLE IF EXISTS pergunta;';
        this.connection.query(sql, callback);
    }

    buscarAleatorio(callback) {
        const sql = `SELECT * FROM pergunta ORDER BY RAND() LIMIT 1`;

        this.connection.query(sql, (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    }

}

module.exports = PerguntaDAO;

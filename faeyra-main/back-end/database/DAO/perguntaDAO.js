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

    atualizarPergunta(id, pergunta, callback) {
        const sql = 'UPDATE pergunta SET texto = ? WHERE id = ?'
        const valores = [pergunta.texto, id]
        this.connection.query(sql, valores, (err, results) => {
            if (err) return callback(err)
                callback(null)
        })
    }

    deletarPergunta(id, callback) {
        const sql = 'DELETE FROM pergunta WHERE id = ?'
        this.connection.query(sql, [id], (err, results) => {
            if (err) return callback(err)
            callback(null)
        })
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

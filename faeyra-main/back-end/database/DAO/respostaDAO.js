
class RespostaDAO {
    constructor(connection) {
        this.connection = connection;
    }

    criarTabela(callback) {
        const sql = `
      CREATE TABLE IF NOT EXISTS resposta (
        id_resposta BIGINT AUTO_INCREMENT PRIMARY KEY,
        id_pergunta BIGINT,
        texto VARCHAR(20),
        FOREIGN KEY (id_pergunta) REFERENCES pergunta(id_pergunta)
      );`;
        this.connection.query(sql, callback);
    }

    inserir(resposta, callback) {
        const sql = `
      INSERT INTO resposta(id_pergunta, texto)
      VALUES (?, ?);`;
        this.connection.query(sql, [
            resposta.id_pergunta,
            resposta.texto
        ], callback);
    }

    listar(callback) {
        const sql = ` SELECT * FROM resposta`;
        this.connection.query(sql, callback);
    }

    apagarTabela(callback) {
        const sql = 'DROP TABLE IF EXISTS resposta;';
        this.connection.query(sql, callback);
    }
}

module.exports = RespostaDAO;

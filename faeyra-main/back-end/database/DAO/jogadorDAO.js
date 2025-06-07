class JogadorDAO {
  constructor(connection) {
    this.connection = connection;
  }

  criarTabela(callback) {
    const sql = `
      CREATE TABLE IF NOT EXISTS jogador (
        id BIGINT NOT NULL AUTO_INCREMENT,
        nome VARCHAR(10),
        senha VARCHAR(128)
        dinheiro DECIMAL(5,2),
        chances INT(1),
        PRIMARY KEY (id)
      );`;
    this.connection.query(sql, callback);
  }

  inserir(jogador, callback) {
    const sql = 'INSERT INTO jogador(nome, senha, dinheiro, chances) VALUES (?, ?, ?, ?);';
    this.connection.query(sql, [jogador.nome, jogador.dinheiro, jogador.chances], callback);
  }

  listar(callback) {
    const sql = 'SELECT * FROM jogador;';
    this.connection.query(sql, callback);
  }

  apagarTabela(callback) {
    const sql = 'DROP TABLE IF EXISTS jogador;';
    this.connection.query(sql, callback);
  }
}

module.exports = JogadorDAO;
